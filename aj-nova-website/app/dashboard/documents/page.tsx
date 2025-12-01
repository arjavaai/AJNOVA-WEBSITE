'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Eye, Plus, Loader2 } from 'lucide-react'
import { Document, DocumentType } from '@/lib/types'
import { useRouter } from 'next/navigation'

const documentInfo = {
  SOP: {
    title: 'Statement of Purpose',
    description: 'Academic narrative linking your background, motivation, and career goals (800-1200 words)',
    icon: FileText,
  },
  LOR: {
    title: 'Letter of Recommendation',
    description: 'Formal endorsement from professors or employers (400-600 words)',
    icon: FileText,
  },
  RESUME: {
    title: 'Resume/CV',
    description: 'Academic-style CV with education, experience, and skills',
    icon: FileText,
  },
  COVER_LETTER: {
    title: 'Cover Letter',
    description: 'Concise expression of program alignment (300-500 words)',
    icon: FileText,
  },
}

function getStatusBadge(status: string) {
  const variants: Record<string, { variant: any; label: string }> = {
    NOT_STARTED: { variant: 'outline', label: 'Not Started' },
    DRAFT: { variant: 'secondary', label: 'Draft' },
    SUBMITTED: { variant: 'default', label: 'Submitted' },
    UNDER_REVIEW: { variant: 'warning', label: 'Under Review' },
    APPROVED: { variant: 'success', label: 'Approved' },
    NEEDS_REVISION: { variant: 'warning', label: 'Needs Revision' },
    REJECTED: { variant: 'destructive', label: 'Rejected' },
  }
  
  const config = variants[status] || variants.NOT_STARTED
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default function DocumentsPage() {
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchDocuments()
  }, [])
  
  async function fetchDocuments() {
    try {
      const response = await fetch('/api/documents?studentId=1')
      const data = await response.json()
      setDocuments(data.documents)
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }
  
  function handleGenerateDocument(type: DocumentType) {
    router.push(`/dashboard/documents/generate?type=${type}`)
  }
  
  function handleViewDocument(id: string) {
    router.push(`/dashboard/documents/${id}`)
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Document Generation</h1>
        <p className="text-muted-foreground">
          Generate professional admission documents using AI. Edit, review, and download your documents.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(documentInfo).map(([type, info]) => {
          const document = documents.find(d => d.type === type)
          const Icon = info.icon
          
          return (
            <Card key={type} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{info.title}</CardTitle>
                      <CardDescription className="mt-1">{info.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    {getStatusBadge(document?.status || 'NOT_STARTED')}
                  </div>
                  {document && document.updatedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last updated:</span>
                      <span className="text-sm">{new Date(document.updatedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                  {document && document.version > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Version:</span>
                      <span className="text-sm">{document.version}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                {!document || document.status === 'NOT_STARTED' ? (
                  <Button onClick={() => handleGenerateDocument(type as DocumentType)} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => handleViewDocument(document.id)} variant="default" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View & Edit
                    </Button>
                    {document.status === 'APPROVED' && (
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
