'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bot, Send, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

export default function AiMentor() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I am your AI Mentor. How can I help you improve your prompts today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages: Message[] = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    
    // Mock bot response
    setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'That\'s a great question! To improve that, you could try being more specific about the target audience. For example...'}])
    }, 1000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          <Sparkles className="h-6 w-6 animate-pulse" />
          <span className="sr-only">Open AI Mentor</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline flex items-center gap-2">
            <Bot /> AI Mentor
          </SheetTitle>
          <SheetDescription>
            Get help, tutorials, and prompt improvement tips.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                        {message.sender === 'bot' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot size={20}/></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={`max-w-[75%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <p className="text-sm">{message.text}</p>
                        </div>
                    </div>
                ))}
                </div>
            </ScrollArea>
        </div>
        <div className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for a tip..."
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
