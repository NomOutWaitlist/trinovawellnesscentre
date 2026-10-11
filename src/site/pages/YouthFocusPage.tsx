import React from 'react';
import { BrainCircuit, ChevronRight, Phone, Moon, Smartphone, Zap, HeartHandshake, CheckCircle2, MessageCircle } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

const bookPath = `/book?${new URLSearchParams({ category: 'Drug-Free Brain Training', concern: 'Youth & Teen Focus / Screen Overload' }).toString()}`;

const signs = [
  'Can’t finish homework without reaching for the phone',
  'Gets bored or restless within seconds',
  'Trouble falling asleep, tired in the morning',
  'Quick frustration, mood swings or meltdowns',
  'Grades slipping despite being bright',
  'Anxious or low after time online',
];

const effects = [
  { icon: Zap, title: 'Constant quick rewards', text: 'Every swipe brings something new. The brain gets used to fast, easy rewards, so slower tasks like reading or studying start to feel unbearable.' },
  { icon: Smartphone, title: 'Attention gets shorter', text: 'Jumping between 15-second videos trains the brain to switch, not stay. Over time, holding focus on one thing becomes harder.' },
  { icon: Moon, title: 'Sleep suffers', text: 'Late-night screens and an overstimulated mind make it harder to wind down, and poor sleep makes focus and mood worse the next day.' },
];

const steps = [
  { title: 'Parent & child consultation', text: 'We listen to your concerns, screen habits, sleep, school and mood.' },
  { title: 'Brain map (QEEG)', text: 'A painless, 20-minute scan shows how your child’s brainwaves handle focus and calm.' },
  { title: 'BrainCore neurofeedback', text: 'Your child watches a show while gentle sensors reward the brain for focused, calm patterns. No medication.' },
  { title: 'Counselling & family plan', text: 'Teen-friendly therapy plus practical screen, sleep and routine habits the whole family can follow.' },
];

export const YouthFocusPage: React.FC<Props> = ({ onNavigate }) => (
  <div className="space-y-20 pb-24">
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
      <span className="text-xs font-bold uppercase text-leaf-green">Youth & Teen Focus Program</span>
      <h1 className="font-heading text-3xl sm:text-5xl font-semibold text-trinova-blue leading-tight mt-3 mb-5">
        Scroll. Swipe. Switch. Is your child’s brain keeping up?
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
        Endless short videos and social feeds are changing how young brains focus, sleep and handle emotions. We help kids and teens in Brampton rebuild attention and calm, without medication.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <button onClick={() => onNavigate(bookPath)} className="btn-pill-leaf text-base px-8 py-4 w-full sm:w-auto cursor-pointer">
          <span>Book a Focus Assessment</span>
          <ChevronRight className="w-5 h-5" />
        </button>
        <a href="tel:+19054957748" className="btn-pill-outline text-base px-8 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2">
          <Phone className="w-4 h-4 text-leaf-green" />
          <span>(905) 495-7748</span>
        </a>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-trinova-blue mb-6">What scrolling does to a growing brain</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {effects.map(({ icon: Icon, title, text }) => (
          <div key={title} className="border border-border rounded-md p-6 bg-background">
            <Icon className="w-6 h-6 text-leaf-green mb-3" />
            <h3 className="font-heading font-bold text-trinova-blue mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-trinova-blue-light rounded-md p-6 sm:p-10">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-trinova-blue mb-2">Sound familiar?</h2>
        <p className="text-sm text-muted-foreground mb-6">Common signs parents tell us about:</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {signs.map((s) => (
            <div key={s} className="flex items-start gap-2.5 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-leaf-green shrink-0 mt-0.5" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-trinova-blue mb-6">How we help</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {steps.map((s, i) => (
          <div key={s.title} className="border border-border rounded-md p-6 flex gap-4">
            <span className="w-8 h-8 rounded-full bg-trinova-blue text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
            <div>
              <h3 className="font-heading font-bold text-trinova-blue mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-3 text-sm text-foreground"><BrainCircuit className="w-5 h-5 text-leaf-green" />Drug-free and painless</div>
        <div className="flex items-center gap-3 text-sm text-foreground"><HeartHandshake className="w-5 h-5 text-leaf-green" />Parents involved every step</div>
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <MessageCircle className="w-8 h-8 text-leaf-green mx-auto mb-3" />
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-trinova-blue mb-3">Give your child their focus back</h2>
      <p className="text-muted-foreground mb-6">Unit 204, 178 John St, Brampton · Serving families across Peel Region</p>
      <button onClick={() => onNavigate(bookPath)} className="btn-pill-leaf text-base px-8 py-4 cursor-pointer">
        <span>Book a Focus Assessment</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  </div>
);
