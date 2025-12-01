'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle, Clock, XCircle, Eye } from 'lucide-react'
import { UploadedFile, DocumentVerificationStatus } from '@/lib/aps-types'

interface DocumentStatusTableProps {
  documents: Array<{
    name: string
    file?: UploadedFile
    required: boolean
  }>
  onReupload?: (documentName: string) => void
  onView?: (file: UploadedFile) => void
}

function getStatusIcon(status: DocumentVerificationStatus) {
  switch (status) {
    case 'VERIFIED':
    case 'REVIEWED':
      return <CheckCircle2 className="w-4 h-4 text-green-600" />
    case 'NEEDS_CORRECTION':
      return <AlertCircle className="w-4 h-4 text-amber-600" />
    case 'REJECTED':
      return <XCircle className="w-4 h-4 text-red-600" />
    default:
      return <Clock className="w-4 h-4 text-gray-400" />
  }
}

function getStatusBadge(status: DocumentVerificationStatus) {
  const config: Record<DocumentVerificationStatus, { variant: any; label: string }> = {
    PENDING: { variant: 'outline', label: 'Pending Review' },
    REVIEWED: { variant: 'secondary', label: 'Reviewed' },
    VERIFIED: { variant: 'default', label: 'Verified' },
    NEEDS_CORRECTION: { variant: 'destructive', label: 'Needs Correction' },
    REJECTED: { variant: 'destructive', label: 'Rejected' }
  }
  
  return <Badge variant={config[status].variant}>{config[status].label}</Badge>
}

export function DocumentStatusTable({ documents, onReupload, onView }: DocumentStatusTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Verification Status</CardTitle>
        <CardDescription>Track the status of your uploaded documents</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {doc.name}
                  {doc.required && <span className="text-red-500 ml-1">*</span>}
                </TableCell>
                <TableCell>
                  {doc.file ? (
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.file.status)}
                      {getStatusBadge(doc.file.status)}
                    </div>
                  ) : (
                    <Badge variant="outline">Not Uploaded</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {doc.file ? new Date(doc.file.uploadedAt).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {doc.file && onView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(doc.file!)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    )}
                    {doc.file && doc.file.status === 'NEEDS_CORRECTION' && onReupload && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReupload(doc.name)}
                      >
                        Re-upload
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {documents.some(d => d.file?.comments) && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold">Counsellor Comments</h4>
            {documents.filter(d => d.file?.comments).map((doc, index) => (
              <div key={index} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm font-medium text-amber-900">{doc.name}</p>
                <p className="text-sm text-amber-800 mt-1">{doc.file?.comments}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
