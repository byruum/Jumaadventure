import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Juma Adventures" },
      { name: "description", content: "Meet Dennis Juma founder of Juma Adventures" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-16 flex flex-col items-center text-center">
          <img src="/hero-safari.png" alt="Juma Adventures" className="h-16 w-auto bg-white rounded-xl p-2" />
          <h1 className="mt-6 text-4xl md:text-5xl font-bold">Discover Africa Through Experience, Adventure, and Passion.</h1>
          <p className="mt-5 max-w-3xl opacity-85">Juma Adventures is a premier safari company founded by Dennis Juma.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
          <img src="/mount-Kenya-day-trip-hike.jpg" alt="Dennis Juma Mount Kenya" className="aspect-[4/5] w-full rounded-3xl object-cover" />
          <div>
            <span className="eyebrow">Founder</span>
            <h2 className="mt-3 text-4xl font-bold">Meet Dennis Juma</h2>
            <div className="mt-5 space-y-4 text-foreground/85">
              <p>Dennis began his career as a mountain guide on Mount Kenya, where he gained extensive experience leading trekkers through challenging alpine environments. His commitment to safety and excellence saw him advance into technical mountain climbing, specializing in high-altitude expeditions as well as mountain search and rescue operations.</p>
              <p>Throughout his career, he has played a vital role in rescuing and assisting climbers in distress, helping save many lives while earning the trust and respect of fellow guides and adventurers.</p>
              <p>With years of experience in the mountains, Dennis expanded his expertise into wildlife safaris, becoming a professional safari guide across Kenya and Tanzania. His deep knowledge of wildlife behavior, ecosystems, conservation, and local cultures enables guests to experience Africa beyond the ordinary.</p>
              <p>Dennis holds a Diploma in Supply Chain Management from KIM and has received professional training in Wildlife Conservation and Management through KWS. He is also currently pursuing a Professional Pilot Course.</p>
            </div>
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
