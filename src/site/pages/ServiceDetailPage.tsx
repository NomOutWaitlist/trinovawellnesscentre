import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BaseService } from '@/site/data/services';

export function ServiceDetailPage({ service }: { service: BaseService }) {
  return (
    <div className="pb-20">
      <section className="border-b border-border bg-trinova-blue-light py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span>
          </nav>
          <p className="mb-3 text-sm font-semibold text-leaf-green">Trinova Wellness Centre · Brampton</p>
          <h1 className="max-w-4xl font-heading text-3xl font-bold leading-tight text-trinova-blue sm:text-4xl">{service.title} in Brampton</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">{service.whatItIs}</p>
          <p className="mt-4 text-sm font-semibold text-foreground">{service.specialist}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild><Link to="/book" search={{ category: service.bookCategory }}>Request an Appointment <ArrowRight className="size-4" /></Link></Button>
            <Button asChild variant="outline"><a href="tel:+19054957748"><Phone className="size-4" />(905) 495-7748</a></Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="mb-4 font-heading text-2xl font-bold text-trinova-blue">Who this service supports</h2>
          <ul className="space-y-3">{service.whoNeedsIt.map(item => <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-leaf-green" /><span>{item}</span></li>)}</ul>
        </div>
        <div>
          <h2 className="mb-4 font-heading text-2xl font-bold text-trinova-blue">What to expect</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{service.moreOnIt.howItWorks}</p>
          <h3 className="mb-2 mt-6 font-heading font-bold text-trinova-blue">Appointments</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{service.moreOnIt.sessionDetails}</p>
          <h3 className="mb-2 mt-6 font-heading font-bold text-trinova-blue">Insurance coverage</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{service.moreOnIt.coverage}</p>
          <p className="mt-3 text-sm text-muted-foreground">Confirm your plan’s eligibility and limits with your insurer before your appointment.</p>
        </div>
      </section>
      <section className="border-y border-border bg-muted py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-heading text-xl font-bold text-trinova-blue">{service.deliveryFormat}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{service.deliveryDetails}</p>
          <p className="mt-4 flex items-start gap-2 text-sm text-foreground"><MapPin className="size-4 shrink-0" />Unit 204, 178 John Street, Brampton, ON L6W 2Z1</p>
          <Button asChild variant="link" className="mt-3 px-0"><Link to="/contact">Clinic hours & directions <ArrowRight className="size-4" /></Link></Button>
        </div>
      </section>
    </div>
  );
}