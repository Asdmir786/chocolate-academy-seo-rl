"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, RefreshCw, XCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Newsletter = {
  id: number
  title: string
  month: string
  year: number
  description: string | null
  pdf_url: string
  download_name?: string
  download_url: string
  is_published: boolean
  created_at: string
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
const YEARS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 1 + i)

export default function NewslettersAdminPage() {
  const router = useRouter()
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [title, setTitle] = useState("")
  const [month, setMonth] = useState(MONTHS[new Date().getMonth()])
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState("")
  const [isPublished, setIsPublished] = useState(true)
  const [uploadError, setUploadError] = useState<string | null>(null)

  useEffect(() => {
    fetchNewsletters()
  }, [router])

  const fetchNewsletters = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/newsletters")
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      if (!res.ok) throw new Error("Failed to fetch newsletters")
      const data = await res.json()
      setNewsletters(Array.isArray(data?.newsletters) ? data.newsletters : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching data")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setUploadError(null)

    if (!file && !pdfUrl) {
      setUploadError("Please upload a PDF or provide a URL")
      setSubmitting(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("month", month)
      formData.append("year", year)
      formData.append("description", description)
      formData.append("is_published", isPublished.toString())
      if (file) formData.append("file", file)
      if (pdfUrl) formData.append("pdf_url", pdfUrl)

      const res = await fetch("/api/admin/newsletters", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to publish newsletter")
      }

      // Reset form and close modal
      setTitle("")
      setDescription("")
      setFile(null)
      setPdfUrl("")
      setIsModalOpen(false)
      
      fetchNewsletters()
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fdf6f0] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#3c2415]">Newsletters</h1>
            <p className="text-gray-600">Manage your monthly journal publications</p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={fetchNewsletters} 
              disabled={loading}
              className="border-[#3c2415] text-[#3c2415]"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#3c2415] hover:bg-[#5a3620] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Publish Newsletter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Publish Newsletter</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      required 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      placeholder="e.g. CA Journal May-2026" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Month</Label>
                      <Select value={month} onValueChange={setMonth}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Select value={year} onValueChange={setYear}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                      placeholder="Add a brief description..." 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Newsletter PDF</Label>
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded border border-gray-300">
                        <FileText className="h-6 w-6 text-gray-500" />
                      </div>
                      <Input 
                        type="file" 
                        accept="application/pdf"
                        onChange={e => setFile(e.target.files?.[0] || null)}
                        className="flex-1 cursor-pointer"
                      />
                    </div>
                    <div className="text-center text-sm text-gray-500 my-2">OR</div>
                    <Input 
                      placeholder="Paste a PDF URL / path" 
                      value={pdfUrl} 
                      onChange={e => setPdfUrl(e.target.value)} 
                      disabled={!!file}
                    />
                    {uploadError && (
                      <p className="text-sm text-red-500 mt-1">{uploadError}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Switch 
                      id="published" 
                      checked={isPublished}
                      onCheckedChange={setIsPublished}
                    />
                    <Label htmlFor="published">Published (visible on website)</Label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting} className="bg-[#3c2415] hover:bg-[#5a3620] text-white">
                      {submitting ? 'Publishing...' : 'Publish'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Published Journals</CardTitle>
            <CardDescription>
              A list of all uploaded newsletters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading newsletters...</div>
            ) : newsletters.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No newsletters published yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Period</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Date Added</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletters.map((nl) => (
                      <tr key={nl.id} className="bg-white border-b">
                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#3c2415]" />
                          {nl.title}
                        </td>
                        <td className="px-6 py-4">{nl.month} {nl.year}</td>
                        <td className="px-6 py-4">
                          <Badge variant={nl.is_published ? "default" : "secondary"} 
                                className={nl.is_published ? "bg-green-600" : ""}>
                            {nl.is_published ? "Published" : "Draft"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">{new Date(nl.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <a href={nl.download_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            View PDF
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
