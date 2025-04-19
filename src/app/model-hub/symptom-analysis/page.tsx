"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "agent";
  content: string;
  timestamp: number;
}

export default function SymptomAnalysisPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://nthander2002-medhive-symptomanalysis.hf.space/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          history: [
            ...messages.map(msg => ({
              [msg.role === "user" ? "user" : "agent"]: msg.content
            })),
            { user: userMessage.content }
          ]
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: Message = {
        role: "agent",
        content: data.agent,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "agent",
        content: "Sorry, I encountered an error analyzing your symptoms. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-zinc-900 to-black p-4">
      <Card className="h-full max-w-4xl mx-auto flex flex-col bg-gradient-to-br from-zinc-900/60 to-black/80 border border-cyan-500/20 shadow-lg backdrop-blur-lg rounded-3xl">
        <CardHeader>
          <CardTitle className="text-4xl font-['Poppins'] text-cyan-400 drop-shadow-md">
            Symptom Analysis
          </CardTitle>
          <CardDescription className="text-gray-400 mt-1 font-['Poppins']">
            Describe your symptoms in detail for AI-powered analysis and preliminary assessment.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent hover:scrollbar-thumb-cyan-500/30">
            {messages.length === 0 ? (
              <div className="text-gray-500 text-center mt-8">
                Start by describing your symptoms...
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={message.timestamp}
                  className={cn(
                    "flex w-full",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-4 rounded-2xl shadow-md transition-all duration-200",
                      message.role === "user"
                        ? "bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 text-cyan-50 rounded-tr-none"
                        : "bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 text-gray-200 rounded-tl-none",
                      "hover:shadow-lg hover:shadow-cyan-500/10"
                    )}
                    style={{
                      animation: "slideIn 0.3s ease-out forwards",
                    }}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 p-4 rounded-2xl rounded-tl-none shadow-md">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 p-2 mt-2 border-t border-cyan-500/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your symptoms..."
              className="flex-1 bg-zinc-900/50 border-none focus:ring-1 focus:ring-cyan-500/50 text-gray-300 rounded-xl px-4 py-2"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700",
                "text-white px-4 rounded-xl transition-all duration-200",
                "disabled:from-gray-600 disabled:to-gray-700"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}