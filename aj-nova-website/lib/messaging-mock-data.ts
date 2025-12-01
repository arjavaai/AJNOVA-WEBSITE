import { Conversation, Message, MessagingStats } from './messaging-types'

export const mockConversations: Conversation[] = [
  {
    id: '1',
    studentId: '1',
    counsellorId: '1',
    counsellorName: 'Dr. Sarah Mitchell',
    isOnline: true,
    unreadCount: 2,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    studentId: '1',
    counsellorId: '2',
    counsellorName: 'John Anderson',
    isOnline: false,
    unreadCount: 0,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
]

export const mockMessages: Message[] = [
  // Conversation 1 messages
  {
    id: '1',
    conversationId: '1',
    senderId: '1',
    senderName: 'Ajay Kumar',
    senderType: 'STUDENT',
    content: 'Hello Dr. Mitchell, I have a question about my APS documents.',
    type: 'TEXT',
    status: 'READ',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    readAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000)
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '1',
    senderName: 'Dr. Sarah Mitchell',
    senderType: 'COUNSELLOR',
    content: 'Hi Ajay! I\'d be happy to help. What specific question do you have about your APS documents?',
    type: 'TEXT',
    status: 'READ',
    timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
    readAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '3',
    conversationId: '1',
    senderId: '1',
    senderName: 'Ajay Kumar',
    senderType: 'STUDENT',
    content: 'I\'m not sure if my transcripts are formatted correctly. Should I upload them again?',
    type: 'TEXT',
    status: 'READ',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    readAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
  },
  {
    id: '4',
    conversationId: '1',
    senderId: '1',
    senderName: 'Dr. Sarah Mitchell',
    senderType: 'COUNSELLOR',
    content: 'I reviewed your transcripts and they look good! The format is acceptable. However, make sure all pages are clearly readable.',
    type: 'TEXT',
    status: 'DELIVERED',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '5',
    conversationId: '1',
    senderId: '1',
    senderName: 'Dr. Sarah Mitchell',
    senderType: 'COUNSELLOR',
    content: 'Also, don\'t forget to complete your SOP. I can review it once you\'re done.',
    type: 'TEXT',
    status: 'DELIVERED',
    timestamp: new Date(Date.now() - 29 * 60 * 1000)
  },
  // Conversation 2 messages
  {
    id: '6',
    conversationId: '2',
    senderId: '1',
    senderName: 'Ajay Kumar',
    senderType: 'STUDENT',
    content: 'Hi John, thank you for reviewing my Resume. The feedback was very helpful!',
    type: 'TEXT',
    status: 'READ',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    readAt: new Date(Date.now() - 23 * 60 * 60 * 1000)
  },
  {
    id: '7',
    conversationId: '2',
    senderId: '2',
    senderName: 'John Anderson',
    senderType: 'COUNSELLOR',
    content: 'You\'re welcome! Your updated resume looks much stronger now. Good luck with your applications!',
    type: 'TEXT',
    status: 'READ',
    timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
    readAt: new Date(Date.now() - 22 * 60 * 60 * 1000)
  }
]

// Update conversations with last messages
mockConversations[0].lastMessage = mockMessages[4]
mockConversations[1].lastMessage = mockMessages[7]

let conversationsStore = [...mockConversations]
let messagesStore = [...mockMessages]

export function getConversations(studentId: string): Conversation[] {
  return conversationsStore.filter(c => c.studentId === studentId)
}

export function getConversationById(id: string): Conversation | null {
  return conversationsStore.find(c => c.id === id) || null
}

export function getMessages(conversationId: string): Message[] {
  return messagesStore
    .filter(m => m.conversationId === conversationId)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

export function sendMessage(
  conversationId: string,
  senderId: string,
  senderName: string,
  content: string
): Message {
  const newMessage: Message = {
    id: Math.random().toString(36).substr(2, 9),
    conversationId,
    senderId,
    senderName,
    senderType: 'STUDENT',
    content,
    type: 'TEXT',
    status: 'SENT',
    timestamp: new Date()
  }

  messagesStore.push(newMessage)

  // Update conversation
  const conversation = conversationsStore.find(c => c.id === conversationId)
  if (conversation) {
    conversation.lastMessage = newMessage
    conversation.updatedAt = new Date()
  }

  return newMessage
}

export function markMessagesAsRead(conversationId: string, userId: string): void {
  const messages = messagesStore.filter(
    m => m.conversationId === conversationId && 
    m.senderId !== userId && 
    m.status !== 'READ'
  )

  messages.forEach(message => {
    message.status = 'READ'
    message.readAt = new Date()
  })

  // Update unread count
  const conversation = conversationsStore.find(c => c.id === conversationId)
  if (conversation) {
    conversation.unreadCount = 0
  }
}

export function getUnreadCount(studentId: string): number {
  return conversationsStore
    .filter(c => c.studentId === studentId)
    .reduce((sum, c) => sum + c.unreadCount, 0)
}

export function getMessagingStats(studentId: string): MessagingStats {
  const conversations = getConversations(studentId)
  const unreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0)
  
  let lastMessageTime: Date | undefined
  conversations.forEach(c => {
    if (c.lastMessage && (!lastMessageTime || c.lastMessage.timestamp > lastMessageTime)) {
      lastMessageTime = c.lastMessage.timestamp
    }
  })

  return {
    totalConversations: conversations.length,
    unreadMessages,
    averageResponseTime: 45, // Mock: 45 minutes
    lastMessageTime
  }
}

export function formatMessageTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
