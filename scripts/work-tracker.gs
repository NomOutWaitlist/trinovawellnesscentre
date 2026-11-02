/** Bound to Trinova Work Tracker. Keep the spreadsheet private.
 * Script Properties: WORK_TRACKER_API_TOKEN (same as Vercel), optionally SPREADSHEET_ID.
 * Redeploy as a new version, execute as yourself, access Anyone.
 * Anyone can reach the URL, but no record is read/written without the server token.
 */
function doGet() {
  return json_({ ok: false, error: 'Unauthorized' });
}
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');
    var token = PropertiesService.getScriptProperties().getProperty('WORK_TRACKER_API_TOKEN');
    if (!token || !equal_(String(body.token || ''), token)) return json_({ ok: false, error: 'Unauthorized' });
    if (body.action === 'loginAttempt') {
      var lock = LockService.getScriptLock(); lock.waitLock(10000);
      try {
        var cache = CacheService.getScriptCache();
        var key = 'attempt_' + String(body.client || '').slice(0, 64);
        var props = PropertiesService.getScriptProperties();
        var now = Date.now();
        var attempts = JSON.parse(props.getProperty(key) || '{"count":0,"until":0}');
        if (now > attempts.until) attempts = { count: 0, until: now + 900000 };
        if (attempts.count >= 5) return json_({ ok: false, error: 'Too many attempts' });
        attempts.count++;
        props.setProperty(key, JSON.stringify(attempts));
        // Remove expired throttling entries so the property store stays bounded.
        Object.keys(props.getProperties()).filter(function(k) { return k.indexOf('attempt_') === 0; }).forEach(function(k) {
          try { if (JSON.parse(props.getProperty(k)).until < now) props.deleteProperty(k); } catch (_) {}
        });
        return json_({ ok: true });
      } finally { lock.releaseLock(); }
    }
    var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    var ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error('Missing spreadsheet');
    // Separate new private records from the previous demo/test rows.
    var sheet = ss.getSheetByName('Work Entries');
    if (!sheet) { sheet = ss.insertSheet('Work Entries'); sheet.appendRow(['ID','Timestamp','Date','Pillar','Category','Start','End','Minutes','Description']); sheet.setFrozenRows(1); }
    if (body.action === 'list') {
      var rows = sheet.getDataRange().getDisplayValues().slice(1);
      return json_({ ok: true, data: rows.filter(function(r){return r[0];}).map(function(r) {
        return { id:r[0], timestamp:r[1], date:r[2], pillar:r[3], category:untext_(r[4]), start:r[5], end:r[6], minutes:Number(r[7]), description:untext_(r[8]) };
      }) });
    }
    if (body.action === 'append') {
      var entry = body.entry || {};
      if (!/^[a-f0-9-]{36}$/i.test(entry.id || '') || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date || '') || ['High Impact Women','High Impact App','Trinova Wellness Centre'].indexOf(entry.pillar) < 0 || !String(entry.category || '').trim() || !String(entry.description || '').trim()) throw new Error('Invalid entry');
      var minutes = time_(entry.end) - time_(entry.start);
      if (minutes <= 0 || String(entry.category).length > 120 || String(entry.description).length > 3000) throw new Error('Invalid entry');
      var writeLock = LockService.getScriptLock(); writeLock.waitLock(10000);
      try {
        var ids = sheet.getDataRange().getDisplayValues().slice(1).map(function(r) { return r[0]; });
        if (ids.indexOf(entry.id) >= 0) return json_({ ok:true, minutes:minutes });
        var row = sheet.getLastRow() + 1;
        sheet.getRange(row, 1, 1, 9).setNumberFormat('@');
        sheet.getRange(row, 1, 1, 9).setValues([[entry.id,new Date().toISOString(),entry.date,entry.pillar,text_(entry.category),entry.start,entry.end,String(minutes),text_(entry.description)]]);
        SpreadsheetApp.flush();
        return json_({ ok:true, minutes:minutes });
      } finally { writeLock.releaseLock(); }
    }
    return json_({ ok:false, error:'Unknown action' });
  } catch (_) { return json_({ ok:false, error:'Request failed' }); }
}
function time_(v) { if (!/^\d{2}:\d{2}$/.test(v || '')) throw new Error('Invalid time'); var t=v.split(':').map(Number); if(t[0]>23||t[1]>59)throw new Error('Invalid time'); return t[0]*60+t[1]; }
function text_(v) { var s=String(v); return /^[=+\-@\t\r]/.test(s) ? "'"+s : s; }
function untext_(v) { return /^'[=+\-@\t\r]/.test(v) ? v.slice(1) : v; }
function equal_(a,b) { var diff=a.length^b.length; for(var i=0;i<Math.max(a.length,b.length);i++) diff|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0); return diff===0; }
function json_(v) { return ContentService.createTextOutput(JSON.stringify(v)).setMimeType(ContentService.MimeType.JSON); }
