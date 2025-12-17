'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function TestAuthPage() {
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const supabase = createClient()

    // Get session
    const { data: { session }, error } = await supabase.auth.getSession()
    console.log('Session:', session)
    console.log('Session error:', error)

    setSession(session)
    setUser(session?.user || null)
    setToken(session?.access_token || null)
    setLoading(false)
  }

  async function testAPICall() {
    if (!token) {
      alert('No token found! Please log in first.')
      return
    }

    console.log('Testing API call with token:', token.substring(0, 50) + '...')

    try {
      const response = await fetch('http://localhost:8000/api/v1/profiles/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('API Response status:', response.status)
      const data = await response.json()
      console.log('API Response data:', data)

      alert(`API Response: ${response.status}\n${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      console.error('API Error:', error)
      alert('API Error: ' + error)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Authentication Test Page</h1>

      <div className="space-y-4">
        {/* Session Status */}
        <Card>
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
          </CardHeader>
          <CardContent>
            {session ? (
              <div className="space-y-2">
                <div className="text-green-600 font-semibold">✅ LOGGED IN</div>
                <div><strong>Email:</strong> {user?.email}</div>
                <div><strong>User ID:</strong> {user?.id}</div>
                <div><strong>Provider:</strong> {user?.app_metadata?.provider}</div>
                <div className="mt-4">
                  <strong>Access Token (first 100 chars):</strong>
                  <pre className="bg-gray-100 p-2 mt-2 text-xs overflow-auto">
                    {token?.substring(0, 100)}...
                  </pre>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-red-600 font-semibold">❌ NOT LOGGED IN</div>
                <Link href="/login">
                  <Button className="mt-4">Go to Login Page</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Full Session Data */}
        {session && (
          <Card>
            <CardHeader>
              <CardTitle>Full Session Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 text-xs overflow-auto max-h-96">
                {JSON.stringify(session, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* User Data */}
        {user && (
          <Card>
            <CardHeader>
              <CardTitle>User Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 text-xs overflow-auto max-h-96">
                {JSON.stringify(user, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Test API Call */}
        {session && (
          <Card>
            <CardHeader>
              <CardTitle>Test Backend API</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Test if the backend accepts your session token:</p>
              <Button onClick={testAPICall}>
                Test API Call to /api/v1/profiles/me
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
          <Link href="/dashboard/profile">
            <Button variant="outline">Go to Profile Page</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
