import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MessageCircle, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactSupportPage() {
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
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Contact Support</h1>
          <p className="text-muted-foreground">
            We're here to help! Reach out to us through any of the following channels.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Email Us</CardTitle>
              <CardDescription>We'll respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="mailto:support@ajnova.com" className="text-primary hover:underline font-medium">
                support@ajnova.com
              </a>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Call Us</CardTitle>
              <CardDescription>Mon-Fri, 9 AM - 6 PM CET</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="tel:+49XXXXXXXXX" className="text-primary hover:underline font-medium">
                +49 XXX XXXX XXXX
              </a>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Chat with Counsellor</CardTitle>
              <CardDescription>Get instant help</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/messages">
                <Button variant="outline" className="w-full">
                  Start Chat
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Office Hours */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <CardTitle>Office Hours</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Working Days</p>
                <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM CET</p>
                <p className="text-sm text-muted-foreground">Saturday: 10:00 AM - 2:00 PM CET</p>
                <p className="text-sm text-muted-foreground">Sunday: Closed</p>
              </div>
              <div>
                <p className="font-medium mb-2">Response Time</p>
                <p className="text-sm text-muted-foreground">Email: Within 24 hours</p>
                <p className="text-sm text-muted-foreground">Phone: Immediate during office hours</p>
                <p className="text-sm text-muted-foreground">Chat: Within 2 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Office Location */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <CardTitle>Office Location</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">AJ NOVA GmbH</p>
              <p className="text-sm text-muted-foreground">
                Musterstrasse 123
                <br />
                10115 Berlin
                <br />
                Germany
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard/consultations">
              <Button>Book a Consultation</Button>
            </Link>
            <Link href="/dashboard/messages">
              <Button variant="outline">Send a Message</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
