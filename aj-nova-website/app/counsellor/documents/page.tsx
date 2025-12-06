'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Eye } from 'lucide-react'
import { Document } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function CounsellorDocumentsPage() {
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchPendingDocuments()
  }, [])
  
  async function fetchPendingDocuments() {
    try {
      const response = await fetch('/api/documents?status=pending')
      const data = await response.json()
      const submitted = (data.documents || []).filter(
        (d: Document) => d.status === 'SUBMITTED' || d.status === 'UNDER_REVIEW'
      )
      setDocuments(submitted)
    } catch (error) {
      console.error('Error fetching documents:', error)
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Document Reviews</h1>
        <p className="text-muted-foreground">
          Review and approve student documents
        </p>
      </div>
      
      {documents.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No documents pending review</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map(doc => (
            <Card key={doc.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {doc.title}
                </CardTitle>
                <CardDescription>Version {doc.version}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge variant="warning">{doc.status.replace('_', ' ')}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Submitted:</span>
                    <span className="text-sm">
                      {doc.submittedAt ? new Date(doc.submittedAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => router.push(`/counsellor/documents/${doc.id}`)}
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Review
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
