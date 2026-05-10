'use client';
import React, { useState } from 'react';
import MessageBox from "@/components/MessageBox"; 
function ChatComponent(props) {
    const [chatMessages, setChatMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState('');

    const filterChatHistory = chatHistory => {
        let filteredChatHistory = [];
        for (let i = 0; i < chatHistory.length; i++) {
            const currMessage = chatHistory[i];
            const nextMessage = chatHistory[i + 1];

            if (i === chatHistory.length - 1 || (currMessage.type !== 'error' && nextMessage?.type !== 'error' && currMessage.role !== nextMessage?.role)) {
                filteredChatHistory.push(currMessage);
            }
        }
        return filteredChatHistory;
    };

    
    const buildResponseMessageObject = json => {
        return json.message || { role: 'assistant', content: "Scuze, am întâmpinat o eroare." };
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            if (userInput.length === 0 || isLoading) return;

            const currentMessageObject = {
                role: 'user',
                content: userInput,
            };

            setChatMessages(prevChatMessages => [...prevChatMessages, currentMessageObject]);
            const currentChatHistory = [...chatMessages, currentMessageObject];
            const filteredChatHistory = filterChatHistory(currentChatHistory);
            
            setUserInput(''); 

            try {
                setIsLoading(true);
                const response = await fetch('/api/answer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: filteredChatHistory,
                        type: 'user',
                    }),
                });
                
                const json = await response.json();
                setIsLoading(false);

                const responseMessageObject = buildResponseMessageObject(json);
                setChatMessages(prevChatMessages => [...prevChatMessages, responseMessageObject]);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto overflow-hidden">
            
            <div className="bg-emerald-600 p-4 text-white text-center font-semibold">
                Asistent AI de Călătorie
            </div>

            
            <div className="bg-white min-h-[400px] max-h-[600px] overflow-y-auto p-4 border-x border-emerald-100">
                <MessageBox chatMessages={chatMessages} />
                {isLoading && (
                    <div className="text-sm text-emerald-600 animate-pulse mt-2">
                        Asistentul scrie...
                    </div>
                )}
            </div>

            
            <div className="p-4 bg-emerald-50 border-t border-emerald-100">
                <input
                    id="chat-input"
                    type="text"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    disabled={isLoading}
                    className="w-full p-4 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm text-gray-800"
                    placeholder={isLoading ? "Se procesează..." : "Întreabă-mă ceva despre următoarea ta aventură..."}
                    onKeyDown={handleKeyDown}
                />
                <p className="text-[10px] text-emerald-400 mt-2 text-center">
                    Apasă Enter pentru a trimite mesajul
                </p>
            </div>
        </div>
    );
}

export default ChatComponent;