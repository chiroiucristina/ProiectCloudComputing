'use client';

import { useRouter } from 'next/navigation';
import { recordDefaultValues } from '@/utils/constants';
import { createRecord } from '@/utils/recordsFunctions';
import RecordForm from '@/components/RecordForm';

const Create = () => {
  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await createRecord(data);
    if (response) {
      // După ce salvăm, ne întoarcem la pagina principală
      router.push('/');
    } else {
      alert('Eroare la salvarea amintirii în jurnal.');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-serif font-bold mb-8 text-center text-gray-800">
          Adaugă o Amintire Nouă
        </h1>
        
        {/* Am corectat aici: folosim initialValues în loc de data */}
        <RecordForm 
          initialValues={recordDefaultValues} 
          onSubmit={onSubmit} 
        />
        
        <button 
          onClick={() => router.push('/')}
          className="mt-4 text-gray-500 hover:text-gray-700 w-full text-center text-sm transition"
        >
          ← Înapoi la Jurnal
        </button>
      </div>
    </div>
  );
};

export default Create;