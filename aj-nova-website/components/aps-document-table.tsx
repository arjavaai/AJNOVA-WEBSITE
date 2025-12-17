'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  Upload,
  ChevronDown,
  ChevronRight,
  FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface APSDocument {
  id: string
  name: string
  file_url?: string
  file_name?: string
  uploaded_at?: string
  status: 'NOT_UPLOADED' | 'UPLOADED' | 'UNDER_REVIEW' | 'VERIFIED' | 'NEEDS_CORRECTION'
  counsellor_comments?: string
  reviewed_at?: string
}

interface APSDocumentTableProps {
  documents: APSDocument[]
  onUpload?: (documentId: string) => void
  onView?: (document: APSDocument) => void
  className?: string
}

export function APSDocumentTable({
  documents,
  onUpload,
  onView,
  className,
}: APSDocumentTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const getStatusBadge = (status: APSDocument['status']) => {
    const config = {
      NOT_UPLOADED: {
        label: 'Not Uploaded',
        variant: 'outline' as const,
        className: 'border-gray-400 text-gray-600',
        icon: FileText,
      },
      UPLOADED: {
        label: 'Uploaded',
        variant: 'secondary' as const,
        className: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: Clock,
      },
      UNDER_REVIEW: {
        label: 'Under Review',
        variant: 'default' as const,
        className: 'bg-amber-100 text-amber-700 border-amber-300',
        icon: Clock,
      },
      VERIFIED: {
        label: 'Verified',
        variant: 'default' as const,
        className: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle2,
      },
      NEEDS_CORRECTION: {
        label: 'Needs Correction',
        variant: 'destructive' as const,
        className: 'bg-red-100 text-red-700 border-red-300',
        icon: AlertCircle,
      },
    }

    const statusConfig = config[status]
    const Icon = statusConfig.icon

    return (
      <Badge variant={statusConfig.variant} className={cn(statusConfig.className, 'gap-1')}>
        <Icon className="w-3 h-3" />
        {statusConfig.label}
      </Badge>
    )
  }

  const hasComments = (doc: APSDocument) => {
    return doc.counsellor_comments && doc.counsellor_comments.trim().length > 0
  }

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12"></TableHead>
            <TableHead>Document Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No documents found
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc) => (
              <>
                {/* Main Row */}
                <TableRow key={doc.id} className={cn(
                  "hover:bg-muted/50 transition-colors",
                  doc.status === 'NEEDS_CORRECTION' && "bg-red-50/50"
                )}>
                  {/* Expand Button */}
                  <TableCell>
                    {hasComments(doc) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => toggleRow(doc.id)}
                      >
                        {expandedRows.has(doc.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </TableCell>

                  {/* Document Name */}
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{doc.name}</span>
                      {doc.file_name && (
                        <span className="text-xs text-muted-foreground">{doc.file_name}</span>
                      )}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>

                  {/* Upload Date */}
                  <TableCell>
                    {doc.uploaded_at ? (
                      <span className="text-sm" suppressHydrationWarning>
                        {formatDistanceToNow(new Date(doc.uploaded_at), { addSuffix: true })}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {doc.file_url && onView && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(doc)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      )}
                      {(doc.status === 'NOT_UPLOADED' || doc.status === 'NEEDS_CORRECTION') && onUpload && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpload(doc.id)}
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          {doc.status === 'NOT_UPLOADED' ? 'Upload' : 'Re-upload'}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Row - Counsellor Comments */}
                {expandedRows.has(doc.id) && hasComments(doc) && (
                  <TableRow key={`${doc.id}-comments`}>
                    <TableCell></TableCell>
                    <TableCell colSpan={4} className="bg-amber-50/50 border-l-4 border-l-amber-500">
                      <div className="py-3">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-amber-900 mb-1">
                              Counsellor Comments
                            </p>
                            <p className="text-sm text-amber-800 whitespace-pre-wrap">
                              {doc.counsellor_comments}
                            </p>
                            {doc.reviewed_at && (
                              <p className="text-xs text-amber-600 mt-2" suppressHydrationWarning>
                                Reviewed {formatDistanceToNow(new Date(doc.reviewed_at), { addSuffix: true })}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          )}
        </TableBody>
      </Table>

      {/* Summary Footer */}
      {documents.length > 0 && (
        <div className="border-t bg-muted/30 px-4 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Total: {documents.length} documents
            </span>
            <span className="text-green-700">
              ✓ Verified: {documents.filter(d => d.status === 'VERIFIED').length}
            </span>
            <span className="text-red-700">
              ⚠ Needs Action: {documents.filter(d => d.status === 'NEEDS_CORRECTION' || d.status === 'NOT_UPLOADED').length}
            </span>
          </div>
          {documents.every(d => d.status === 'VERIFIED') && (
            <div className="flex items-center gap-2 text-green-700 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              All documents verified!
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Pre-defined common APS documents
export const COMMON_APS_DOCUMENTS: Omit<APSDocument, 'id'>[] = [
  {
    name: 'Degree Certificate',
    status: 'NOT_UPLOADED',
  },
  {
    name: 'Transcripts / Mark Sheets',
    status: 'NOT_UPLOADED',
  },
  {
    name: 'Passport Copy',
    status: 'NOT_UPLOADED',
  },
  {
    name: 'Language Certificate (English)',
    status: 'NOT_UPLOADED',
  },
  {
    name: 'Language Certificate (German)',
    status: 'NOT_UPLOADED',
  },
  {
    name: 'Secondary School Certificate (10th)',
    status: 'NOT_UPLOADED',
  },
  {
    name: 'Higher Secondary Certificate (12th)',
    status: 'NOT_UPLOADED',
  },
]
