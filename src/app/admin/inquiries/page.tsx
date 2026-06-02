import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getInquiries } from "@/lib/db"
import { deleteInquiry } from "@/app/actions/admin"
import InquiryStatusSelect from "@/components/admin/InquiryStatusSelect"

export default async function AdminInquiries() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const inquiries = await getInquiries()

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
                    <InquiryStatusSelect inquiryId={inquiry.id} initialStatus={inquiry.status} />
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
