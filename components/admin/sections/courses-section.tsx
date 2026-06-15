"use client"

import { useState } from "react"
import useSWR from "swr"
import { fetcher } from "../use-admin"
import type { CmsCourse } from "@/lib/cms"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RichTextEditor } from "../rich-text-editor"
import { FileUpload } from "../file-upload"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Plus, Trash2, GraduationCap, X } from "lucide-react"

const LEVELS = ["Beginner", "Beginner to Intermediate", "Intermediate", "Intermediate to Advanced", "Advanced", "All Levels"]

const empty = {
  title: "",
  slug: "",
  description: "",
  image: "",
  duration: "",
  level: "Beginner",
  certification: "",
  fee: 0,
  register_url: "",
  highlights: [] as string[],
  program_overview: "",
  detailed_curriculum: "",
  is_active: true,
}

type FormState = typeof empty & { id?: number }

export function CoursesSection() {
  const { data, isLoading, mutate } = useSWR<{ courses: CmsCourse[] }>("/api/admin/courses", fetcher)
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormState>(empty)
  const [saving, setSaving] = useState(false)
  const [highlightInput, setHighlightInput] = useState("")

  const courses = data?.courses ?? []

  function openCreate() {
    setForm(empty)
    setHighlightInput("")
    setOpen(true)
  }

  function openEdit(c: CmsCourse) {
    setForm({
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      image: c.image,
      duration: c.duration,
      level: c.level,
      certification: c.certification,
      fee: Number(c.fee),
      register_url: c.register_url,
      highlights: c.highlights ?? [],
      program_overview: c.program_overview,
      detailed_curriculum: c.detailed_curriculum,
      is_active: c.is_active,
    })
    setHighlightInput("")
    setOpen(true)
  }

  function addHighlight() {
    const v = highlightInput.trim()
    if (!v) return
    setForm((f) => ({ ...f, highlights: [...f.highlights, v] }))
    setHighlightInput("")
  }

  async function save() {
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" })
      return
    }
    setSaving(true)
    try {
      const method = form.id ? "PUT" : "POST"
      const url = form.id ? `/api/admin/courses/${form.id}` : "/api/admin/courses"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Save failed")
      toast({ title: form.id ? "Course updated" : "Course created" })
      setOpen(false)
      mutate()
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(c: CmsCourse) {
    await fetch(`/api/admin/courses/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !c.is_active }),
    })
    mutate()
  }

  async function remove(c: CmsCourse) {
    if (!confirm(`Delete course "${c.title}"? This cannot be undone.`)) return
    await fetch(`/api/admin/courses/${c.id}`, { method: "DELETE" })
    toast({ title: "Course deleted" })
    mutate()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Courses</h1>
          <p className="text-sm text-muted-foreground">Manage course content, curriculum, and registration.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading courses...</p>
      ) : courses.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No courses yet. Add your first course.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div key={c.id} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
              <div className="relative h-40 w-full bg-muted">
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image || "/placeholder.svg"} alt={c.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                )}
                <Badge
                  className="absolute right-2 top-2"
                  variant={c.is_active ? "default" : "secondary"}
                >
                  {c.is_active ? "Live" : "Disabled"}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{c.level}</Badge>
                  <Badge variant="outline">{c.duration}</Badge>
                </div>
                <h3 className="font-semibold leading-tight text-foreground text-pretty">{c.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                <p className="mt-auto text-sm font-medium text-foreground">
                  {c.fee > 0 ? `PKR ${Number(c.fee).toLocaleString()}` : "Free"}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-2">
                    <Switch checked={c.is_active} onCheckedChange={() => toggleActive(c)} aria-label="Toggle live" />
                    <span className="text-xs text-muted-foreground">Live on site</span>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(c)} aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(c)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Course" : "Add Course"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="c-title">Course Title</Label>
              <Input id="c-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c-desc">Short Description</Label>
              <Textarea
                id="c-desc"
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="c-duration">Duration</Label>
                <Input
                  id="c-duration"
                  placeholder="e.g. 3 Months"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Level</Label>
                <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="c-cert">Certification Type</Label>
                <Input
                  id="c-cert"
                  placeholder="e.g. Professional Certificate"
                  value={form.certification}
                  onChange={(e) => setForm({ ...form, certification: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="c-fee">Fee (PKR)</Label>
                <Input
                  id="c-fee"
                  type="number"
                  value={form.fee}
                  onChange={(e) => setForm({ ...form, fee: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="c-register">Register Now URL</Label>
              <Input
                id="c-register"
                placeholder="/register or https://..."
                value={form.register_url}
                onChange={(e) => setForm({ ...form, register_url: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Course Image</Label>
              <FileUpload
                value={form.image}
                folder="courses"
                accept="image/*"
                onChange={(url) => setForm({ ...form, image: url })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Highlights</Label>
              <div className="flex gap-2">
                <Input
                  value={highlightInput}
                  placeholder="Add a highlight and press Add"
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addHighlight()
                    }
                  }}
                />
                <Button type="button" variant="secondary" onClick={addHighlight}>
                  Add
                </Button>
              </div>
              {form.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.highlights.map((h, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {h}
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, highlights: f.highlights.filter((_, idx) => idx !== i) }))}
                        aria-label={`Remove ${h}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Program Overview</Label>
              <RichTextEditor
                value={form.program_overview}
                onChange={(html) => setForm({ ...form, program_overview: html })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Detailed Curriculum</Label>
              <RichTextEditor
                value={form.detailed_curriculum}
                onChange={(html) => setForm({ ...form, detailed_curriculum: html })}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="c-active"
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
              />
              <Label htmlFor="c-active">Enabled (visible on website)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
