"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import WhatsAppCTA from "@/components/WhatsAppCTA"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    timeline: "",
    message: ""
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error("Failed to submit")

      setStatus("success")
      setFormData({ name: "", email: "", phone: "", service: "", timeline: "", message: "" })
    } catch (err) {
      setStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-brand-white">
      <section className="py-24 px-6 bg-brand-milk text-center">
        <div className="max-w-3xl mx-auto">
          <div className="font-display italic text-brand-deep-gold tracking-wide mb-4">Get in Touch</div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold mb-8">
            Request a <em className="text-brand-gold not-italic">Fitting.</em>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Begin your journey. Let's illuminate your identity together.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-4">Request Received</h3>
                <p className="text-gray-600 mb-8">Thank you for reaching out. We will contact you within 24 hours to confirm your consultation.</p>
                <Button onClick={() => setStatus("idle")} variant="outline">Send Another Request</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name *</label>
                    <Input name="name" required value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address *</label>
                    <Input type="email" name="email" required value={formData.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">WhatsApp Number *</label>
                  <Input type="tel" name="phone" placeholder="+234..." required value={formData.phone} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Service of Interest *</label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="flex h-12 w-full border border-gray-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:border-brand-gold transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option value="Bridals & Asoebi">Bridals & Asoebi</option>
                      <option value="Suits & Dinner">Suits & Dinner</option>
                      <option value="African Luxury">African Luxury</option>
                      <option value="Consultancy">Consultancy</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="flex h-12 w-full border border-gray-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:border-brand-gold transition-colors"
                    >
                      <option value="">Select timeline</option>
                      <option value="Less than 3 months">Less than 3 months</option>
                      <option value="3-6 months">3 — 6 months</option>
                      <option value="6-12 months">6 — 12 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tell us about your vision</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} />
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-50 text-red-600 text-sm">Something went wrong. Please try again or contact us via WhatsApp.</div>
                )}

                <Button type="submit" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="font-display text-3xl font-semibold mb-6">Direct Contact</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                For immediate inquiries, our team is available via WhatsApp. All customer communication, negotiations, and payments are handled securely through our official WhatsApp channels.
              </p>
              <WhatsAppCTA className="mb-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-gray-200">
              <div>
                <h4 className="font-display text-xl font-semibold text-brand-gold mb-4">Abuja Atelier</h4>
                <p className="text-gray-600">2nd Gate, Opposite ECWA Church<br />Kubwa Street, Abuja<br />FCT, Nigeria</p>
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-brand-gold mb-4">Ebonyi Atelier</h4>
                <p className="text-gray-600">Abakaliki<br />Ebonyi State<br />Nigeria</p>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-200">
              <h4 className="font-display text-xl font-semibold text-brand-gold mb-4">Email & Phone</h4>
              <p className="text-gray-600 mb-2"><a href="mailto:lightpeacelimited@gmail.com" className="hover:text-brand-black transition-colors">lightpeacelimited@gmail.com</a></p>
              <p className="text-gray-600"><a href="tel:+2348130024904" className="hover:text-brand-black transition-colors">+234 813 002 4904</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
