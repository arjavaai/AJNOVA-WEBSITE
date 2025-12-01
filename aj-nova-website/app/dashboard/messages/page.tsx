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
import { Conversation, Message } from '@/lib/messaging-types'
import {
  mockConversations,
  getConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead,
  formatMessageTime
} from '@/lib/messaging-mock-data'
import { cn } from '@/lib/utils'

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id)
      markMessagesAsRead(selectedConversation.id, '1')
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  function loadConversations() {
    const convos = getConversations('1')
    setConversations(convos)
    if (convos.length > 0 && !selectedConversation) {
      setSelectedConversation(convos[0])
    }
  }

  function loadMessages(conversationId: string) {
    const msgs = getMessages(conversationId)
    setMessages(msgs)
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSendMessage() {
    if (!newMessage.trim() || !selectedConversation) return

    const message = sendMessage(selectedConversation.id, '1', 'Ajay Kumar', newMessage.trim())
    setMessages([...messages, message])
    setNewMessage('')
    
    // Update conversation in list
    const updatedConvos = conversations.map(c =>
      c.id === selectedConversation.id
        ? { ...c, lastMessage: message, updatedAt: new Date() }
        : c
    )
    setConversations(updatedConvos)
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
    c.counsellorName.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
                          {conversation.counsellorName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{conversation.counsellorName}</h3>
                        {conversation.lastMessage && (
                          <span className="text-xs text-muted-foreground">
                            {formatMessageTime(conversation.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      
                      {conversation.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage.senderType === 'STUDENT' && 'You: '}
                          {conversation.lastMessage.content}
                        </p>
                      )}
                      
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
                        {selectedConversation.counsellorName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.counsellorName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.isOnline ? 'Online' : 'Offline'}
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
                {messages.map((message) => {
                  const isOwn = message.senderType === 'STUDENT'
                  
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
                            {message.senderName.split(' ').map(n => n[0]).join('')}
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
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        <div className="flex items-center gap-1 px-1">
                          <span className="text-xs text-muted-foreground">
                            {formatMessageTime(message.timestamp)}
                          </span>
                          {isOwn && getMessageStatusIcon(message.status)}
                        </div>
                      </div>

                      {isOwn && (
                        <Avatar className="flex-shrink-0">
                          <AvatarFallback className="text-xs">
                            {message.senderName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  )
                })}
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
