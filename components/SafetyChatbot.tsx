
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { askSafetyExpert } from '../services/geminiService';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import CloseIcon from './icons/CloseIcon';

const SafetyChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([{ sender: 'bot', text: 'مرحباً! أنا مساعد السلامة الذكي. كيف يمكنني مساعدتك اليوم في كل ما يخص السلامة ومكافحة الحرائق؟' }]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        const botResponseText = await askSafetyExpert(inputValue);
        const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 end-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-transform transform hover:scale-110 z-50"
                aria-label="افتح مساعد السلامة"
            >
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatBubbleIcon />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 end-6 w-full max-w-sm h-[60vh] bg-white rounded-lg shadow-2xl flex flex-col z-50">
                    <div className="p-4 bg-red-600 text-white rounded-t-lg">
                        <h3 className="text-lg font-bold">خبير السلامة</h3>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="px-4 py-3 rounded-2xl bg-gray-200 text-gray-500">
                                    <span className="animate-pulse">يكتب...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t flex">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="اسأل عن أي شيء..."
                            className="flex-1 p-2 border rounded-s-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-red-600 text-white rounded-e-md hover:bg-red-700 disabled:bg-red-400">
                            إرسال
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default SafetyChatbot;
