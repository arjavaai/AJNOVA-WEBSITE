'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Building2, Calendar, CheckCircle, Clock, FileText, Loader2, Mail, XCircle, AlertCircle, Upload } from 'lucide-react'
import { Application, ApplicationStatus, DocumentStatus } from '@/lib/application-types'

function getStatusIcon(status: ApplicationStatus) {
  switch (status) {
    case 'APPLIED':
      return <FileText className="w-5 h-5" />
    case 'DOCUMENTS_SENT':
      return <Upload className="w-5 h-5" />
    case 'UNDER_REVIEW':
      return <Clock className="w-5 h-5" />
    case 'WAITING_FOR_DECISION':
      return <AlertCircle className="w-5 h-5" />
    case 'ACCEPTED':
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case 'REJECTED':
      return <XCircle className="w-5 h-5 text-red-600" />
    default:
      return <FileText className="w-5 h-5" />
  }
}

function getDocumentStatusBadge(status: DocumentStatus) {
  const config: Record<DocumentStatus, { label: string; color: string; icon: any }> = {
    REQUIRED: { label: 'Required', color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
    UPLOADED: { label: 'Uploaded', color: 'bg-blue-100 text-blue-800', icon: Upload },
    VERIFIED: { label: 'Verified', color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
    SENT: { label: 'Sent', color: 'bg-yellow-100 text-yellow-800', icon: Mail },
    ACCEPTED: { label: 'Accepted', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  }
  
  const { label, color, icon: Icon } = config[status]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  )
}

export default function ApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const applicationId = params.id as string
  
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchApplication()
  }, [applicationId])
  
  async function fetchApplication() {
    try {
      const response = await fetch(`/api/applications/${applicationId}`)
      const data = await response.json()
      setApplication(data.application)
    } catch (error) {
      console.error('Error fetching application:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }
  
  if (!application) {
    return <div>Application not found</div>
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.push('/dashboard/applications')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Applications
      </Button>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{application.university.name}</h1>
            <p className="text-xl text-muted-foreground">{application.program.name}</p>
            <p className="text-sm text-muted-foreground mt-1">Ref: {application.referenceNumber}</p>
          </div>
          <div className="text-right">
            {application.status === 'ACCEPTED' && (
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-800 px-4 py-2 text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                Accepted
              </span>
            )}
            {application.status === 'REJECTED' && (
              <span className="inline-flex items-center gap-2 rounded-full bg-red-100 text-red-800 px-4 py-2 text-sm font-semibold">
                <XCircle className="w-4 h-4" />
                Rejected
              </span>
            )}
            {!['ACCEPTED', 'REJECTED'].includes(application.status) && (
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold">
                <Clock className="w-4 h-4" />
                In Progress
              </span>
            )}
          </div>
        </div>
        
        {application.status === 'ACCEPTED' && application.offerDetails && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">🎉 Congratulations!</h3>
                  <p className="text-sm text-green-800">{application.offerDetails}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {application.status === 'REJECTED' && application.rejectionReason && (
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Application Not Successful</h3>
                  <p className="text-sm text-red-800 mb-3">{application.rejectionReason}</p>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Counsellor for Guidance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <CardDescription>Track your application progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {application.timeline.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index < application.timeline.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
                    )}
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1 pt-2">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{event.status.replace(/_/g, ' ')}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        {event.performedBy && (
                          <p className="text-xs text-muted-foreground mt-1">
                            By: {event.performedBy}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Document Checklist</CardTitle>
              <CardDescription>
                {application.documents.filter(d => ['SENT', 'ACCEPTED'].includes(d.status)).length}/{application.documents.length} documents completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        {doc.uploadedAt && (
                          <div className="text-xs text-muted-foreground">
                            Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDocumentStatusBadge(doc.status)}
                      {doc.status === 'REQUIRED' && (
                        <Button size="sm" variant="outline">
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">University</div>
                <div className="font-medium">{application.university.name}</div>
                <div className="text-sm text-muted-foreground">{application.university.city}, {application.university.country}</div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Program</div>
                <div className="font-medium">{application.program.name}</div>
                <div className="text-sm text-muted-foreground">{application.program.degree}</div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Application Date</div>
                <div className="font-medium">{new Date(application.applicationDate).toLocaleDateString()}</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Intake</div>
                <div className="font-medium">{application.intake.replace('_', ' ')}</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Application Channel</div>
                <div className="font-medium">{application.applicationChannel}</div>
              </div>
              
              {application.counsellorName && (
                <>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Counsellor</div>
                    <div className="font-medium">{application.counsellorName}</div>
                  </div>
                </>
              )}
              
              {application.notes && (
                <>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Notes</div>
                    <div className="text-sm">{application.notes}</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Contact Counsellor
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
