"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // TODO: Integrate with actual chatbot service
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-coral hover:bg-coral/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-coral text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">AJ NOVA Assistant</h3>
                <p className="text-xs text-white/80">We're here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto bg-background">
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none max-w-[80%]">
                  <p className="text-sm text-foreground">
                    Hello! 👋 How can I help you with your German university journey today?
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button className="px-4 py-2 bg-coral/10 hover:bg-coral/20 text-coral text-sm rounded-full border border-coral/20 transition-colors">
                  Check Eligibility
                </button>
                <button className="px-4 py-2 bg-coral/10 hover:bg-coral/20 text-coral text-sm rounded-full border border-coral/20 transition-colors">
                  Book Consultation
                </button>
                <button className="px-4 py-2 bg-coral/10 hover:bg-coral/20 text-coral text-sm rounded-full border border-coral/20 transition-colors">
                  Learn About Services
                </button>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-card">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all text-sm"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="w-10 h-10 bg-coral hover:bg-coral/90 disabled:bg-muted disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              For urgent queries, please contact us directly
            </p>
          </div>
        </div>
      )}
    </>
  );
}
