'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Send,
  Mail,
  Users,
  Filter,
  Loader2,
  MessageSquare,
  Inbox,
  SendHorizontal as SentIcon,
  Archive,
  Trash2,
  Eye,
  Reply,
  Forward,
  MoreVertical
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  conversation_id: string
  message: string
  read: boolean
  read_at?: string
  created_at: string
  attachments?: any
}

interface Student {
  id: string
  name: string
  email: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('inbox')
  const [newMessage, setNewMessage] = useState({
    recipients: [] as string[],
    subject: '',
    content: '',
    sendToAll: false
  })

  useEffect(() => {
    fetchMessages()
    fetchStudents()
    
    // Check for student query parameter
    const urlParams = new URLSearchParams(window.location.search)
    const studentId = urlParams.get('student')
    if (studentId) {
      setNewMessage(prev => ({
        ...prev,
        recipients: [studentId]
      }))
      setIsComposeOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchMessages() {
    try {
      const { messages: messagesAPI } = await import('@/lib/api-client')
      const data = await messagesAPI.list()
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchStudents() {
    try {
      const { admin } = await import('@/lib/api-client')
      const data = await admin.getStudents()
      setStudents(data.students || [])
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  async function handleSendMessage() {
    try {
      const { messages: messagesAPI } = await import('@/lib/api-client')

      if (newMessage.sendToAll) {
        // Send to all students
        for (const student of students) {
          await messagesAPI.send({
            receiver_id: student.id,
            message: `Subject: ${newMessage.subject}\n\n${newMessage.content}`
          })
        }
      } else {
        // Send to selected recipients
        for (const recipientId of newMessage.recipients) {
          await messagesAPI.send({
            receiver_id: recipientId,
            message: `Subject: ${newMessage.subject}\n\n${newMessage.content}`
          })
        }
      }

      setIsComposeOpen(false)
      setNewMessage({ recipients: [], subject: '', content: '', sendToAll: false })
      await fetchMessages()
      
      // Show success message
      alert('Message sent successfully!')
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    }
  }

  async function handleMarkAsRead(id: string) {
    try {
      const { messages: messagesAPI } = await import('@/lib/api-client')
      await messagesAPI.markRead(id)
      await fetchMessages()
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const inboxMessages = messages.filter(m => m.receiver_id === m.id) // Will need to fix this logic
  const sentMessages = messages.filter(m => m.sender_id === m.id) // Will need to fix this logic
  const unreadCount = messages.filter(m => !m.read).length

  const filteredMessages = messages.filter(msg =>
    msg.message?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground">
              Communicate with students and counsellors
            </p>
          </div>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Compose Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Compose New Message</DialogTitle>
                <DialogDescription>
                  Send a message to students or counsellors
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sendToAll"
                      checked={newMessage.sendToAll}
                      onCheckedChange={(checked) =>
                        setNewMessage({ ...newMessage, sendToAll: checked as boolean })
                      }
                    />
                    <Label htmlFor="sendToAll">Send to all students</Label>
                  </div>
                </div>

                {!newMessage.sendToAll && (
                  <div className="space-y-2">
                    <Label htmlFor="recipients">Recipients</Label>
                    <Select
                      onValueChange={(value) => {
                        if (!newMessage.recipients.includes(value)) {
                          setNewMessage({
                            ...newMessage,
                            recipients: [...newMessage.recipients, value]
                          })
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.length > 0 ? (
                          students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} ({student.email})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-students" disabled>
                            No students available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {newMessage.recipients.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newMessage.recipients.map((recipientId) => {
                          const student = students.find(s => s.id === recipientId)
                          return (
                            <Badge key={recipientId} variant="secondary">
                              {student?.name || recipientId}
                              <button
                                onClick={() =>
                                  setNewMessage({
                                    ...newMessage,
                                    recipients: newMessage.recipients.filter((r) => r !== recipientId)
                                  })
                                }
                                className="ml-2"
                              >
                                ×
                              </button>
                            </Badge>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={newMessage.subject}
                    onChange={(e) =>
                      setNewMessage({ ...newMessage, subject: e.target.value })
                    }
                    placeholder="Message subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Message</Label>
                  <Textarea
                    id="content"
                    value={newMessage.content}
                    onChange={(e) =>
                      setNewMessage({ ...newMessage, content: e.target.value })
                    }
                    placeholder="Write your message here..."
                    rows={8}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{messages.length}</div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
              <Mail className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-900">{unreadCount}</div>
                <p className="text-sm text-blue-700">Unread</p>
              </div>
              <Inbox className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-900">{inboxMessages.length}</div>
                <p className="text-sm text-green-700">Inbox</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-900">{sentMessages.length}</div>
                <p className="text-sm text-purple-700">Sent</p>
              </div>
              <SentIcon className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Messages</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="inbox" className="flex items-center gap-2">
                <Inbox className="w-4 h-4" />
                Inbox
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="sent" className="flex items-center gap-2">
                <SentIcon className="w-4 h-4" />
                Sent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inbox">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No messages found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMessages.map((message) => (
                        <TableRow
                          key={message.id}
                          className={message.read ? '' : 'bg-blue-50'}
                        >
                          <TableCell>
                            {!message.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {students.find(s => s.id === message.sender_id)?.name || 'Unknown'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-md">
                              <div className="text-sm text-muted-foreground">
                                {message.message}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {new Date(message.created_at).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Reply className="w-4 h-4" />
                              </Button>
                              {!message.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(message.id)}
                                >
                                  <Mail className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="sent">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>To</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No sent messages
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMessages.map((message) => (
                        <TableRow key={message.id}>
                          <TableCell>
                            <div className="font-medium">
                              {students.find(s => s.id === message.receiver_id)?.name || 'Unknown'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-md">
                              <div className="text-sm text-muted-foreground truncate">
                                {message.message}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {new Date(message.created_at).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Forward className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
