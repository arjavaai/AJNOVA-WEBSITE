'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  FileText,
  Upload,
  Search,
  Filter,
  Loader2,
  FolderOpen,
  CheckCircle2,
  Clock,
  HardDrive
} from 'lucide-react'
import { DocumentCard, DocumentGrid } from '@/components/document-card'
import { FileUpload } from '@/components/file-upload'
import { UploadedDocument, DocumentCategory, DOCUMENT_CATEGORIES } from '@/lib/document-center-types'
import {
  mockUploadedDocuments,
  getDocumentStats,
  filterDocuments,
  formatFileSize,
  getStoragePercentage,
  sortDocuments
} from '@/lib/document-center-mock-data'

export default function DocumentCenterPage() {
  const [documents, setDocuments] = useState<UploadedDocument[]>(mockUploadedDocuments)
  const [filteredDocs, setFilteredDocs] = useState<UploadedDocument[]>(mockUploadedDocuments)
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const stats = getDocumentStats(documents)
  const storagePercentage = getStoragePercentage(stats.totalStorageUsed, stats.storageLimit)

  useEffect(() => {
    applyFilters()
  }, [selectedCategory, searchQuery, sortBy, sortOrder, documents])

  function applyFilters() {
    let filtered = documents

    if (selectedCategory !== 'ALL') {
      filtered = filterDocuments(filtered, selectedCategory as DocumentCategory)
    }

    if (searchQuery) {
      filtered = filterDocuments(filtered, undefined, searchQuery)
    }

    filtered = sortDocuments(filtered, sortBy, sortOrder)

    setFilteredDocs(filtered)
  }

  function handleView(document: UploadedDocument) {
    window.open(document.url, '_blank')
  }

  function handleDownload(document: UploadedDocument) {
    const link = window.document.createElement('a')
    link.href = document.url
    link.download = document.name
    link.click()
  }

  function handleDelete(document: UploadedDocument) {
    if (confirm(`Are you sure you want to delete "${document.name}"?`)) {
      setDocuments(docs => docs.filter(d => d.id !== document.id))
    }
  }

  function getCategoryCount(category: DocumentCategory | 'ALL'): number {
    if (category === 'ALL') return documents.length
    return documents.filter(d => d.category === category).length
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Document Center</h1>
            <p className="text-muted-foreground">
              Manage all your documents in one place
            </p>
          </div>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold">{stats.totalDocuments}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-2xl font-bold text-green-600">{stats.verifiedDocuments}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.pendingDocuments}</p>
                </div>
                <Clock className="w-8 h-8 text-amber-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                  <HardDrive className="w-6 h-6 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{storagePercentage}%</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(stats.totalStorageUsed)} / {formatFileSize(stats.storageLimit)}
                    </p>
                  </div>
                  <Progress value={storagePercentage} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="size">Size</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value: any) => setSortOrder(value)}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
        <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full mb-6">
          <TabsTrigger value="ALL" className="relative">
            All
            <Badge className="ml-2 h-5 px-1.5 text-xs">{getCategoryCount('ALL')}</Badge>
          </TabsTrigger>
          {Object.entries(DOCUMENT_CATEGORIES).map(([key, category]) => (
            <TabsTrigger key={key} value={key} className="relative">
              <span className="hidden md:inline">{category.label}</span>
              <span className="md:hidden">{key.split('_')[0]}</span>
              <Badge className="ml-2 h-5 px-1.5 text-xs">{getCategoryCount(key as DocumentCategory)}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            <TabsContent value="ALL">
              <DocumentGrid
                documents={filteredDocs}
                onView={handleView}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            </TabsContent>
            
            {Object.keys(DOCUMENT_CATEGORIES).map((key) => (
              <TabsContent key={key} value={key}>
                <DocumentGrid
                  documents={filteredDocs}
                  onView={handleView}
                  onDownload={handleDownload}
                  onDelete={handleDelete}
                />
              </TabsContent>
            ))}
          </>
        )}
      </Tabs>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload your documents to the Document Center. Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select defaultValue="PERSONAL">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DOCUMENT_CATEGORIES).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <FileUpload
              label="Select Files"
              description="Drag and drop files here or click to browse"
              multiple={true}
              files={[]}
              onChange={(files) => {
                // Handle file upload
                console.log('Files to upload:', files)
              }}
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setUploadDialogOpen(false)}>
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
