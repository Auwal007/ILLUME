import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-brand-white">
      {/* Hero */}
      <section className="py-24 px-6 text-center bg-brand-milk">
        <div className="max-w-4xl mx-auto">
          <div className="font-display italic text-brand-deep-gold tracking-wide mb-4">Our Story</div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold mb-8">
            Crafting Legacy in <em className="text-brand-gold not-italic">Light.</em>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed text-balance mx-auto max-w-2xl">
            ILLUME traces its roots back to 2018, when what is now a growing fashion house began as a simple but deeply intentional vision.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 lg:max-w-none rounded-3xl overflow-hidden shadow-[0_25px_60px_-25px_rgba(0,0,0,0.35)] border border-brand-gold/10 group">
            <Image
              src="/images/visionary_designer.png"
              alt="Ikedichukwu Peace, Founder of ILLUME"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-brand-black tracking-tight">
              Meet <em className="text-brand-gold not-italic font-normal">Ikedichukwu Peace.</em>
            </h2>
            <div className="space-y-6 text-base text-text-muted leading-relaxed font-ui">
              <p>
                Founded by Ikedichukwu Peace, ILLUME began with conviction — a belief that fashion could be more than fabric and transient trends, that it could become a language of identity, dignity, and quiet confidence.
              </p>
              <p>
                With over a decade of experience in luxury fashion, Peace founded ILLUME to bridge the gap between traditional African craftsmanship and contemporary haute couture. Every piece tells a story—of heritage, of beauty, of the extraordinary moments that deserve to be illuminated.
              </p>
              <blockquote className="pl-6 border-l-2 border-brand-gold italic font-display text-xl text-brand-black my-8 leading-relaxed">
                "We do not create by chance — every detail is deliberate, every finish refined. True luxury does not shout. It radiates."
              </blockquote>
            </div>
            <div className="mt-10 font-display text-xl italic text-brand-black font-semibold">
              — Ikedichukwu Peace
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-brand-black text-brand-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="font-display text-5xl font-bold text-brand-gold mb-2">2018</div>
            <div className="text-sm tracking-widest uppercase opacity-80">Founded</div>
          </div>
          <div>
            <div className="font-display text-5xl font-bold text-brand-gold mb-2">2</div>
            <div className="text-sm tracking-widest uppercase opacity-80">Ateliers</div>
          </div>
          <div>
            <div className="font-display text-5xl font-bold text-brand-gold mb-2">∞</div>
            <div className="text-sm tracking-widest uppercase opacity-80">Possibilities</div>
          </div>
          <div>
            <div className="font-display text-5xl font-bold text-brand-gold mb-2">100%</div>
            <div className="text-sm tracking-widest uppercase opacity-80">Dedication</div>
          </div>
        </div>
      </section>
    </div>
  )
}
