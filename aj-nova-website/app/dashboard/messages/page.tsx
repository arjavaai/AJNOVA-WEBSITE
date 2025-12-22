'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import {
  Send,
  Paperclip,
  Search,
  MoreVertical,
  CheckCheck,
  Check,
  Clock,
  AlertCircle,
  MessageSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  conversation_id: string
  message: string
  read: boolean
  created_at: string
  sender_name?: string
}

interface Conversation {
  id: string
  participant_name: string
  participant_role: string
  lastMessage: string
  unreadCount: number
  updatedAt: string
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function loadMessages() {
    try {
      setLoading(true)
      const { messages: messagesAPI } = await import('@/lib/api-client')
      const { auth } = await import('@/lib/api-client')
      
      // Get current user
      const userData = await auth.getCurrentUser()
      setCurrentUserId(userData.id)
      
      // Get all messages
      const data = await messagesAPI.list()
      const allMessages = data.messages || []
      
      // Group messages by conversation_id and create conversation list
      const conversationMap = new Map<string, Conversation>()
      
      allMessages.forEach((msg: Message) => {
        if (!conversationMap.has(msg.conversation_id)) {
          // Determine participant (the other person in the conversation)
          const isReceiver = msg.receiver_id === userData.id
          const participantId = isReceiver ? msg.sender_id : msg.receiver_id
          
          conversationMap.set(msg.conversation_id, {
            id: msg.conversation_id,
            participant_name: isReceiver ? 'Admin/Counsellor' : 'Student',
            participant_role: isReceiver ? 'admin' : 'student',
            lastMessage: msg.message,
            unreadCount: 0,
            updatedAt: msg.created_at
          })
        }
        
        // Update unread count
        if (!msg.read && msg.receiver_id === userData.id) {
          const conv = conversationMap.get(msg.conversation_id)!
          conv.unreadCount += 1
        }
      })
      
      const convos = Array.from(conversationMap.values())
      setConversations(convos)
      setMessages(allMessages)
      
      // Select first conversation if available
      if (convos.length > 0 && !selectedConversation) {
        setSelectedConversation(convos[0])
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSendMessage() {
    if (!newMessage.trim() || !selectedConversation) return

    try {
      const { messages: messagesAPI } = await import('@/lib/api-client')
      
      // Get admin/counsellor ID from the conversation
      const conversationMessages = messages.filter(m => m.conversation_id === selectedConversation.id)
      const firstMessage = conversationMessages[0]
      const receiverId = firstMessage.sender_id === currentUserId ? firstMessage.receiver_id : firstMessage.sender_id
      
      await messagesAPI.send({
        receiver_id: receiverId,
        message: newMessage.trim(),
        conversation_id: selectedConversation.id
      })
      
      setNewMessage('')
      // Reload messages to show the new one
      await loadMessages()
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    }
  }

  function getMessageStatusIcon(status: string) {
    switch (status) {
      case 'SENDING':
        return <Clock className="w-3 h-3 text-gray-400" />
      case 'SENT':
        return <Check className="w-3 h-3 text-gray-400" />
      case 'DELIVERED':
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case 'READ':
        return <CheckCheck className="w-3 h-3 text-blue-500" />
      case 'FAILED':
        return <AlertCircle className="w-3 h-3 text-red-500" />
      default:
        return null
    }
  }

  const filteredConversations = conversations.filter(c =>
    c.participant_name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Get messages for selected conversation
  const conversationMessages = selectedConversation 
    ? messages.filter(m => m.conversation_id === selectedConversation.id)
    : []
  
  function formatMessageTime(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Chat with your counsellors
          </p>
        </div>
        <Card className="h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Chat with your counsellors
        </p>
      </div>

      <Card className="h-[calc(100vh-200px)] flex flex-col md:flex-row overflow-hidden">
        {/* Conversations List */}
        <div className={cn(
          "md:w-80 border-r flex flex-col",
          selectedConversation ? "hidden md:flex" : "flex"
        )}>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-20" />
                <p className="text-sm text-muted-foreground">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={cn(
                    "w-full p-4 border-b hover:bg-accent transition-colors text-left",
                    selectedConversation?.id === conversation.id && "bg-accent"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>
                          {conversation.participant_name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{conversation.participant_name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatMessageTime(conversation.updatedAt)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      
                      {conversation.unreadCount > 0 && (
                        <Badge className="mt-1">{conversation.unreadCount} new</Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Thread */}
        <div className={cn(
          "flex-1 flex flex-col",
          !selectedConversation ? "hidden md:flex" : "flex"
        )}>
          {selectedConversation ? (
            <>
              {/* Thread Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="md:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      ←
                    </Button>
                    <Avatar>
                      <AvatarFallback>
                        {selectedConversation.participant_name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.participant_name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.participant_role}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-20" />
                    <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  conversationMessages.map((message) => {
                    const isOwn = message.sender_id === currentUserId
                    
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          isOwn ? "justify-end" : "justify-start"
                        )}
                      >
                        {!isOwn && (
                          <Avatar className="flex-shrink-0">
                            <AvatarFallback className="text-xs">
                              AC
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={cn(
                          "max-w-[70%] space-y-1",
                          isOwn && "items-end"
                        )}>
                          <div className={cn(
                            "rounded-lg p-3",
                            isOwn 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                          )}>
                            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          </div>
                          
                          <div className="flex items-center gap-1 px-1">
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(message.created_at)}
                            </span>
                            {isOwn && message.read && <CheckCheck className="w-3 h-3 text-blue-500" />}
                          </div>
                        </div>

                        {isOwn && (
                          <Avatar className="flex-shrink-0">
                            <AvatarFallback className="text-xs">
                              You
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="min-h-[44px] max-h-32 resize-none"
                    rows={1}
                  />
                  
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
