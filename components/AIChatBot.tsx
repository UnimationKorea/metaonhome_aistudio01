
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `You are MetaOn AI, a professional and friendly assistant for MetaOn (메타온). 
MetaOn is a next-generation AI and metaverse English learning platform for kindergarten and elementary students.
Key Platform Components:
1. Study Zone: 50+ game-based activities for daily learning.
2. Meta Planet (Metaverse): Review lessons by conversing with NPCs and earning rewards.
3. Battle Zone: Master content through real-time quiz battles.
4. AI Tutor System (MetaOn II): Automatically measures levels and corrects weaknesses naturally.

Your mission:
- Answer questions accurately using MetaOn's platform details.
- Be professional, confident, and encouraging.
- Respond in the language the user is using (Korean or English).
- If you don't know the answer, politely ask them to use the contact form or email webmaster@eduree.com.`;

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am MetaOn AI. How can I help you explore the future of education today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Create fresh instance per call as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      // Use .text property directly
      const aiResponse = response.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please check your network or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150] font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <MessageSquare size={28} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0B0B0F]"></div>
        </button>
      )}

      {isOpen && (
        <div className="w-[350px] md:w-[400px] h-[550px] bg-[#0D0D14] border border-white/10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          <div className="p-6 bg-gradient-purple flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-tight">MetaOn AI</h3>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest">Active Assistant</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/[0.01]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-purple-600' : 'bg-white/5 border border-white/10'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-purple-400" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-purple-600/90 text-white rounded-tr-none' : 'bg-white/5 border border-white/5 text-gray-300 rounded-tl-none break-keep'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Bot size={16} className="text-purple-400" />
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-purple-400" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white/[0.02] border-t border-white/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask MetaOn AI..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-14 focus:outline-none focus:border-purple-500 transition-all text-sm font-medium"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-3 bg-purple-600 rounded-lg text-white disabled:opacity-30 transition-all hover:bg-purple-700 active:scale-90"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-gray-600 mt-3 text-center uppercase tracking-widest font-bold">Powered by Gemini-3-Pro-Preview</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;
