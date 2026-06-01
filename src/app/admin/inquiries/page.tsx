import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { deleteInquiry, updateInquiryStatus } from "@/app/actions/admin"

export default async function AdminInquiries() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Inquiries</h1>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-medium text-gray-600 text-sm">Name</th>
              <th className="p-4 font-medium text-gray-600 text-sm">Contact</th>
              <th className="p-4 font-medium text-gray-600 text-sm">Service</th>
              <th className="p-4 font-medium text-gray-600 text-sm">Status</th>
              <th className="p-4 font-medium text-gray-600 text-sm">Date</th>
              <th className="p-4 font-medium text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">No inquiries found</td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{inquiry.name}</td>
                  <td className="p-4 text-sm text-gray-600">
                    <div>{inquiry.email}</div>
                    <div>{inquiry.phone}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{inquiry.service || '-'}</td>
                  <td className="p-4">
                    <form action={async (formData: FormData) => {
                      "use server"
                      const status = formData.get("status") as string
                      await updateInquiryStatus(inquiry.id, status)
                    }}>
                      <select
                        name="status"
                        defaultValue={inquiry.status}
                        onChange={e => e.target.form?.requestSubmit()}
                        className={`px-2 py-1 text-xs font-medium rounded-full border-none focus:ring-0 cursor-pointer ${
                          inquiry.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                          inquiry.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </form>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <form action={async () => { "use server"; await deleteInquiry(inquiry.id) }}>
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
  )
}
