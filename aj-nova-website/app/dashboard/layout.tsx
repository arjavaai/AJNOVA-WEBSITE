import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Home, User, Building2 } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold">
                AJ NOVA
              </Link>
              <nav className="flex gap-1">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard/applications">
                  <Button variant="ghost" size="sm">
                    <Building2 className="w-4 h-4 mr-2" />
                    Applications
                  </Button>
                </Link>
                <Link href="/dashboard/documents">
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Documents
                  </Button>
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
