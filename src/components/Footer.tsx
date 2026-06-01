import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-display text-2xl font-bold tracking-wider mb-6">ILLUME</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              African luxury fashion house. Bespoke bridals, suits, and culturally rooted elegance. Crafted in light, in Abuja & Ebonyi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
                <span className="sr-only">WhatsApp</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.766.459 3.493 1.332 5.01L2 22l5.105-1.339A9.972 9.972 0 0012.031 22c5.54 0 10.03-4.49 10.03-10.03S17.571 2 12.031 2zm0 18.344a8.311 8.311 0 01-4.24-1.159l-.304-.18-3.15.826.837-3.072-.198-.314A8.32 8.32 0 013.656 12.03c0-4.619 3.757-8.375 8.375-8.375 4.62 0 8.376 3.756 8.376 8.375s-3.756 8.376-8.376 8.376zm4.597-6.28c-.252-.126-1.492-.737-1.724-.821-.231-.084-.4-.126-.569.126-.168.252-.65 8.821-.798.989-.147.168-.294.189-.546.063-.252-.126-1.066-.393-2.03-1.253-.75-.67-1.258-1.497-1.405-1.749-.147-.252-.016-.388.11-.514.113-.113.252-.294.378-.441.126-.147.168-.252.252-.421.084-.168.042-.315-.021-.441-.063-.126-.568-1.371-.778-1.875-.205-.494-.415-.427-.569-.434-.147-.007-.315-.008-.483-.008s-.441.063-.672.315c-.231.252-.882.861-.882 2.101s.903 2.437 1.029 2.605c.126.168 1.775 2.712 4.3 3.801.601.259 1.07.414 1.436.53.604.192 1.153.164 1.587.1.487-.072 1.492-.61 1.702-1.198.21-.588.21-1.093.147-1.198-.063-.105-.231-.168-.483-.294z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg text-brand-gold mb-4">Collections</h3>
            <ul className="space-y-3">
              <li><Link href="/collections#bridal" className="text-gray-400 hover:text-white transition-colors text-sm">Bridal Couture</Link></li>
              <li><Link href="/collections#asoebi" className="text-gray-400 hover:text-white transition-colors text-sm">Aso-Ebi</Link></li>
              <li><Link href="/collections#suits" className="text-gray-400 hover:text-white transition-colors text-sm">Tailored Suits</Link></li>
              <li><Link href="/collections#rtw" className="text-gray-400 hover:text-white transition-colors text-sm">Ready-to-Wear</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-brand-gold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/process" className="text-gray-400 hover:text-white transition-colors text-sm">Our Process</Link></li>
              <li><Link href="/lookbook" className="text-gray-400 hover:text-white transition-colors text-sm">Lookbook</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-brand-gold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><a href="tel:+2348130024904" className="text-gray-400 hover:text-white transition-colors text-sm">+234 813 002 4904</a></li>
              <li><a href="mailto:lightpeacelimited@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm">lightpeacelimited@gmail.com</a></li>
              <li className="text-gray-400 text-sm">Kubwa, Abuja</li>
              <li className="text-gray-400 text-sm">Abakaliki, Ebonyi</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} ILLUME by Light Peace. All rights reserved.
          </p>
          <div className="space-x-4 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
