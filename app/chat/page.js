import ChatComponent from '@/components/ChatComponent';

export const metadata = {
    title: 'Chat AI | Jurnal de Călătorii',
};

export default function ChatPage() {
    return (
        
        <div className="min-h-screen bg-emerald-50 w-full">
            <main className="mx-auto max-w-3xl p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-emerald-900">Asistent de Călătorie</h1>
                    <p className="text-emerald-700">Întreabă-mă orice despre destinațiile tale!</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
                    <ChatComponent />
                </div>
            </main>
        </div>
    );
}