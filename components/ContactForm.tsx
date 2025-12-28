
import React, { useState } from 'react';
import StatefulButton, { ButtonStatus } from './StatefulButton';
import { Send, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  onSuccess: (name: string) => void;
  onError: (message: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, onError }) => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<ButtonStatus>('idle');
  const [isSent, setIsSent] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'email' && emailHasError) {
       setEmailHasError(false);
    }
  };

  const handleContactSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      onError("Please fill in all fields.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    if (!validateEmail(contactForm.email)) {
      setEmailHasError(true);
      onError('Please enter a valid email address.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch("https://formspree.io/f/xqagjnpj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(contactForm)
      });

      if (response.ok) {
        setStatus('success');
        
        // Wait a moment so the user sees the "Success" state on the button
        setTimeout(() => {
            setIsSent(true);
            // Wait a few seconds to show the confetti/success message before closing
            setTimeout(() => {
                onSuccess(contactForm.name);
                setContactForm({ name: '', email: '', message: '' });
                setIsSent(false); // Reset for next time
                setStatus('idle');
            }, 3500);
        }, 1000);
        
      } else {
        const data = await response.json();
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
        
        if (data.errors && data.errors.length > 0) {
           onError(data.errors.map((err: any) => err.message).join(", "));
        } else {
           onError("There was a problem sending your message.");
        }
      }
    } catch (error) {
       setStatus('error');
       setTimeout(() => setStatus('idle'), 3000);
       onError("Network error. Please try again later.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleContactSubmit();
    }
  };

  if (isSent) {
      return (
          <div className="flex flex-col items-center justify-center h-full py-10 relative overflow-hidden">
             {/* Simple CSS-based confetti */}
             <style>{`
                @keyframes fall {
                    0% { transform: translateY(-10%) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(60vh) rotate(720deg); opacity: 0; }
                }
             `}</style>
             <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 w-3 h-3 rounded-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            backgroundColor: ['#FFDE59', '#FF914D', '#7ED957', '#5CE1E6', '#FF66C4', '#8C52FF'][Math.floor(Math.random() * 6)],
                            animation: `fall ${Math.random() * 2 + 2}s linear forwards`,
                            animationDelay: `${Math.random() * 0.5}s`,
                        }}
                    />
                ))}
             </div>

             <div className="bg-neo-green p-6 rounded-full border-4 border-black mb-6 animate-[bounce_0.5s_infinite_alternate]">
                 <CheckCircle size={64} className="text-black" />
             </div>
             <h3 className="text-3xl md:text-4xl font-black uppercase text-center mb-2 animate-[slideIn_0.3s_ease-out]">
                 Message Transmitted
             </h3>
             <p className="font-mono text-center text-gray-600 dark:text-neo-dark-text-muted">
                 Thank you, {contactForm.name}.<br/> I'll get back to you shortly.
             </p>
          </div>
      );
  }

  return (
    <form onSubmit={handleContactSubmit} noValidate className="flex flex-col gap-8 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 group">
          <label htmlFor="name-input" className="font-mono font-bold text-sm uppercase text-gray-500 dark:text-neo-dark-text-muted group-focus-within:text-neo-purple dark:group-focus-within:text-neo-yellow transition-colors">
            01. Name
          </label>
          <input 
            id="name-input"
            type="text"
            name="name"
            value={contactForm.name}
            onChange={handleContactChange} 
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-100 dark:bg-zinc-900 border-4 border-transparent focus:bg-white dark:focus:bg-black focus:border-neo-purple dark:focus:border-neo-yellow p-4 font-bold text-xl focus:outline-none transition-all duration-200 text-black dark:text-neo-dark-text placeholder-gray-400 dark:placeholder-zinc-600"
            placeholder="Jane Doe"
          />
        </div>

        <div className="space-y-2 group">
          <label htmlFor="email-input" className="font-mono font-bold text-sm uppercase text-gray-500 dark:text-neo-dark-text-muted group-focus-within:text-neo-purple dark:group-focus-within:text-neo-yellow transition-colors">
             02. Email
          </label>
          <input 
            id="email-input"
            type="email"
            name="email"
            value={contactForm.email}
            onChange={handleContactChange} 
            onKeyDown={handleKeyDown}
            className={`w-full bg-gray-100 dark:bg-zinc-900 border-4 ${emailHasError ? 'border-neo-pink' : 'border-transparent'} focus:bg-white dark:focus:bg-black focus:border-neo-purple dark:focus:border-neo-yellow p-4 font-bold text-xl focus:outline-none transition-all duration-200 text-black dark:text-neo-dark-text placeholder-gray-400 dark:placeholder-zinc-600`}
            placeholder="jane@example.com"
            aria-invalid={emailHasError}
          />
        </div>
      </div>

      <div className="space-y-2 group flex-grow">
        <label htmlFor="message-input" className="font-mono font-bold text-sm uppercase text-gray-500 dark:text-neo-dark-text-muted group-focus-within:text-neo-purple dark:group-focus-within:text-neo-yellow transition-colors flex justify-between">
           <span>03. Message</span>
           <span className="hidden md:inline opacity-50 font-normal normal-case">[Ctrl + Enter to send]</span>
        </label>
        <textarea 
          id="message-input"
          rows={4}
          name="message"
          value={contactForm.message}
          onChange={handleContactChange}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-100 dark:bg-zinc-900 border-4 border-transparent focus:bg-white dark:focus:bg-black focus:border-neo-purple dark:focus:border-neo-yellow p-4 font-mono text-lg focus:outline-none transition-all duration-200 resize-none h-48 text-black dark:text-neo-dark-text placeholder-gray-400 dark:placeholder-zinc-600"
          placeholder="Tell me about your project..."
        ></textarea>
      </div>
      
      <div className="flex justify-end pt-4">
        <StatefulButton 
          type="submit" 
          status={status}
          variant="black"
          loadingText="Sending..."
          successText="Message Sent!"
          errorText="Failed"
          className="w-full md:w-auto py-4 px-12 text-lg group"
        >
          Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </StatefulButton>
      </div>
    </form>
  );
};

export default React.memo(ContactForm);
