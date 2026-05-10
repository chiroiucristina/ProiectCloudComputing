import React, { useEffect, useRef } from 'react';

function MessageBox(props) {
    const messagesEndRef = useRef(null);
    const { chatMessages } = props;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    
    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    return (
        <div className="h-[450px] overflow-y-auto px-4 py-2 space-y-4 scrollbar-thin scrollbar-thumb-emerald-200">
            {/* Mesajul de întâmpinare implicit */}
            <div className="flex justify-start">
                <div className="max-w-[80%] bg-emerald-100 text-emerald-900 p-3 rounded-2xl rounded-tl-none shadow-sm border border-emerald-200">
                    <span className="block text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">
                        Asistent Jurnal
                    </span>
                    <span className="text-sm">
                        Bună! Sunt asistentul tău de călătorie. Cu ce te pot ajuta astăzi?
                    </span>
                </div>
            </div>

            {/* Mesajele din conversație */}
            {chatMessages.map((message, index) => {
                const isAssistant = message.role === 'assistant';
                
                return (
                    <div 
                        key={index} 
                        className={`flex ${isAssistant ? 'justify-start' : 'justify-end animate-in fade-in slide-in-from-right-2'}`}
                    >
                        <div className={`
                            max-w-[85%] p-3 rounded-2xl shadow-sm border
                            ${isAssistant 
                                ? 'bg-emerald-600 text-white rounded-tl-none border-emerald-500' 
                                : 'bg-white text-gray-800 rounded-tr-none border-emerald-100'
                            }
                        `}>
                            <span className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${isAssistant ? 'text-emerald-100' : 'text-emerald-600'}`}>
                                {isAssistant ? 'Asistent' : 'Tu'}
                            </span>
                            <span className="text-sm leading-relaxed">
                                {message.content}
                            </span>
                        </div>
                    </div>
                );
            })}
            
            {/* Element pentru auto-scroll */}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageBox;