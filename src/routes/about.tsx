import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Juma Adventures — Dennis Juma, Professional Guide" },
      { name: "description", content: "Meet Dennis Juma — Mount Kenya guide, KWS-trained in wildlife conservation, and founder of Juma Adventures. Discover Africa through experience, adventure, and passion." },
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
      {/* Hero with Logo + Tagline */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-20 flex-col items-center text-center">
          <img 
            src="/logo-juma.png" 
            alt="Juma Adventures Logo" 
            className="h-24 w-auto mb-6" 
          />
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Discover Africa Through Experience, Adventure, and Passion.</h1>
          <p className="mt-5 max-w-3xl opacity-85">
            Juma Adventures is a premier safari and adventure company founded by Dennis Juma, a passionate and highly experienced professional guide dedicated to showcasing the beauty, wildlife, and rich cultures of East Africa. Built on a lifelong passion for nature and exploration, Juma Adventures delivers authentic, safe, and unforgettable travel experiences across Kenya and Tanzania.
          </p>
        </div>
      </section>

      {/* Founder Story - Dennis Exact Text */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
          <img
            src="https://jumaadventure.webtool.co.ke/images/testimonials-gallery/Mount-kenya-1.jpg"
            alt="Dennis Juma on a Mount Kenya expedition"
            className="aspect-[4/5] w-full rounded-3xl object-cover"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">Founder</span>
            <h2 className="mt-3 text-4xl font-bold">Meet Dennis Juma</h2>
            
            <div className="mt-5 space-y-4 text-foreground/85">
              <p>
                Dennis began his career as a mountain guide on Mount Kenya, where he gained extensive experience leading trekkers through challenging alpine environments. His commitment to safety and excellence saw him advance into technical mountain climbing, specializing in high-altitude expeditions as well as mountain search and rescue operations.
              </p>

              <p>
                Throughout his career, he has played a vital role in rescuing and assisting climbers in distress, helping save many lives while earning the trust and respect of fellow guides and adventurers.
              </p>

              <p>
                With years of experience in the mountains, Dennis expanded his expertise into wildlife safaris, becoming a professional safari guide across Kenya and Tanzania. His deep knowledge of wildlife behavior, ecosystems, conservation, and local cultures enables guests to experience Africa beyond the ordinary. Every journey is designed to combine adventure, education, and conservation while creating lifelong memories.
              </p>

              <p>
                Dennis has pursued continuous professional development throughout his career. He holds a Diploma in Supply Chain Management from the Kenya Institute of Management (KIM) and has received professional training in Wildlife Conservation and Management through the Kenya Wildlife Service (KWS). Demonstrating his commitment to growth and excellence, he is also currently pursuing a Professional Pilot Course, further expanding his knowledge and skills in the aviation and tourism industries.
              </p>
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

      {/* Day Trips */}
      <section className="section bg-muted">
        <div className="container-page">
          <span className="eyebrow">Day Trips</span>
          <h2 className="mt-3 text-4xl font-bold">Popular Day Trips</h2>
          <p className="mt-4 max-w-2xl text-foreground/85">Prices for 2 pax. Park fees inclusive. Prices vary by group size from $480 to $1000.</p>
          
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {dayTrips.map((trip) => (
              <div key={trip.name} className="rounded-2xl border-border bg-card p-6 text-center">
                <h3 className="text-xl font-bold">{trip.name}</h3>
                <p className="mt-3 text-3xl font-bold text-primary">{trip.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">for 2 pax</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing - Dennis Exact Text */}
      <section className="section">
        <div className="container-page">
          <h2 className="text-4xl font-bold">Why Juma Adventures</h2>
          <p className="mt-5 max-w-3xl text-foreground/85">
            Today, Juma Adventures is recognized for personalized service, professional guiding, responsible tourism, and a genuine passion for Africa's wilderness. Whether exploring the legendary Maasai Mara, trekking Mount Kenya, climbing East Africa's iconic peaks, or discovering the spectacular national parks of Kenya and Tanzania, every adventure is guided by experience, integrity, safety, and a commitment to creating extraordinary travel experiences.
          </p>
          <p className="mt-4 font-bold text-primary">Juma Adventures</p>
          <Link to="/contact" className="btn-primary mt-8 inline-block">Plan a trip with Dennis</Link>
        </div>
      </section>
    </>
  );
}
