import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Terms of Use</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <Card>
          <CardContent className="prose prose-sm max-w-none pt-6">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using the AJ NOVA student portal, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>

            <h2>Services Provided</h2>
            <p>AJ NOVA provides the following services:</p>
            <ul>
              <li>University application consultation</li>
              <li>Preliminary profile assessment for German universities</li>
              <li>APS verification assistance</li>
              <li>AI-powered document generation (SOP, LOR, Resume, Cover Letter)</li>
              <li>Application tracking and management</li>
            </ul>

            <h2>User Responsibilities</h2>
            <p>As a user of our platform, you agree to:</p>
            <ul>
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Not misuse or abuse the platform</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Review and approve all AI-generated documents before submission</li>
            </ul>

            <h2>AI-Generated Documents</h2>
            <p>
              Our platform uses AI to generate admission documents. While we strive for accuracy, you are responsible for:
            </p>
            <ul>
              <li>Reviewing all generated content for accuracy</li>
              <li>Making necessary edits and personalization</li>
              <li>Ensuring all information is truthful and complete</li>
              <li>Final approval before submission to universities</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              AJ NOVA provides consultation and assistance services. We do not guarantee:
            </p>
            <ul>
              <li>Acceptance to any university</li>
              <li>APS verification approval</li>
              <li>Visa approval</li>
              <li>Specific outcomes from applications</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on the AJ NOVA platform, including software, text, images, and logos, is the property of AJ NOVA and protected by intellectual property laws.
            </p>

            <h2>Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at any time for violation of these terms or for any other reason we deem necessary.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Use, please contact:
              <br />
              <strong>Email:</strong> legal@ajnova.com
              <br />
              <strong>Phone:</strong> +49 XXX XXXX XXXX
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
