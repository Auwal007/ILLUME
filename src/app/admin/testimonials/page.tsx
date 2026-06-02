import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getTestimonials } from "@/lib/db"
import { createTestimonial, deleteTestimonial } from "@/app/actions/admin"

export default async function AdminTestimonials() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const testimonials = await getTestimonials()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Testimonials</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Add Testimonial</h2>
          <form action={createTestimonial} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
              <input type="text" name="title" className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select name="rating" required className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold">
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea name="content" required rows={3} className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-black text-white px-4 py-2 font-medium text-sm hover:bg-gray-800 transition-colors">
              Save Testimonial
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-medium text-gray-600 text-sm">Name</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Rating</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Status</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No testimonials found</td>
                </tr>
              ) : (
                testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{testimonial.name}</td>
                    <td className="p-4 text-sm text-gray-600">{testimonial.rating}/5</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {testimonial.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4">
                      <form action={async () => { "use server"; await deleteTestimonial(testimonial.id) }}>
                        <button type="submit" className="text-sm font-medium text-red-600 hover:underline">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
