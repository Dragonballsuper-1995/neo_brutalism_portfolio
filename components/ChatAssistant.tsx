import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, Sparkles, ExternalLink } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateChatResponse } from '../services/geminiService';

interface ChatAssistantProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Sujal's AI Assistant. Ask me anything about his work, skills, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input when chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [messages, isOpen]);
  
  const handleClose = useCallback(() => {
    setIsOpen(false);
    toggleButtonRef.current?.focus();
  }, [setIsOpen]);

  // Close chat window on 'Escape' key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const { text, sources } = await generateChatResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', text, sources }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "My brain circuits are fried. Try again later.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message on Enter, new line on Shift+Enter
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea height
  useEffect(() => {
    if (inputRef.current) {
      const textarea = inputRef.current;
      textarea.style.height = 'auto'; // Reset height
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120; // Max height for ~5 lines
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [input, isOpen]);

  // Helper to render text with bold formatting and clickable links
  const renderMessageContent = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split('\n').map((line, lineIdx) => (
      <p key={lineIdx} className="min-h-[1.2em] mb-1 last:mb-0">
        {line.split(/(\*\*.*?\*\*)/g).map((part, partIdx) => {
          // Handle Bold
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={partIdx} className="text-neo-purple dark:text-neo-yellow">{part.slice(2, -2)}</strong>;
          }
          
          // Handle URLs within normal text
          return part.split(urlRegex).map((subPart, subIdx) => {
             if (subPart.match(urlRegex)) {
               return (
                 <a 
                   key={subIdx}
                   href={subPart}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 break-all"
                 >
                   {subPart}
                 </a>
               );
             }
             return <span key={subIdx}>{subPart}</span>;
          });
        })}
      </p>
    ));
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[51] flex flex-col items-end font-mono">
      {/* Chat Window */}
      {isOpen && (
        <div
          id="chat-window"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-header"
          className="mb-6 w-[calc(100vw-2rem)] sm:w-[90vw] md:w-[400px] h-[70vh] sm:h-[550px] bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border shadow-neo-xl dark:shadow-neo-lg-dark flex flex-col animate-[slideIn_0.3s_ease-out] origin-bottom-right relative overflow-hidden"
        >
           {/* Decorative background */}
           <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

          {/* Header */}
          <div className="bg-neo-black dark:bg-neo-dark-bg text-white p-4 flex justify-between items-center border-b-4 border-black dark:border-neo-dark-border z-10">
            <div className="flex items-center gap-3">
              <div className="bg-neo-green p-1 border-2 border-white text-black rounded-sm shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <Bot size={20} />
              </div>
              <div>
                <h3 id="chat-header" className="font-bold uppercase tracking-wider text-neo-yellow">AI Assistant</h3>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>
            <button 
              onClick={handleClose}
              aria-label="Close chat"
              className="hover:bg-neo-pink hover:text-black p-1 transition-colors border-2 border-transparent hover:border-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-neo-dark-surface z-10">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-[fadeIn_0.3s_ease-out]`}
              >
                <div 
                  className={`
                    max-w-[85%] p-4 border-2 border-black dark:border-neo-dark-border shadow-neo-sm text-sm font-medium leading-relaxed whitespace-pre-wrap
                    ${msg.role === 'user' 
                      ? 'bg-neo-blue text-black rounded-tl-xl rounded-tr-xl rounded-bl-xl' 
                      : 'bg-gray-100 dark:bg-neo-dark-bg text-black dark:text-neo-dark-text rounded-tr-xl rounded-br-xl rounded-bl-xl'}
                  `}
                >
                  {renderMessageContent(msg.text)}
                </div>
                
                {/* Display Sources if available */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 max-w-[85%] text-xs bg-white/50 dark:bg-black/30 border border-black/20 dark:border-white/20 p-2 rounded-md break-all">
                    <p className="font-bold mb-1 opacity-70 uppercase text-[10px]">Sources:</p>
                    <ul className="space-y-1">
                      {msg.sources.map((source, i) => (
                        <li key={i} className="truncate">
                          <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1 hover:underline text-blue-600 dark:text-blue-400 transition-colors"
                          >
                            <ExternalLink size={10} className="flex-shrink-0" />
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-[fadeIn_0.3s_ease-out]">
                <div className="bg-white dark:bg-neo-dark-bg p-3 border-2 border-black dark:border-neo-dark-border flex gap-1 items-center shadow-neo-sm">
                  <span className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t-4 border-black dark:border-neo-dark-border bg-neo-yellow dark:bg-neo-purple flex items-end gap-3 z-10">
            <label htmlFor="chat-input" className="sr-only">Type a message</label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type a message..."
              className="flex-1 border-4 border-black dark:border-neo-dark-border p-3 focus:outline-none focus:shadow-neo-sm transition-shadow bg-white dark:bg-neo-dark-bg dark:text-neo-dark-text font-bold resize-none overflow-hidden"
            />
            <button 
              type="submit"
              disabled={isLoading}
              aria-label="Send message"
              className="bg-neo-black text-white border-4 border-black dark:border-neo-dark-border p-3 hover:bg-neo-green hover:text-black disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white transition-all active:translate-y-1 dark:bg-neo-dark-border dark:text-neo-dark-bg dark:hover:bg-neo-green"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        ref={toggleButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="chat-window"
        className={`
          group relative p-4 border-4 border-black dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-lg-dark
          bg-neo-green text-black dark:bg-neo-purple dark:text-white
          hover:bg-neo-pink hover:text-black dark:hover:bg-neo-pink dark:hover:text-black
          transition-all duration-300 hover:-translate-y-2 hover:shadow-neo-xl dark:hover:shadow-neo-xl
          flex items-center gap-3 font-black text-xl uppercase tracking-wider
        `}
      > 
        <div className="absolute -top-2 -right-2">
           <span className="flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neo-purple dark:bg-neo-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-neo-purple dark:bg-neo-yellow border-2 border-black dark:border-neo-dark-border"></span>
          </span>
        </div>
        {isOpen ? <X size={28} /> : <Sparkles size={28} className="animate-pulse" />}
        <span className="hidden md:inline">{isOpen ? 'Close Chat' : 'Ask AI'}</span>
      </button>
    </div>
  );
};

export default React.memo(ChatAssistant);