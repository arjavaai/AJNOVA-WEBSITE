'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Document } from '@/lib/types'

export default function CounsellorReviewPage() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.id as string
  
  const [document, setDocument] = useState<Document | null>(null)
  const [comments, setComments] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  useEffect(() => {
    fetchDocument()
  }, [documentId])
  
  async function fetchDocument() {
    try {
      const response = await fetch(`/api/documents/${documentId}`)
      const data = await response.json()
      setDocument(data.document)
      setComments(data.document.counsellorComments || '')
    } catch (error) {
      console.error('Error fetching document:', error)
    } finally {
      setLoading(false)
    }
  }
  
  async function handleReview(status: 'APPROVED' | 'NEEDS_REVISION') {
    if (status === 'NEEDS_REVISION' && !comments.trim()) {
      alert('Please provide feedback for revision')
      return
    }
    
    setSubmitting(true)
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          counsellorComments: comments,
          reviewedAt: new Date().toISOString()
        }),
      })
      
      if (response.ok) {
        alert(`Document ${status === 'APPROVED' ? 'approved' : 'sent back for revision'}!`)
        router.push('/counsellor/documents')
      }
    } catch (error) {
      console.error('Error reviewing document:', error)
      alert('Failed to submit review')
    } finally {
      setSubmitting(false)
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
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.push('/counsellor/documents')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Reviews
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{document.title}</CardTitle>
                <Badge variant="warning">{document.status.replace('_', ' ')}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none p-6 bg-muted rounded-lg"
                dangerouslySetInnerHTML={{ __html: document.content }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Version</div>
                <div className="font-medium">{document.version}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Submitted</div>
                <div className="text-sm">
                  {document.submittedAt 
                    ? new Date(document.submittedAt).toLocaleString()
                    : 'N/A'
                  }
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Word Count</div>
                <div className="font-medium">
                  {document.content.replace(/<[^>]*>/g, ' ').split(' ').filter(w => w.length > 0).length}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comments">Feedback / Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Provide detailed feedback..."
                  rows={8}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={() => handleReview('APPROVED')}
                  disabled={submitting}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Approve Document
                </Button>
                
                <Button
                  onClick={() => handleReview('NEEDS_REVISION')}
                  disabled={submitting}
                  variant="destructive"
                  className="w-full"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  Request Revision
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
