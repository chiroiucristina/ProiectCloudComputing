import ContactForm from '@/components/ContactForm';


export const metadata = {
    title: 'Contact | Jurnal de Călătorii',
};

export default function ContactPage() {
    return (
        
        <div className="min-h-screen bg-emerald-50 w-full text-neutral-900">
            
            {/* Header-ul paginii */}
            <Header />

            {/* Secțiunea principală de conținut */}
            <main className="mx-auto max-w-3xl p-8 md:p-12">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-emerald-900">Contact</h1>
                    <p className="mt-3 text-lg text-emerald-700">
                        Ai o întrebare sau vrei să ne povestești despre călătoriile tale? 
                        Trimite-ne un mesaj mai jos.
                    </p>
                </div>

                {/* Formularul va apărea ca un card alb deasupra fundalului verde */}
                <div className="shadow-md rounded-xl overflow-hidden">
                    <ContactForm />
                </div>
            </main>
        </div>
    );
}