import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-surface-4 text-text-inverse pt-24 pb-12 border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1">
            <h2 className="font-display text-2xl font-bold tracking-[0.2em] text-brand-gold mb-6">ILLUME</h2>
            <p className="text-white/60 text-xs leading-relaxed mb-6 font-ui tracking-wide">
              African luxury fashion house. Bespoke bridals, tailored suits, and culturally rooted elegance. Crafted in light, operating from Abuja & Ebonyi, shipping globally.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-gold hover:border-brand-gold transition-all duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://wa.me/2348130024904" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-gold hover:border-brand-gold transition-all duration-300">
                <span className="sr-only">WhatsApp</span>
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.766.459 3.493 1.332 5.01L2 22l5.105-1.339A9.972 9.972 0 0012.031 22c5.54 0 10.03-4.49 10.03-10.03S17.571 2 12.031 2zm0 18.344a8.311 8.311 0 01-4.24-1.159l-.304-.18-3.15.826.837-3.072-.198-.314A8.32 8.32 0 013.656 12.03c0-4.619 3.757-8.375 8.375-8.375 4.62 0 8.376 3.756 8.376 8.375s-3.756 8.376-8.376 8.376zm4.597-6.28c-.252-.126-1.492-.737-1.724-.821-.231-.084-.4-.126-.569.126-.168.252-.65 8.821-.798.989-.147.168-.294.189-.546.063-.252-.126-1.066-.393-2.03-1.253-.75-.67-1.258-1.497-1.405-1.749-.147-.252-.016-.388.11-.514.113-.113.252-.294.378-.441.126-.147.168-.252.252-.421.084-.168.042-.315-.021-.441-.063-.126-.568-1.371-.778-1.875-.205-.494-.415-.427-.569-.434-.147-.007-.315-.008-.483-.008s-.441.063-.672.315c-.231.252-.882.861-.882 2.101s.903 2.437 1.029 2.605c.126.168 1.775 2.712 4.3 3.801.601.259 1.07.414 1.436.53.604.192 1.153.164 1.587.1.487-.072 1.492-.61 1.702-1.198.21-.588.21-1.093.147-1.198-.063-.105-.231-.168-.483-.294z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold/90 mb-6">Collections</h3>
            <ul className="space-y-4">
              <li><Link href="/collections#bridal" className="text-white/60 hover:text-brand-gold transition-colors text-xs uppercase tracking-wider">Bridal Couture</Link></li>
              <li><Link href="/collections#asoebi" className="text-white/60 hover:text-brand-gold transition-colors text-xs uppercase tracking-wider">Aso-Ebi</Link></li>
              <li><Link href="/collections#suits" className="text-white/60 hover:text-brand-gold transition-colors text-xs uppercase tracking-wider">Tailored Suits</Link></li>
              <li><Link href="/collections#rtw" className="text-white/60 hover:text-brand-gold transition-colors text-xs uppercase tracking-wider">Ready-to-Wear</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold/90 mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-white/60 hover:text-brand-gold transition-colors text-xs uppercase tracking-wider">About the Atelier</Link></li>
              <li><Link href="/lookbook" className="text-white/60 hover:text-brand-gold transition-colors text-xs uppercase tracking-wider">Editorial Lookbook</Link></li>
              <li><Link href="/catalogue" className="text-white/60 hover:text-brand-gold transition-colors text-xs uppercase tracking-wider">Digital Catalogue</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-brand-gold transition-colors text-xs uppercase tracking-wider">Book a Fitting</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold/90 mb-6">Ateliers</h3>
            <ul className="space-y-3 text-xs text-white/60 leading-relaxed font-ui tracking-wide">
              <li>
                <span className="text-brand-gold font-medium">Abuja Atelier</span><br />
                2nd Gate, Opposite ECWA Church,<br />
                Kubwa Street, Abuja, FCT, Nigeria
              </li>
              <li>
                <span className="text-brand-gold font-medium">Ebonyi</span><br />
                Abakaliki, Ebonyi State, Nigeria
              </li>
              <li className="pt-2">
                <a href="tel:+2348130024904" className="hover:text-brand-gold transition-colors">+234 813 002 4904</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[0.7rem] uppercase tracking-widest text-white/40">
            © {new Date().getFullYear()} ILLUME BY LIGHT PEACE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[0.7rem] uppercase tracking-widest text-white/40">
            <Link href="/privacy-policy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
