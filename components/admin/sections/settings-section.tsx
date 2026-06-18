"use client"

import { useState } from "react"
import useSWR from "swr"
import { fetcher } from "../use-admin"
import type { City, Category } from "@/lib/cms"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Plus, Trash2, MapPin, Tag, Users } from "lucide-react"

type Admin = { id: number; name: string; email: string; created_at: string }

export function SettingsSection({ currentEmail }: { currentEmail: string }) {
  const [tab, setTab] = useState<"cities" | "categories" | "admins">("cities")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage cities, categories, and admin users.</p>
      </div>

      <div className="inline-flex rounded-lg border border-border bg-card p-1">
        {[
          { id: "cities" as const, label: "Cities", icon: MapPin },
          { id: "categories" as const, label: "Categories", icon: Tag },
          { id: "admins" as const, label: "Admins", icon: Users },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "cities" && <CitiesPanel />}
      {tab === "categories" && <CategoriesPanel />}
      {tab === "admins" && <AdminsPanel currentEmail={currentEmail} />}
    </div>
  )
}

function CitiesPanel() {
  const { data, isLoading, mutate } = useSWR<{ cities: City[] }>("/api/admin/cities", fetcher)
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<{ id?: number; name: string; whatsapp_number: string; is_active: boolean }>({
    name: "",
    whatsapp_number: "",
    is_active: true,
  })

  const cities = data?.cities ?? []

  async function save() {
    if (!form.name.trim() || !form.whatsapp_number.trim()) {
      toast({ title: "Name and WhatsApp number required", variant: "destructive" })
      return
    }
    const method = form.id ? "PUT" : "POST"
    const url = form.id ? `/api/admin/cities/${form.id}` : "/api/admin/cities"
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    toast({ title: form.id ? "City updated" : "City added" })
    setOpen(false)
    mutate()
  }

  async function remove(c: City) {
    if (!confirm(`Delete city "${c.name}"?`)) return
    await fetch(`/api/admin/cities/${c.id}`, { method: "DELETE" })
    mutate()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setForm({ name: "", whatsapp_number: "", is_active: true })
            setOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add City
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Master list of cities. The WhatsApp number here is used for product inquiries from that city.
      </p>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>WhatsApp Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              cities.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{c.whatsapp_number}</TableCell>
                  <TableCell>
                    <Badge variant={c.is_active ? "default" : "secondary"}>
                      {c.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setForm({
                          id: c.id,
                          name: c.name,
                          whatsapp_number: c.whatsapp_number,
                          is_active: c.is_active,
                        })
                        setOpen(true)
                      }}
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(c)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit City" : "Add City"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="city-name">City Name</Label>
              <Input id="city-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city-wa">WhatsApp Number</Label>
              <Input
                id="city-wa"
                placeholder="e.g. 923001234567"
                value={form.whatsapp_number}
                onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="city-active"
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
              />
              <Label htmlFor="city-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CategoriesPanel() {
  const { data, isLoading, mutate } = useSWR<{ categories: Category[] }>("/api/admin/categories", fetcher)
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<{ id?: number; name: string; is_active: boolean }>({
    name: "",
    is_active: true,
  })

  const categories = data?.categories ?? []

  async function save() {
    if (!form.name.trim()) {
      toast({ title: "Name required", variant: "destructive" })
      return
    }
    const method = form.id ? "PUT" : "POST"
    const url = form.id ? `/api/admin/categories/${form.id}` : "/api/admin/categories"
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    toast({ title: form.id ? "Category updated" : "Category added" })
    setOpen(false)
    mutate()
  }

  async function remove(c: Category) {
    if (!confirm(`Delete category "${c.name}"?`)) return
    await fetch(`/api/admin/categories/${c.id}`, { method: "DELETE" })
    mutate()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setForm({ name: "", is_active: true })
            setOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              categories.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant={c.is_active ? "default" : "secondary"}>
                      {c.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setForm({ id: c.id, name: c.name, is_active: c.is_active })
                        setOpen(true)
                      }}
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(c)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="cat-name">Category Name</Label>
              <Input id="cat-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="cat-active"
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
              />
              <Label htmlFor="cat-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AdminsPanel({ currentEmail }: { currentEmail: string }) {
  const { data, isLoading, mutate } = useSWR<{ admins: Admin[] }>("/api/admin/admins", fetcher)
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<{ id?: number; name: string; email: string; password: string }>({
    name: "",
    email: "",
    password: "",
  })

  const admins = data?.admins ?? []

  async function save() {
    if (!form.name.trim() || !form.email.trim() || (!form.id && !form.password)) {
      toast({ title: "Name, email and password are required", variant: "destructive" })
      return
    }
    const method = form.id ? "PUT" : "POST"
    const url = form.id ? `/api/admin/admins/${form.id}` : "/api/admin/admins"
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      toast({ title: j.error || "Failed to save admin", variant: "destructive" })
      return
    }
    toast({ title: form.id ? "Admin updated" : "Admin added" })
    setOpen(false)
    mutate()
  }

  async function remove(a: Admin) {
    if (a.email === currentEmail) {
      toast({ title: "You cannot delete your own account", variant: "destructive" })
      return
    }
    if (!confirm(`Remove admin "${a.email}"?`)) return
    await fetch(`/api/admin/admins/${a.id}`, { method: "DELETE" })
    mutate()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setForm({ name: "", email: "", password: "" })
            setOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Admin
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">All admins can view and manage everything.</p>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              admins.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-foreground">
                    {a.name}
                    {a.email === currentEmail && (
                      <Badge variant="outline" className="ml-2">
                        You
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{a.email}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(a.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setForm({ id: a.id, name: a.name, email: a.email, password: "" })
                        setOpen(true)
                      }}
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(a)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Admin" : "Add Admin"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="adm-name">Name</Label>
              <Input id="adm-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adm-email">Email</Label>
              <Input
                id="adm-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adm-pass">{form.id ? "New Password (leave blank to keep)" : "Password"}</Label>
              <Input
                id="adm-pass"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
