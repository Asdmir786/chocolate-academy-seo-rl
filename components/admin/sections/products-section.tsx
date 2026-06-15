"use client"

import { useState } from "react"
import useSWR from "swr"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { FileUpload } from "../file-upload"
import { fetcher, apiSend } from "../use-admin"
import type { CmsProduct, Category, City } from "@/lib/cms"

const empty = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  weight: "",
  sku: "",
  rating: 5,
  discount: 0,
  is_new: false,
  featured: false,
  is_active: true,
  city_slugs: [] as string[],
}

export function ProductsSection() {
  const { toast } = useToast()
  const { data, mutate, isLoading } = useSWR<{ products: CmsProduct[] }>("/api/admin/products", fetcher)
  const { data: catData } = useSWR<{ categories: Category[] }>("/api/admin/categories", fetcher)
  const { data: cityData } = useSWR<{ cities: City[] }>("/api/admin/cities", fetcher)

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<CmsProduct | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [query, setQuery] = useState("")

  const products = data?.products ?? []
  const categories = catData?.categories ?? []
  const cities = cityData?.cities ?? []

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()),
  )

  const openNew = () => {
    setEditing(null)
    setForm({ ...empty, city_slugs: cities.map((c) => c.slug) })
    setOpen(true)
  }

  const openEdit = (p: CmsProduct) => {
    setEditing(p)
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      weight: p.weight ?? "",
      sku: p.sku ?? "",
      rating: p.rating,
      discount: p.discount,
      is_new: p.is_new,
      featured: p.featured,
      is_active: p.is_active,
      city_slugs: p.city_slugs ?? [],
    })
    setOpen(true)
  }

  const save = async () => {
    if (!form.name || !form.category) {
      toast({ title: "Missing fields", description: "Name and category are required.", variant: "destructive" })
      return
    }
    setSaving(true)
    try {
      if (editing) {
        await apiSend(`/api/admin/products/${editing.id}`, "PUT", form)
        toast({ title: "Product updated" })
      } else {
        await apiSend("/api/admin/products", "POST", form)
        toast({ title: "Product created" })
      }
      setOpen(false)
      mutate()
    } catch (e) {
      toast({ title: "Error", description: (e as Error).message, variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (p: CmsProduct) => {
    try {
      await apiSend(`/api/admin/products/${p.id}`, "PATCH", { is_active: !p.is_active })
      mutate()
    } catch (e) {
      toast({ title: "Error", description: (e as Error).message, variant: "destructive" })
    }
  }

  const confirmDelete = async () => {
    if (deleteId == null) return
    try {
      await apiSend(`/api/admin/products/${deleteId}`, "DELETE")
      toast({ title: "Product deleted" })
      mutate()
    } catch (e) {
      toast({ title: "Error", description: (e as Error).message, variant: "destructive" })
    } finally {
      setDeleteId(null)
    }
  }

  const toggleCity = (slug: string) => {
    setForm((f) => ({
      ...f,
      city_slugs: f.city_slugs.includes(slug)
        ? f.city_slugs.filter((s) => s !== slug)
        : [...f.city_slugs, slug],
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={openNew} className="bg-[#2c1a10] hover:bg-[#3c2415]">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden lg:table-cell">Cities</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  Loading products...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image || "/placeholder.svg"}
                        alt={p.name}
                        className="h-10 w-10 shrink-0 rounded object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{p.sku || p.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary">{p.category}</Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">Rs. {p.price.toLocaleString()}</TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                    {p.city_slugs?.length ? `${p.city_slugs.length} cities` : "All"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={p.is_active} onCheckedChange={() => toggleActive(p)} />
                      <span className="text-xs text-muted-foreground">{p.is_active ? "Live" : "Hidden"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => setDeleteId(p.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>Fields marked with an asterisk (*) are required.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Price (Rs.) *</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Weight</Label>
              <Input
                value={form.weight}
                placeholder="e.g. 2 lb"
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Discount (%)</Label>
              <Input
                type="number"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Product Image</Label>
              <FileUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="products" />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Cities to sell in (WhatsApp routing)</Label>
              <div className="flex flex-wrap gap-3 rounded-md border p-3">
                {cities.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={form.city_slugs.includes(c.slug)}
                      onCheckedChange={() => toggleCity(c.slug)}
                    />
                    {c.name}
                  </label>
                ))}
                {cities.length === 0 && (
                  <p className="text-xs text-muted-foreground">Add cities in Settings first.</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={form.is_new} onCheckedChange={(v) => setForm({ ...form, is_new: v })} /> New
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} /> Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /> Active
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving} className="bg-[#2c1a10] hover:bg-[#3c2415]">
              {saving ? "Saving..." : editing ? "Save changes" : "Create product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId != null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the product from your catalog and the website. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
