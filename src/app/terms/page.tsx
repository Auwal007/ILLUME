export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-white py-24 px-6">
      <div className="max-w-3xl mx-auto prose prose-gray">
        <h1 className="font-display text-4xl font-semibold mb-8">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-700">
          <p>
            Please read these terms and conditions carefully before using our website or engaging our services.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-brand-black">1. Consultations & Fittings</h2>
          <p>
            Initial consultations can be booked through our website and are conducted either virtually or at our ateliers in Abuja and Ebonyi. Appointments are subject to availability and confirmation.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-brand-black">2. Custom Designs</h2>
          <p>
            All custom designs remain the intellectual property of ILLUME by Light Peace unless explicitly agreed otherwise in writing. We reserve the right to feature images of the final garments in our portfolio and social media.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-brand-black">3. Communication & Transactions</h2>
          <p>
            Our website serves as a digital showroom. All customer communication, orders, negotiations, and payments are conducted exclusively through our official WhatsApp channels. The website itself does not process payments or complete transactions.
          </p>
        </div>
      </div>
    </div>
  )
}
