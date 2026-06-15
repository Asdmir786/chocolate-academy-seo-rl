"use client"

import { useState, useRef } from "react"
import { Upload, X, FileText, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileUploadProps {
  value: string
  onChange: (url: string) => void
  folder: string
  accept?: string
  kind?: "image" | "pdf"
}

export function FileUpload({ value, onChange, folder, accept = "image/*", kind = "image" }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (res.ok && data.success) {
        onChange(data.url)
      } else {
        setError(data.error || "Upload failed")
      }
    } catch {
      setError("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {value ? (
          kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value || "/placeholder.svg"}
              alt="Preview"
              className="h-16 w-16 rounded-md border object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-md border bg-muted">
              <FileText className="h-7 w-7 text-amber-700" />
            </div>
          )
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed bg-muted/50">
            {kind === "image" ? (
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            ) : (
              <FileText className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> {value ? "Replace" : "Upload"} {kind === "pdf" ? "PDF" : "image"}
              </>
            )}
          </Button>
          {value && (
            <Button type="button" variant="ghost" size="sm" className="text-destructive" onClick={() => onChange("")}>
              <X className="mr-1 h-3 w-3" /> Remove
            </Button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ""
        }}
      />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Or paste a ${kind === "pdf" ? "PDF" : "image"} URL / path`}
        className="text-xs"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
