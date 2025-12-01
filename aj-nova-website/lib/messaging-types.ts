export type MessageStatus = 
  | 'SENDING'
  | 'SENT'
  | 'DELIVERED'
  | 'READ'
  | 'FAILED'

export type MessageType = 
  | 'TEXT'
  | 'FILE'
  | 'SYSTEM'

export interface MessageAttachment {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: Date
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderType: 'STUDENT' | 'COUNSELLOR' | 'SYSTEM'
  content: string
  type: MessageType
  attachment?: MessageAttachment
  status: MessageStatus
  timestamp: Date
  readAt?: Date
}

export interface Conversation {
  id: string
  studentId: string
  counsellorId: string
  counsellorName: string
  counsellorAvatar?: string
  lastMessage?: Message
  unreadCount: number
  isOnline: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MessagingStats {
  totalConversations: number
  unreadMessages: number
  averageResponseTime: number // in minutes
  lastMessageTime?: Date
}

export interface SendMessageRequest {
  conversationId: string
  content: string
  attachment?: File
}
