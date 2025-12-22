'use client'

import { useState } from 'react'
import axios from 'axios'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TestAxiosPage() {
  const [results, setResults] = useState<any[]>([])

  const addResult = (test: string, success: boolean, data: any) => {
    setResults(prev => [...prev, { test, success, data, time: new Date().toLocaleTimeString() }])
  }

  const testFetch = async () => {
    try {
      const response = await fetch('http://localhost:8000/')
      const data = await response.json()
      addResult('Fetch (native)', true, data)
      alert('✅ Fetch works: ' + JSON.stringify(data))
    } catch (error: any) {
      addResult('Fetch (native)', false, error.message)
      alert('❌ Fetch failed: ' + error.message)
    }
  }

  const testAxiosSimple = async () => {
    try {
      const response = await axios.get('http://localhost:8000/')
      addResult('Axios GET (simple)', true, response.data)
      alert('✅ Axios GET works: ' + JSON.stringify(response.data))
    } catch (error: any) {
      addResult('Axios GET (simple)', false, error.message)
      alert('❌ Axios GET failed: ' + error.message)
    }
  }

  const testAxiosWithAuth = async () => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        alert('⚠️ Not logged in!')
        return
      }

      const response = await axios.get('http://localhost:8000/api/v1/profiles/me', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      addResult('Axios GET with Auth', true, response.data)
      alert('✅ Axios with Auth works!')
    } catch (error: any) {
      addResult('Axios GET with Auth', false, error.message)
      alert('❌ Axios with Auth failed: ' + error.message)
    }
  }

  const testAxiosPUT = async () => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        alert('⚠️ Not logged in!')
        return
      }

      const response = await axios.put('http://localhost:8000/api/v1/profiles/me', {
        first_name: 'Test'
      }, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      })
      addResult('Axios PUT with Auth', true, response.data)
      alert('✅ Axios PUT works!')
    } catch (error: any) {
      addResult('Axios PUT with Auth', false, error.message)
      alert('❌ Axios PUT failed: ' + error.message)
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Axios vs Fetch Test</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Run Tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={testFetch} className="w-full">
            1. Test Native Fetch (to /)
          </Button>
          <Button onClick={testAxiosSimple} className="w-full" variant="secondary">
            2. Test Axios GET (to /)
          </Button>
          <Button onClick={testAxiosWithAuth} className="w-full" variant="secondary">
            3. Test Axios GET with Auth (to /api/v1/profiles/me)
          </Button>
          <Button onClick={testAxiosPUT} className="w-full" variant="destructive">
            4. Test Axios PUT with Auth (to /api/v1/profiles/me)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <p className="text-gray-500">No tests run yet. Click buttons above.</p>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className={`p-4 rounded ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">{result.success ? '✅' : '❌'} {result.test}</span>
                    <span className="text-sm text-gray-500">{result.time}</span>
                  </div>
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Diagnosis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>If Fetch works but Axios fails:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>✅ Backend is working correctly</li>
              <li>✅ CORS is configured properly</li>
              <li>❌ Browser (Brave) is blocking Axios specifically</li>
              <li>🔧 Fix: Turn off Brave Shields or use different browser</li>
            </ul>
            
            <p className="mt-4"><strong>If both Fetch and Axios fail:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>❌ Backend is not reachable</li>
              <li>❌ Windows Firewall might be blocking</li>
              <li>🔧 Fix: Check backend is running, check firewall</li>
            </ul>

            <p className="mt-4"><strong>If GET works but PUT fails:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>❌ CORS not allowing PUT method</li>
              <li>❌ Backend not handling PUT requests</li>
              <li>🔧 Fix: Check backend CORS configuration</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}







