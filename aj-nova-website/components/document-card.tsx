'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  FileText,
  Download,
  Eye,
  MoreVertical,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Image as ImageIcon
} from 'lucide-react'
import { UploadedDocument, FILE_TYPE_ICONS } from '@/lib/document-center-types'
import { formatFileSize } from '@/lib/document-center-mock-data'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface DocumentCardProps {
  document: UploadedDocument
  onView?: (document: UploadedDocument) => void
  onDownload?: (document: UploadedDocument) => void
  onDelete?: (document: UploadedDocument) => void
  className?: string
}

export function DocumentCard({ 
  document, 
  onView,
  onDownload,
  onDelete,
  className 
}: DocumentCardProps) {
  
  function getVerificationBadge() {
    const config = {
      PENDING: { variant: 'outline' as const, label: 'Pending', icon: Clock, color: 'text-gray-600' },
      VERIFIED: { variant: 'default' as const, label: 'Verified', icon: CheckCircle2, color: 'text-green-600' },
      NEEDS_CORRECTION: { variant: 'destructive' as const, label: 'Needs Correction', icon: AlertCircle, color: 'text-amber-600' },
      REJECTED: { variant: 'destructive' as const, label: 'Rejected', icon: XCircle, color: 'text-red-600' }
    }
    
    const status = config[document.verificationStatus]
    const Icon = status.icon
    
    return (
      <Badge variant={status.variant} className="text-xs">
        <Icon className="w-3 h-3 mr-1" />
        {status.label}
      </Badge>
    )
  }

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      PERSONAL: 'bg-blue-100 text-blue-800',
      ACADEMIC: 'bg-green-100 text-green-800',
      LANGUAGE: 'bg-purple-100 text-purple-800',
      AI_GENERATED: 'bg-pink-100 text-pink-800',
      APPLICATION: 'bg-orange-100 text-orange-800',
      OTHER: 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors.OTHER
  }

  function getFileIcon() {
    if (['JPG', 'JPEG', 'PNG'].includes(document.fileType)) {
      return <ImageIcon className="w-8 h-8 text-blue-500" />
    }
    return <FileText className="w-8 h-8 text-red-500" />
  }

  const isImage = ['JPG', 'JPEG', 'PNG'].includes(document.fileType)

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* File Icon/Thumbnail */}
          <div className="flex-shrink-0">
            {isImage && document.thumbnailUrl ? (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={document.thumbnailUrl} 
                  alt={document.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center">
                {getFileIcon()}
              </div>
            )}
          </div>

          {/* Document Info */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate mb-1" title={document.name}>
                  {document.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={cn("text-xs", getCategoryColor(document.category))}>
                    {document.category.replace('_', ' ')}
                  </Badge>
                  {getVerificationBadge()}
                  {document.version > 1 && (
                    <Badge variant="outline" className="text-xs">
                      v{document.version}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onView && (
                    <DropdownMenuItem onClick={() => onView(document)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </DropdownMenuItem>
                  )}
                  {onDownload && (
                    <DropdownMenuItem onClick={() => onDownload(document)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {onDelete && (
                    <DropdownMenuItem 
                      onClick={() => onDelete(document)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Description */}
            {document.description && (
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {document.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{formatFileSize(document.fileSize)}</span>
              <span>•</span>
              <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
              {document.linkedApplications && document.linkedApplications.length > 0 && (
                <>
                  <span>•</span>
                  <span className="text-blue-600">
                    {document.linkedApplications.length} application{document.linkedApplications.length > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>

            {/* Counsellor Comments */}
            {document.counsellorComments && (
              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
                <p className="font-medium text-amber-900">Counsellor Comment:</p>
                <p className="text-amber-800">{document.counsellorComments}</p>
              </div>
            )}

            {/* Verified By */}
            {document.verifiedBy && document.verificationStatus === 'VERIFIED' && (
              <div className="mt-2 text-xs text-green-700">
                ✓ Verified by {document.verifiedBy}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DocumentGridProps {
  documents: UploadedDocument[]
  onView?: (document: UploadedDocument) => void
  onDownload?: (document: UploadedDocument) => void
  onDelete?: (document: UploadedDocument) => void
}

export function DocumentGrid({ documents, onView, onDownload, onDelete }: DocumentGridProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
        <h3 className="text-lg font-semibold mb-2">No documents found</h3>
        <p className="text-sm text-muted-foreground">
          Upload your first document to get started
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onView={onView}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
