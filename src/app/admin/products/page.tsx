import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getProducts, getCategories } from "@/lib/db"
import { createProduct, deleteProduct } from "@/app/actions/admin"
import Link from "next/link"

export default async function AdminProducts() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const products = await getProducts(false)
  const categories = await getCategories()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Products</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Add Product</h2>
          <form action={createProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input type="text" name="slug" required className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <Link href="/admin/categories" className="text-xs text-brand-gold hover:underline font-medium">
                  + Create New Category
                </Link>
              </div>
              <select name="categoryId" required className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (Optional)</label>
              <input type="number" name="price" className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
              <input type="file" name="images" accept="image/*" multiple className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold text-sm" />
              <p className="text-[11px] text-gray-500 mt-1">You can select multiple images.</p>
            </div>
            <div className="flex items-center gap-2 py-1">
              <input type="checkbox" id="isFeatured" name="isFeatured" value="true" className="w-4 h-4 text-brand-gold border-gray-300 rounded focus:ring-brand-gold" />
              <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 select-none cursor-pointer">Featured Product (appears on homepage)</label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" required rows={3} className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-gold"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-black text-white px-4 py-2 font-medium text-sm hover:bg-gray-800 transition-colors">
              Save Product
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-medium text-gray-600 text-sm w-16">Image</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Name</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Category</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Status</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Featured</th>
                <th className="p-4 font-medium text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No products found</td>
                </tr>
              ) : (
                products.map((product) => {
                  let imageUrl = "/images/hero_bridal.png"
                  try {
                    const parsed = JSON.parse(product.images)
                    if (Array.isArray(parsed) && parsed.length > 0) {
                      imageUrl = parsed[0]
                    }
                  } catch (e) {}

                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="relative w-12 h-16 bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-medium">{product.name}</td>
                      <td className="p-4 text-sm text-gray-600">{product.category.name}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                          {product.isFeatured ? 'Featured' : 'Standard'}
                        </span>
                      </td>
                      <td className="p-4">
                        <form action={async () => { "use server"; await deleteProduct(product.id) }}>
                          <button type="submit" className="text-sm font-medium text-red-600 hover:underline">Delete</button>
                        </form>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
