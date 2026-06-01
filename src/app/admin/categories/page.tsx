import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { createCategory, deleteCategory } from "@/app/actions/admin"

export default async function AdminCategories() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Add Category</h2>
          <form action={createCategory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input type="text" name="slug" required className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" rows={3} className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-black text-white px-4 py-2 font-medium text-sm hover:bg-gray-800 transition-colors">
              Save Category
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-medium text-gray-600 text-sm">Name</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Slug</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Products</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No categories found</td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{category.name}</td>
                    <td className="p-4 text-sm text-gray-600">{category.slug}</td>
                    <td className="p-4 text-sm text-gray-600">{category._count.products}</td>
                    <td className="p-4">
                      <form action={async () => { "use server"; await deleteCategory(category.id) }}>
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
