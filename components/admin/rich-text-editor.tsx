"use client"

import { useEffect, useRef } from "react"
import { Bold, Italic, List, ListOrdered, Heading, Link2, Undo, Redo } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  // Keep the editor DOM in sync when the value prop changes externally (e.g. opening a different record).
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ""
    }
  }, [value])

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg)
    editorRef.current?.focus()
    handleInput()
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const addLink = () => {
    const url = window.prompt("Enter the URL")
    if (url) exec("createLink", url)
  }

  const tools = [
    { icon: Heading, label: "Heading", action: () => exec("formatBlock", "<h4>") },
    { icon: Bold, label: "Bold", action: () => exec("bold") },
    { icon: Italic, label: "Italic", action: () => exec("italic") },
    { icon: List, label: "Bullet list", action: () => exec("insertUnorderedList") },
    { icon: ListOrdered, label: "Numbered list", action: () => exec("insertOrderedList") },
    { icon: Link2, label: "Link", action: addLink },
    { icon: Undo, label: "Undo", action: () => exec("undo") },
    { icon: Redo, label: "Redo", action: () => exec("redo") },
  ]

  return (
    <div className="rounded-md border border-input bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-input p-1">
        {tools.map((tool) => (
          <Button
            key={tool.label}
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title={tool.label}
            onMouseDown={(e) => {
              e.preventDefault()
              tool.action()
            }}
          >
            <tool.icon className="h-4 w-4" />
            <span className="sr-only">{tool.label}</span>
          </Button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        onInput={handleInput}
        data-placeholder={placeholder}
        className="prose prose-sm max-w-none min-h-[160px] px-3 py-2 text-sm focus:outline-none [&_h4]:font-bold [&_h4]:text-base [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-amber-700 [&_a]:underline empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
        suppressContentEditableWarning
      />
    </div>
  )
}
