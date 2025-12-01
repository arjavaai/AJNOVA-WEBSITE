'use client'

import { useState, useRef, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Upload, X, FileText, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { UploadedFile, DocumentVerificationStatus } from '@/lib/aps-types'

interface FileUploadProps {
  label: string
  description?: string
  accept?: string
  maxSize?: number // in MB
  multiple?: boolean
  files: UploadedFile[]
  onChange: (files: UploadedFile[]) => void
  disabled?: boolean
  required?: boolean
}

export function FileUpload({
  label,
  description,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 10,
  multiple = false,
  files,
  onChange,
  disabled = false,
  required = false
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const validateFile = (file: File): string | null => {
    const maxBytes = maxSize * 1024 * 1024
    if (file.size > maxBytes) {
      return `File size exceeds ${maxSize}MB limit`
    }

    const acceptedTypes = accept.split(',').map(t => t.trim())
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not supported. Accepted: ${accept}`
    }

    return null
  }

  const simulateUpload = async (file: File): Promise<UploadedFile> => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 100)

      setTimeout(() => {
        clearInterval(interval)
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size,
          uploadedAt: new Date(),
          status: 'PENDING'
        })
      }, 1500)
    })
  }

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return

    const filesToProcess = Array.from(fileList)
    
    if (!multiple && filesToProcess.length > 1) {
      alert('Only one file can be uploaded')
      return
    }

    for (const file of filesToProcess) {
      const error = validateFile(file)
      if (error) {
        alert(error)
        return
      }
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const uploadedFiles: UploadedFile[] = []
      
      for (const file of filesToProcess) {
        const uploadedFile = await simulateUpload(file)
        uploadedFiles.push(uploadedFile)
      }

      if (multiple) {
        onChange([...files, ...uploadedFiles])
      } else {
        onChange(uploadedFiles)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (disabled) return

    await handleFiles(e.dataTransfer.files)
  }, [disabled, files, multiple, onChange])

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFiles(e.target.files)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = (fileId: string) => {
    onChange(files.filter(f => f.id !== fileId))
  }

  const getStatusIcon = (status: DocumentVerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
      case 'REVIEWED':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case 'NEEDS_CORRECTION':
      case 'REJECTED':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
    }
  }

  const getStatusBadge = (status: DocumentVerificationStatus) => {
    const config: Record<DocumentVerificationStatus, { variant: any; label: string }> = {
      PENDING: { variant: 'outline', label: 'Pending Review' },
      REVIEWED: { variant: 'secondary', label: 'Reviewed' },
      VERIFIED: { variant: 'default', label: 'Verified' },
      NEEDS_CORRECTION: { variant: 'destructive', label: 'Needs Correction' },
      REJECTED: { variant: 'destructive', label: 'Rejected' }
    }
    
    return <Badge variant={config[status].variant} className="text-xs">{config[status].label}</Badge>
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    if (extension === 'pdf') {
      return <FileText className="w-8 h-8 text-red-500" />
    }
    return <ImageIcon className="w-8 h-8 text-blue-500" />
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : disabled 
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
            : 'border-gray-300 hover:border-gray-400 cursor-pointer'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div className="p-8 text-center">
          {uploading ? (
            <div className="space-y-3">
              <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
              <p className="text-sm font-medium">Uploading...</p>
              <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
              <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm font-medium mb-1">
                {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground">
                {accept.replace(/\./g, '').toUpperCase()} files up to {maxSize}MB
              </p>
            </>
          )}
        </div>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        disabled={disabled}
        className="hidden"
      />

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <Card key={file.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getFileIcon(file.name)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {!disabled && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(file.id)}
                        className="flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(file.status)}
                    {getStatusBadge(file.status)}
                  </div>
                  
                  {file.comments && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
                      <p className="font-medium text-amber-900">Counsellor Comment:</p>
                      <p className="text-amber-800">{file.comments}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
          
          {multiple && !disabled && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add More Files
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
