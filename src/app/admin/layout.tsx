import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import Image from "next/image"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {session && (
        <aside className="w-full md:w-64 bg-brand-black text-white p-6 shrink-0 md:min-h-screen">
          <div className="mb-10 flex items-center gap-3">
            <Image
              src="/img/logo.png"
              alt="ILLUME Logo"
              width={32}
              height={32}
              style={{ width: "auto" }}
              className="h-8 object-contain brightness-0 invert"
            />
            <div>
              <span className="font-display text-xl font-bold tracking-wider text-white">ILLUME</span>
              <p className="text-[0.65rem] text-brand-gold uppercase tracking-widest mt-0.5">Admin</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link href="/admin/dashboard" className="block px-4 py-2 hover:bg-white/10 rounded transition-colors text-sm font-medium">Dashboard</Link>
            <Link href="/admin/products" className="block px-4 py-2 hover:bg-white/10 rounded transition-colors text-sm font-medium">Products</Link>
            <Link href="/admin/categories" className="block px-4 py-2 hover:bg-white/10 rounded transition-colors text-sm font-medium">Categories</Link>
            <Link href="/admin/collections" className="block px-4 py-2 hover:bg-white/10 rounded transition-colors text-sm font-medium">Collections</Link>
            <Link href="/admin/inquiries" className="block px-4 py-2 hover:bg-white/10 rounded transition-colors text-sm font-medium">Inquiries</Link>
            <Link href="/admin/testimonials" className="block px-4 py-2 hover:bg-white/10 rounded transition-colors text-sm font-medium">Testimonials</Link>
          </nav>
          <div className="mt-auto pt-10">
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Sign Out</button>
            </form>
          </div>
        </aside>
      )}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  )
}
