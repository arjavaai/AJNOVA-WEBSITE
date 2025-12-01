'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DocumentEditor } from '@/components/document-editor'
import { ArrowLeft, Save, Download, Send, Loader2, FileText, RefreshCw } from 'lucide-react'
import { Document } from '@/lib/types'
import { exportToPDF, exportToDOCX } from '@/lib/export-utils'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DocumentViewPage() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.id as string
  
  const [document, setDocument] = useState<Document | null>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [downloading, setDownloading] = useState(false)
  
  useEffect(() => {
    fetchDocument()
  }, [documentId])
  
  async function fetchDocument() {
    try {
      const response = await fetch(`/api/documents/${documentId}`)
      const data = await response.json()
      setDocument(data.document)
      setContent(data.document.content)
    } catch (error) {
      console.error('Error fetching document:', error)
    } finally {
      setLoading(false)
    }
  }
  
  async function handleSave() {
    setSaving(true)
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      
      const data = await response.json()
      setDocument(data.document)
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Error saving document:', error)
      alert('Failed to save document')
    } finally {
      setSaving(false)
    }
  }
  
  async function handleSubmitForReview() {
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content,
          status: 'SUBMITTED',
          submittedAt: new Date().toISOString()
        }),
      })
      
      const data = await response.json()
      setDocument(data.document)
      setShowSubmitDialog(false)
      alert('Document submitted for review!')
    } catch (error) {
      console.error('Error submitting document:', error)
      alert('Failed to submit document')
    }
  }
  
  function handleContentChange(newContent: string) {
    setContent(newContent)
    setHasUnsavedChanges(true)
  }
  
  function getWordCount(html: string): number {
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    return text.split(' ').filter(word => word.length > 0).length
  }
  
  async function handleDownload(format: 'pdf' | 'docx') {
    if (!document) return
    
    setDownloading(true)
    try {
      const studentName = 'Ajay Kumar' // Replace with actual student data
      
      if (format === 'pdf') {
        await exportToPDF(document.title, content, studentName, document.version)
      } else {
        await exportToDOCX(document.title, content, studentName, document.version)
      }
    } catch (error) {
      console.error('Error downloading document:', error)
      alert('Failed to download document')
    } finally {
      setDownloading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }
  
  if (!document) {
    return <div>Document not found</div>
  }
  
  const wordCount = getWordCount(content)
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.push('/dashboard/documents')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Documents
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    {document.title}
                  </CardTitle>
                  <CardDescription>Version {document.version}</CardDescription>
                </div>
                <Badge variant={document.status === 'APPROVED' ? 'success' : 'secondary'}>
                  {document.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <DocumentEditor
                content={content}
                onChange={handleContentChange}
                placeholder="Your document content will appear here..."
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Word Count</div>
                <div className="text-2xl font-bold">{wordCount}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Last Updated</div>
                <div className="text-sm">{new Date(document.updatedAt).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="text-sm font-medium">{document.status.replace('_', ' ')}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={handleSave}
                disabled={!hasUnsavedChanges || saving}
                className="w-full"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </>
                )}
              </Button>
              
              {document.status === 'DRAFT' && (
                <Button
                  onClick={() => setShowSubmitDialog(true)}
                  variant="default"
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>
              )}
              
              <Button
                onClick={() => router.push(`/dashboard/documents/generate?type=${document.type}`)}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full" disabled={downloading}>
                    {downloading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                    Download as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload('docx')}>
                    Download as DOCX
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
          
          {document.counsellorComments && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Counsellor Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{document.counsellorComments}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit for Review?</AlertDialogTitle>
            <AlertDialogDescription>
              Your document will be sent to a counsellor for review. Make sure you've saved all your changes.
              You won't be able to edit it until the review is complete.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitForReview}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
