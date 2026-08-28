import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Juma Adventures — Dennis Juma, Professional Guide" },
      { name: "description", content: "Meet Dennis Juma — Mount Kenya guide, KWS-trained in wildlife conservation, and founder of Juma Adventures." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { t: "Authentic", d: "Real experiences with local guides who grew up in these landscapes." },
  { t: "Safe", d: "Mountain search & rescue experience, KWS-trained expertise, and safety-first planning." },
  { t: "Flexible", d: "Every itinerary is customized around your pace, dates and budget." },
  { t: "Responsible", d: "We support conservation and respect local communities on every tour." },
];

const dayTrips = [
  { name: "Nairobi City Tour", price: "$480" },
  { name: "Lake Nakuru National Park", price: "$510" },
  { name: "Mt Kenya Day Trip", price: "$480" },
];

function AboutPage() {
  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-16 flex flex-col items-center text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <img src="/hero-safari.png" alt="Juma Adventures Logo" className="h-16 w-auto" />
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold">Discover Africa Through Experience, Adventure, and Passion.</h1>
          <p className="mt-5 max-w-3xl opacity-85">Juma Adventures is a premier safari and adventure company founded by Dennis Juma...</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
          <img src="/IMG-20260111-WA0016.jpg" alt="Dennis Juma on a Mount Kenya expedition" className="w-full h-[500px] object-cover rounded-[24px] border" loading="lazy" />
          <div>
            <span className="eyebrow">Founder</span>
            <h2 className="mt-3 text-4xl font-bold">Meet Dennis Juma</h2>
            <div className="mt-5 space-y-4 text-foreground/85">
              <p>Dennis began his career as a mountain guide on Mount Kenya, where he gained extensive experience leading trekkers through challenging alpine environments.</p>
              <p>Throughout his career, he has played a vital role in rescuing and assisting climbers in distress, helping save many lives.</p>
              <p>With years of experience in the mountains, Dennis expanded his expertise into wildlife safaris, becoming a professional safari guide across Kenya and Tanzania.</p>
              <p>Dennis holds a Diploma in Supply Chain Management from KIM and has received professional training in Wildlife Conservation through KWS.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.t} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-lg font-bold text-primary">{v.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="container-page">
          <span className="eyebrow">Day Trips</span>
          <h2 className="mt-3 text-4xl font-bold">Popular Day Trips</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {dayTrips.map((trip) => (
              <div key={trip.name} className="rounded-2xl border border-border bg-card p-6 text-center">
                <h3 className="text-xl font-bold">{trip.name}</h3>
                <p className="mt-3 text-3xl font-bold text-primary">{trip.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">for 2 pax</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="text-4xl font-bold">Why Juma Adventures</h2>
          <p className="mt-5 max-w-3xl text-foreground/85">Today, Juma Adventures is recognized for personalized service, professional guiding, responsible tourism, and a genuine passion for Africa wilderness.</p>
          <Link to="/contact" className="btn-primary mt-8 inline-block">Plan a trip with Dennis</Link>
        </div>
      </section>
    </>
  );
}
