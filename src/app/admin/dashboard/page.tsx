import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getInquiries, getProducts, getCategories, getTestimonials } from "@/lib/db"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  const [inquiries, products, categories, testimonials] = await Promise.all([
    getInquiries(),
    getProducts(false),
    getCategories(),
    getTestimonials()
  ])

  const inquiriesCount = inquiries.length
  const productsCount = products.length
  const categoriesCount = categories.length
  const testimonialsCount = testimonials.length

  const recentInquiries = inquiries.slice(0, 5)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-display font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Inquiries</h3>
          <p className="text-3xl font-bold text-brand-black">{inquiriesCount}</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Products</h3>
          <p className="text-3xl font-bold text-brand-black">{productsCount}</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Categories</h3>
          <p className="text-3xl font-bold text-brand-black">{categoriesCount}</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Testimonials</h3>
          <p className="text-3xl font-bold text-brand-black">{testimonialsCount}</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Inquiries</h2>
          <a href="/admin/inquiries" className="text-brand-deep-gold hover:underline text-sm font-medium">View all</a>
        </div>

        <div className="bg-white border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-medium text-gray-600 text-sm">Name</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Email</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Service</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Status</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No inquiries yet</td>
                </tr>
              ) : (
                recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{inquiry.name}</td>
                    <td className="p-4 text-gray-600 text-sm">{inquiry.email}</td>
                    <td className="p-4 text-gray-600 text-sm">{inquiry.service || '-'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        inquiry.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                        inquiry.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
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
