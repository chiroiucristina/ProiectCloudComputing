import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jurnal de Călătorii AI",
  description: "Proiect Cloud Computing cu Chatbot integrat",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {children}

        
        <Link href="/chat">
          <div className="fixed bottom-6 right-6 z-50 group">
            
            <span className="absolute right-16 bottom-2 bg-emerald-900 text-white text-[10px] py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl uppercase tracking-widest font-bold">
              Asistent AI 🤖
            </span>
            
            
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center border-2 border-white">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
              </svg>
            </button>
          </div>
        </Link>
        

      </body>
    </html>
  );
}