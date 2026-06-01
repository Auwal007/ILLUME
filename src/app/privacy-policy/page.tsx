export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-white py-24 px-6">
      <div className="max-w-3xl mx-auto prose prose-gray">
        <h1 className="font-display text-4xl font-semibold mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-700">
          <p>
            ILLUME by Light Peace ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-brand-black">1. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone numbers (specifically WhatsApp numbers for communication).</li>
            <li><strong>Inquiry Data:</strong> includes details about the services you are interested in and any messages you send us.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4 text-brand-black">2. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to respond to your inquiries, schedule consultations, and communicate with you via WhatsApp regarding our services.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-brand-black">3. WhatsApp Communication</h2>
          <p>
            By providing your WhatsApp number and initiating contact with us through the WhatsApp links on our website, you consent to us communicating with you via WhatsApp for the purposes of discussing our services, sharing designs, and conducting business. Please refer to WhatsApp's privacy policy for information on how they handle your data.
          </p>
        </div>
      </div>
    </div>
  )
}
