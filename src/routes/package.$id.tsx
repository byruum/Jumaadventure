import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Please try again.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-ghost">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: "Come see Kenya with me. Real safaris, real hikes, real stories. Book your tour today and let us organize your adventure for you. WhatsApp Juma: +254 746 011 254 or Email: jumaadventuresandsafaris@gmail.com" },
      { name: "google-site-verification", content: "V3sDPEKAywol4sWLDkHKYZ5UPGSQBOm1y013au8WxI" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/Images/favicon.png" },
      { rel: "apple-touch-icon", href: "/Images/og-image.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-[5px]">
          <div className="w-9 h-9 rounded-full bg-[#FF6A00] flex items-center justify-center font-bold text-white text-[20px] leading-none">
            J
          </div>
          <span className="font-bold text-[19px] text-[#1F3D2B] tracking-tight font-['Playfair_Display']">
            uma Adventures
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/packages" className="hover:text-primary">Packages</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/gallery" className="hover:text-primary">Gallery</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <Link to="/post" className="hover:text-primary">Post</Link>
        </nav>
        <Link to="/contact" className="btn-primary!py-2!px-4 text-xs">Book Now</Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-[5px]">
            <div className="w-9 h-9 rounded-full bg-[#FF6A00] flex items-center justify-center font-bold text-white text-[20px] leading-none">
              J
            </div>
            <span className="font-bold text-[16px] text-white tracking-tight font-['Playfair_Display']">
              uma Adventures
            </span>
          </div>
          <p className="mt-4 text-sm opacity-80">
            Authentic Kenya safaris and East Africa adventures led by professional guide Dennis Juma.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/packages" className="opacity-90 hover:opacity-100">All Packages</Link></li>
            <li><Link to="/packages/masai-mara" className="opacity-90 hover:opacity-100">Masai Mara Safari</Link></li>
            <li><Link to="/packages/mount-kenya" className="opacity-90 hover:opacity-100">Mount Kenya Trek</Link></li>
            <li><Link to="/packages/diani-beach" className="opacity-90 hover:opacity-100">Diani Beach</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="opacity-90 hover:opacity-100">About Us</Link></li>
            <li><Link to="/gallery" className="opacity-90 hover:opacity-100">Gallery</Link></li>
            <li><Link to="/contact" className="opacity-90 hover:opacity-100">Contact</Link></li>
            <li><Link to="/post" className="opacity-90 hover:opacity-100">Post</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            <li>Nairobi, Kenya</li>
            <li><a href="tel:+254746011254" className="hover:opacity-100">+254 746 011 254</a></li>
            <li><a href="mailto:jumaadventuresandsafaris@gmail.com" className="hover:opacity-100 break-all">jumaadventuresandsafaris@gmail.com</a></li>
            <li><a href="https://wa.me/254746011254" className="hover:opacity-100">WhatsApp Chat</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex-col items-center justify-between gap-2 py-5 text-xs opacity-70 sm:flex-row">
          <p>© {new Date().getFullYear()} Juma Adventures. All rights reserved.</p>
          <p>Crafted with care in Nairobi, Kenya.</p>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <a
          href="https://wa.me/254746011254"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0.17 5.33.17 11.9c0 2.1.55 4.14 1.6 5.94L0 24l6.32-1.66a11.9 11.9 0 0 0 5.73 1.46h.01c6.56 0 11.89-5.33 11.89-11.9 0-3.18-1.24-6.17-3.43-8.42zM12.06 21.3h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.75.98 1-3.65-.22-.37a9.37 9.37 0 0 1-1.44-5c0-5.19 4.23-9.42 9.44-9.42 2.52 0 4.89.98 6.67 2.76a9.37 9.37 0 0 1 2.76 6.67c0 5.19-4.23 9.54-9.32 9.54zm5.44-7.05c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.22-.65.07a8.42 8.42 0 0 1-2.47-1.52 9.27 9.27 0 0 1-1.71-2.13c-.18-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.65-.93-2.26-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.52.07-.8.37s-1.05 1.03-1.05 2.5 1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>
        </a>
      </div>
    </QueryClientProvider>
  );
}          </div>
          <div className="bg-white rounded-[20px] p-6 border">
            <ReviewsSection tourName={packageData.title} />
          </div>
          <div className="bg-white rounded-[20px] p-6 border">
            <FAQsSection />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="bg-white rounded-[16px] border shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-5 sticky top-5">
            <p className="text-center font-black text-[28px]">${Number(full).toLocaleString()}.00 USD</p>
            <div className="mt-2 flex justify-center">
              {isDayTrip? (<span className="bg-[#F5B400] text-black px-3 py-1 rounded-full text-[10px] font-black tracking-widest">DAY TRIP ONLY</span>) : (<span className="bg-[#0B6A2B] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest">{packageData.duration?.toUpperCase()} • ${full}</span>)}
            </div>
            <div className="mt-4 space-y-2 text-[13px] text-black/60"><div>🕒 {packageData.duration}</div><div>🚗 Private transportation</div><div>👥 Private tour for 1-2 people</div></div>
            <div className="mt-4 border border-black/20 rounded-full px-4 py-3 flex justify-between items-center">
              <span className="font-bold text-[14px]">Your party size</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={()=>setParty(p=>Math.max(1,p-1))} className="w-7 h-7 rounded-full border flex items-center justify-center">−</button>
                <span className="font-black text-[#0B8A5B]">{party}</span>
                <button type="button" onClick={()=>setParty(p=>Math.min(6,p+1))} className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">+</button>
              </div>
            </div>
            <label className="mt-3 border border-black/20 rounded-full px-4 py-3 flex justify-between items-center cursor-pointer hover:border-black">
              <span className="font-bold text-[14px]">Tour date</span>
              <input type="date" value={tourDate} onChange={e=>{ setTourDate(e.target.value); setForm({...form, date: e.target.value}) }} className="bg-transparent outline-none text-[13px] cursor-pointer" />
            </label>
            <label className="mt-3 border border-black/20 rounded-full px-4 py-3 flex justify-between items-center cursor-pointer hover:border-black">
              <span className="font-bold text-[14px]">Start time</span>
              <input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} className="bg-transparent outline-none text-[13px] cursor-pointer" />
            </label>
            <button onClick={()=>setShowBooking(true)} className="mt-4 w-full bg-[#0B8A5B] text-white py-4 rounded-full font-black">Book Now</button>
            <a href="#cancel" className="mt-4 flex items-center gap-2 text-[13px] underline font-bold"><span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">✓</span> View our cancellation policies</a>
          </div>
        </div>
      </div>

      {showBooking && (
        <div className="fixed inset-0 bg-black/80 z-[100] p-3 flex justify-center items-center">
          <div className="bg-white w-full max-w-[520px] rounded-[24px] overflow-hidden max-h-[90vh] overflow-y-auto">
            {!sent? (
              <form onSubmit={sendEmail} className="p-6 space-y-3">
                <div className="flex justify-between"><h3 className="font-black">Book ${full} • {party} pax {isDayTrip? "• DAY TRIP" : ""}</h3><button type="button" onClick={()=>setShowBooking(false)} className="w-8 h-8 bg-black/10 rounded-full">✕</button></div>
                <p className="text-[12px]">Date: {tourDate || "Select"} • Time: {startTime} • Full: ${full}</p>
                <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full border rounded-full px-4 py-3 text-[13px]" />
                <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full border rounded-full px-4 py-3 text-[13px]" />
                <input required value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="WhatsApp" className="w-full border rounded-full px-4 py-3 text-[13px]" />
                <button disabled={sending} className="w-full bg-[#0B8A5B] text-white py-3 rounded-full font-black">{sending?"Sending...":"Confirm $"+full}</button>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Booking%20${encodeURIComponent(packageData.title)}%20$${full}%20${party}pax%20${tourDate}%20${startTime}`} className="block text-center bg-[#25D366] py-3 rounded-full font-black text-[13px]">WhatsApp • {party} pax • {tourDate}</a>
                <div className="grid grid-cols-2 gap-2"><a href={paypalDep} target="_blank" className="bg-black text-white py-3 rounded-full text-center text-[12px] font-black">Deposit ${dep}</a><a href={paypalFull} target="_blank" className="bg-[#F5B400] text-black py-3 rounded-full text-center text-[12px] font-black">Full ${full}</a></div>
              </form>
            ) : (
              <div className="p-8 text-center"><p className="w-10 h-10 bg-[#0B6A2B] text-white rounded-full flex items-center justify-center mx-auto">✓</p><h3 className="mt-3 font-black">Booking received</h3></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
