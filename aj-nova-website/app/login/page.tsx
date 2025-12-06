'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Chrome, Loader2 } from 'lucide-react'
import { signInWithGoogle } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signInWithGoogle()
      // The OAuth flow will redirect, so we don't need to do anything here
    } catch (error) {
      console.error('Error signing in with Google:', error)
      setIsLoading(false)
      alert('Failed to sign in with Google. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-peach/10 to-background p-4">
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardContent className="pt-12 pb-8 px-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/websitelogo.png" 
              alt="AJ NOVA Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-3">
              Welcome to AJ NOVA
            </h1>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Sign in to access your student dashboard and begin your journey to Germany
            </p>
          </div>

          {/* Google Sign In Button */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-12 text-base bg-foreground hover:bg-foreground/90 text-white shadow-lg"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Chrome className="mr-2 h-5 w-5" />
                Sign up with Google
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground font-medium tracking-wider">
                Secure Authentication
              </span>
            </div>
          </div>

          {/* Terms */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-center text-muted-foreground">
              New to AJ NOVA?{' '}
              <Link href="/" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Learn more about our services
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
