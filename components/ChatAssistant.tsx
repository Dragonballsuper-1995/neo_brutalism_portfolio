
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, Sparkles, ExternalLink, Terminal } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateChatResponse } from '../services/geminiService';

interface ChatAssistantProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hey there! I'm Sujal's AI twin. Ready to dive into my world of code and chaos? Ask me anything!" }
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
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [messages, isOpen]);
  
  const handleClose = useCallback(() => {
    setIsOpen(false);
    toggleButtonRef.current?.focus();
  }, [setIsOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const textarea = inputRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120;
      // Ensure min height is 52px to match button height
      const minHeight = 52;
      textarea.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [input, isOpen]);

  const renderMessageContent = (text: string) => {
    return text.split('\n').map((line, lineIdx) => (
      <p key={lineIdx} className="min-h-[1.2em] mb-1 last:mb-0">
        {line.split(/(\*\*.*?\*\*)/g).map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={partIdx} className="text-neo-purple dark:text-neo-yellow">{part.slice(2, -2)}</strong>;
          }
          return part.split(URL_REGEX).map((subPart, subIdx) => {
             if (subPart.match(URL_REGEX)) {
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
    <div className="fixed bottom-[84px] right-6 md:bottom-8 md:right-8 z-[51] flex flex-col items-end font-mono no-print">
      {isOpen && (
        <div
          id="chat-window"
          role="dialog"
          aria-modal="true"
          className="mb-6 w-[calc(100vw-2rem)] sm:w-[90vw] md:w-[400px] h-[70vh] sm:h-[550px] bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border shadow-neo-xl dark:shadow-neo-lg-dark flex flex-col animate-[slideIn_0.3s_ease-out] origin-bottom-right relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

          <div className="bg-neo-black dark:bg-neo-dark-bg text-white p-4 flex justify-between items-center border-b-4 border-black dark:border-neo-dark-border z-10">
            <div className="flex items-center gap-3">
              <div className="bg-neo-green p-1 border-2 border-white text-black rounded-sm shadow-neo-sm">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wider text-neo-yellow">Sujal AI</h3>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Connected to Core
                </div>
              </div>
            </div>
            <button onClick={handleClose} className="hover:bg-neo-pink hover:text-black p-1 transition-colors border-2 border-transparent hover:border-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-neo-dark-surface z-10 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-[fadeIn_0.3s_ease-out]`}>
                <div className={`
                    max-w-[85%] p-4 border-2 border-black dark:border-neo-dark-border shadow-neo-sm text-sm font-medium leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-neo-blue text-black rounded-tl-xl rounded-tr-xl rounded-bl-xl' 
                      : 'bg-gray-100 dark:bg-zinc-900 text-black dark:text-neo-dark-text rounded-tr-xl rounded-br-xl rounded-bl-xl'}
                  `}
                >
                  {renderMessageContent(msg.text)}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 max-w-[85%] text-[10px] bg-neo-yellow/20 dark:bg-neo-purple/20 border-2 border-black/20 dark:border-white/20 p-2 shadow-neo-sm">
                    <p className="font-black mb-1 uppercase opacity-70 flex items-center gap-1">
                      <Terminal size={10} /> Research Grounding:
                    </p>
                    <ul className="space-y-1">
                      {msg.sources.map((source, i) => (
                        <li key={i} className="truncate">
                          <a href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-neo-purple dark:hover:text-neo-yellow transition-colors truncate">
                            <ExternalLink size={8} /> {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col items-start gap-2 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-zinc-900 border-2 border-black dark:border-neo-dark-border shadow-neo-sm rounded-xl">
                  <span className="text-[10px] font-black text-neo-pink uppercase">Thinking</span>
                  <div className="flex gap-1 items-center h-4">
                    <div className="w-1.5 h-1.5 bg-neo-pink rounded-full animate-wave [animation-delay:0s]"></div>
                    <div className="w-1.5 h-1.5 bg-neo-pink rounded-full animate-wave [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-neo-pink rounded-full animate-wave [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t-4 border-black dark:border-neo-dark-border bg-neo-yellow dark:bg-neo-purple flex items-end gap-3 z-10">
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask Sujal anything..."
              className="w-full border-4 border-black dark:border-neo-dark-border p-3 focus:outline-none focus:shadow-neo-sm transition-shadow bg-white dark:bg-neo-dark-bg dark:text-neo-dark-text font-bold resize-none h-[52px]"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-neo-black text-white border-4 border-black dark:border-neo-dark-border p-3 h-[52px] w-[52px] flex items-center justify-center hover:bg-neo-green hover:text-black disabled:opacity-50 transition-all active:translate-y-1 dark:bg-neo-dark-border dark:text-neo-dark-bg shrink-0"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      <button
        ref={toggleButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group relative p-4 border-4 border-black dark:border-neo-dark-border shadow-neo-lg dark:shadow-neo-lg-dark
          bg-neo-green text-black dark:bg-neo-purple dark:text-white
          hover:bg-neo-pink hover:text-black dark:hover:bg-neo-pink dark:hover:text-black
          transition-all duration-300 hover:-translate-y-2 hover:shadow-neo-xl
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
        <span className="hidden md:inline">{isOpen ? 'Close' : 'Chat with Me'}</span>
      </button>
    </div>
  );
};

export default React.memo(ChatAssistant);
