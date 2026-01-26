"use client";

import { CheckCheck, Send, User as UserIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateSupport } from "@/hooks/use-support";
import { cn } from "@/lib/utils";
import { TCSupport } from "@/schema/zod/supportFormSchema";
import { toast } from "sonner";
import { ChatForm } from "./chat-form";
import { queryClient } from "@/lib/query-client";


// Types
type MessageType = "text" | "form";
type Sender = "user" | "bot";

interface Message {
  id: string;
  sender: Sender;
  type: MessageType;
  content: string;
  hasForm?: boolean;
  isFormSubmitted?: boolean;
  successMessage?: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "bot",
      type: "text",
      content:
        "Hello! Welcome to Ruby Studio support. How can we help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      type: "text",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate Bot Response
    setTimeout(() => {
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        type: "text",
        content:
          "Please fill up this form and we will contact you within a few hours.",
        hasForm: true,
        isFormSubmitted: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const mutation = useCreateSupport();

  const handleFormSubmit = (body: TCSupport, messageId: string) => {
    console.log("Form Submitted:", body);

    mutation.mutate(body, {
      onSuccess: (data) => {
        toast.success(data.message || "Form submitted successfully!");
        queryClient.invalidateQueries({
          queryKey: ["support-form"],
        });

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  isFormSubmitted: true,
                  successMessage: data.message,
                }
              : msg,
          ),
        );

        setIsTyping(true);
        setTimeout(() => {
          const thanksMsg: Message = {
            id: Date.now().toString(),
            sender: "bot",
            type: "text",
            content: `Thanks ${body.name}! We have received your details and will contact you soon.`,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, thanksMsg]);
          setIsTyping(false);
        }, 1000);
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to submit form. Please try again.",
        );
      },
    });
  };

  return (
    <div className="flex flex-col h-150 w-full max-w-4xl mx-auto border rounded-2xl overflow-hidden bg-slate-50 dark:bg-zinc-950 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-primary text-primary-foreground shadow-md z-10">
        <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <UserIcon size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Support Team</h3>
          <p className="text-xs opacity-80 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 block animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://site-assets.fontawesome.com/releases/v6.5.1/svgs/solid/message-code.svg')] bg-opacity-5 relative">
        {/* Background pattern overlay - using CSS utility if background image doesn't load/exist, just plain color */}
        <div className="absolute inset-0 bg-slate-100/50 dark:bg-zinc-900/50 -z-10" />

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex w-full mb-4",
                msg.sender === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl p-4 shadow-sm relative group",
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-white dark:bg-zinc-800 border text-foreground rounded-bl-none",
                )}
              >
                {/* Message Content */}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>

                {/* Form Embedding */}
                {msg.hasForm && !msg.isFormSubmitted && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <ChatForm
                      onSubmit={(data) => handleFormSubmit(data, msg.id)}
                      disabled={mutation.isPending}
                    />
                  </div>
                )}

                {/* Submitted State Indicator */}
                {msg.isFormSubmitted && msg.hasForm && (
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800 text-xs text-green-600 dark:text-green-400 flex items-center gap-2">
                    <CheckCheck size={14} />
                    {msg.successMessage || "Form submitted successfully"}
                  </div>
                )}

                {/* Metadata */}
                <div
                  className={cn(
                    "text-[10px] mt-1 flex items-center gap-1 opacity-70",
                    msg.sender === "user"
                      ? "justify-end text-primary-foreground/80"
                      : "justify-end text-muted-foreground",
                  )}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {msg.sender === "user" && <CheckCheck size={12} />}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-white dark:bg-zinc-800 rounded-2xl rounded-bl-none w-fit shadow-sm"
          >
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full shadow-sm shrink-0 transition-transform active:scale-95"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
