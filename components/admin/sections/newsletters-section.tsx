"use client"

import { useState } from "react"
import useSWR from "swr"
import { fetcher } from "../use-admin"
import type { Newsletter } from "@/lib/cms"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileUpload } from "../file-upload"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Plus, Trash2, FileText, ExternalLink } from "lucide-react"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 8 }, (_, i) => currentYear - 5 + i)

const empty = {
  title: "",
  month: MONTHS[new Date().getMonth()],
  year: currentYear,
  pdf_url: "",
  download_name: "",
  description: "",
  is_active: true,
}

type FormState = typeof empty & { id?: number }

export function NewslettersSection() {
  const { data, isLoading, mutate } = useSWR<{ newsletters: Newsletter[] }>("/api/admin/newsletters", fetcher)
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormState>(empty)
  const [saving, setSaving] = useState(false)

  const newsletters = data?.newsletters ?? []

  function openCreate() {
    setForm(empty)
    setOpen(true)
  }

  function openEdit(n: Newsletter) {
    setForm({
      id: n.id,
      title: n.title,
      month: n.month,
      year: n.year,
      pdf_url: n.pdf_url,
      download_name: n.download_name,
      description: n.description,
      is_active: n.is_active,
    })
    setOpen(true)
  }

  async function save() {
    if (!form.title.trim() || !form.pdf_url) {
      toast({ title: "Title and PDF are required", variant: "destructive" })
      return
    }
    setSaving(true)
    try {
      const method = form.id ? "PUT" : "POST"
      const url = form.id ? `/api/admin/newsletters/${form.id}` : "/api/admin/newsletters"
      const payload = {
        ...form,
        download_name: form.download_name || `${form.title}.pdf`,
      }
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      toast({ title: form.id ? "Newsletter updated" : "Newsletter published" })
      setOpen(false)
      mutate()
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(n: Newsletter) {
    await fetch(`/api/admin/newsletters/${n.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !n.is_active }),
    })
    mutate()
  }

  async function remove(n: Newsletter) {
    if (!confirm(`Delete newsletter "${n.title}"?`)) return
    await fetch(`/api/admin/newsletters/${n.id}`, { method: "DELETE" })
    toast({ title: "Newsletter deleted" })
    mutate()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Newsletters</h1>
          <p className="text-sm text-muted-foreground">
            Publish monthly newsletters with PDF links to the public newsletter page.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Newsletter
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>PDF</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : newsletters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No newsletters yet.
                </TableCell>
              </TableRow>
            ) : (
              newsletters.map((n) => (
                <TableRow key={n.id}>
                  <TableCell className="font-medium text-foreground">{n.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {n.month} {n.year}
                  </TableCell>
                  <TableCell>
                    {n.pdf_url ? (
                      <a
                        href={n.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <FileText className="h-4 w-4" /> View <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={n.is_active} onCheckedChange={() => toggleActive(n)} aria-label="Toggle" />
                      <Badge variant={n.is_active ? "default" : "secondary"}>
                        {n.is_active ? "Published" : "Hidden"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(n)} aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(n)} aria-label="Delete">
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
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Newsletter" : "Publish Newsletter"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="n-title">Title</Label>
              <Input id="n-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Month</Label>
                <Select value={form.month} onValueChange={(v) => setForm({ ...form, month: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Year</Label>
                <Select value={String(form.year)} onValueChange={(v) => setForm({ ...form, year: Number(v) })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="n-desc">Description</Label>
              <Textarea
                id="n-desc"
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Newsletter PDF</Label>
              <FileUpload
                value={form.pdf_url}
                folder="newsletters"
                accept="application/pdf"
                kind="pdf"
                onChange={(url) => setForm((f) => ({ ...f, pdf_url: url }))}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="n-active"
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
              />
              <Label htmlFor="n-active">Published (visible on website)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
