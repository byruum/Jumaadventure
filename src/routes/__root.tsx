function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          {/* TEXT LOGO - NO PHOTO */}
          <div className="w-9 h-9 rounded-full bg-[#FF6A00] flex items-center justify-center font-bold text-white text-[20px] leading-none">
            J
          </div>
          <span className="font-bold text-[19px] text-[#1F3D2B] tracking-tight">
            Juma Adventures
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
          <div className="flex items-center gap-2.5">
            {/* TEXT LOGO - NO PHOTO */}
            <div className="w-9 h-9 rounded-full bg-[#FF6A00] flex items-center justify-center font-bold text-white text-[20px] leading-none">
              J
            </div>
            <span className="font-bold text-[16px] text-white tracking-tight">
              Juma Adventures
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
