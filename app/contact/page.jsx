import ContactForm from '@/components/ContactForm';

export const metadata = {
    title: 'Contact | Jurnal de Călătorii',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen p-8 bg-[#f0f9f4]">
            <main className="mx-auto max-w-3xl p-8 md:p-12">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-700">Contact</h1>
                    <p className="mt-3 text-lg text-gray-700">
                        Trimite-ne un mesaj mai jos.
                    </p>
                </div>
                <div className="shadow-md rounded-xl overflow-hidden">
                    <ContactForm />
                </div>
            </main>
        </div>
    );
}