import React, { useState, useCallback } from 'react';
import StatefulButton, { ButtonStatus } from './StatefulButton';
import SuccessAnimation from './SuccessAnimation';
import { Send } from 'lucide-react';

// ============================================
// Types
// ============================================
interface ContactFormProps {
  onSuccess: (name: string) => void;
  onError: (message: string) => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: '', email: '', message: '' };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_URL = 'https://formspree.io/f/xqagjnpj';

// ============================================
// Component
// ============================================
const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, onError }) => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<ButtonStatus>('idle');
  const [isSent, setIsSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'email' && emailError) setEmailError(false);
  }, [emailError]);

  const showError = useCallback((msg: string) => {
    onError(msg);
    setStatus('error');
    setTimeout(() => setStatus('idle'), 2000);
  }, [onError]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return showError('Please fill in all fields.');
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setEmailError(true);
      return showError('Please enter a valid email address.');
    }

    setStatus('loading');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setIsSent(true);
          setTimeout(() => {
            onSuccess(form.name);
            setForm(INITIAL_FORM);
            setIsSent(false);
            setStatus('idle');
          }, 3500);
        }, 1000);
      } else {
        const data = await response.json();
        const msg = data.errors?.map((e: any) => e.message).join(', ') || 'There was a problem sending your message.';
        showError(msg);
      }
    } catch {
      showError('Network error. Please try again later.');
    }
  }, [form, onSuccess, showError]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  if (isSent) {
    return <SuccessAnimation name={form.name} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="space-y-2 group">
          <label htmlFor="name-input" className="font-mono font-bold text-sm uppercase text-gray-500 dark:text-neo-dark-text-muted group-focus-within:text-neo-purple dark:group-focus-within:text-neo-yellow transition-colors">
            01. Name
          </label>
          <input
            id="name-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-100 dark:bg-zinc-900 border-4 border-transparent focus:bg-white dark:focus:bg-black focus:border-neo-purple dark:focus:border-neo-yellow p-4 font-bold text-xl focus:outline-none transition-all duration-200 text-black dark:text-neo-dark-text placeholder-gray-400 dark:placeholder-zinc-600"
            placeholder="Jane Doe"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2 group">
          <label htmlFor="email-input" className="font-mono font-bold text-sm uppercase text-gray-500 dark:text-neo-dark-text-muted group-focus-within:text-neo-purple dark:group-focus-within:text-neo-yellow transition-colors">
            02. Email
          </label>
          <input
            id="email-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`w-full bg-gray-100 dark:bg-zinc-900 border-4 ${emailError ? 'border-neo-pink' : 'border-transparent'} focus:bg-white dark:focus:bg-black focus:border-neo-purple dark:focus:border-neo-yellow p-4 font-bold text-xl focus:outline-none transition-all duration-200 text-black dark:text-neo-dark-text placeholder-gray-400 dark:placeholder-zinc-600`}
            placeholder="jane@example.com"
            aria-invalid={emailError}
          />
        </div>
      </div>

      {/* Message Field */}
      <div className="space-y-2 group flex-grow">
        <label htmlFor="message-input" className="font-mono font-bold text-sm uppercase text-gray-500 dark:text-neo-dark-text-muted group-focus-within:text-neo-purple dark:group-focus-within:text-neo-yellow transition-colors flex justify-between">
          <span>03. Message</span>
          <span className="hidden md:inline opacity-50 font-normal normal-case">[Ctrl + Enter to send]</span>
        </label>
        <textarea
          id="message-input"
          rows={4}
          name="message"
          value={form.message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-100 dark:bg-zinc-900 border-4 border-transparent focus:bg-white dark:focus:bg-black focus:border-neo-purple dark:focus:border-neo-yellow p-4 font-mono text-lg focus:outline-none transition-all duration-200 resize-none h-48 text-black dark:text-neo-dark-text placeholder-gray-400 dark:placeholder-zinc-600"
          placeholder="Tell me about your project..."
        />
      </div>

      {/* Submit Button */}
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
