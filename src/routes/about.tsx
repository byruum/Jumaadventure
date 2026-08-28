import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-[#1a2e1a] text-white py-16">
        <div className="container-page flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl p-3">
            <img src="/hero-safari.png" alt="Logo" className="h-12 w-auto" />
          </div>
          <h1 className="mt-6 text-3xl md:text-5xl font-bold max-w-3xl">Discover Africa Through Experience, Adventure, and Passion.</h1>
          <p className="mt-4 opacity-80">Juma Adventures is a premier safari company founded by Dennis Juma.</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-2 items-start">
          <div className="w-full bg-[#f5f2ed] rounded-3xl overflow-hidden border">
            <img src="/IMG-20260827-WA1621.jpg" alt="Dennis Juma Mount Kenya - Kiruthu Waypoint 3500M" className="w-full h-[520px] object-cover object-top" />
          </div>

          <div>
            <span className="text-xs tracking-widest uppercase text-[#8B7355] font-bold">Founder</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Meet Dennis Juma</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-neutral-700">
              <p>Dennis began his career as a mountain guide on Mount Kenya, where he gained extensive experience leading trekkers through challenging alpine environments. His commitment to safety and excellence saw him advance into technical mountain climbing, specializing in high-altitude expeditions as well as mountain search and rescue operations.</p>
              <p>Throughout his career, he has played a vital role in rescuing and assisting climbers in distress, helping save many lives while earning the trust and respect of fellow guides and adventurers.</p>
              <p>With years of experience in the mountains, Dennis expanded his expertise into wildlife safaris, becoming a professional safari guide across Kenya and Tanzania. His deep knowledge of wildlife behavior, ecosystems, conservation, and local cultures enables guests to experience Africa beyond the ordinary.</p>
              <p>Dennis holds a Diploma in Supply Chain Management from KIM and has received professional training in Wildlife Conservation and Management through KWS. He is also currently pursuing a Professional Pilot Course.</p>
            </div>
            <Link to="/contact" className="mt-8 inline-block bg-[#1a2e1a] text-white px-8 py-3 rounded-full font-bold">Plan a trip with Dennis</Link>
          </div>
        </div>
      </section>
    </>
  );
}
