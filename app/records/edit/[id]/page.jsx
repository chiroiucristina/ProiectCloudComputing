'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
// Am adăugat updateRecord în lista de importuri
import { getRecords, updateRecord } from '@/utils/recordsFunctions'; 
import RecordForm from '@/components/RecordForm';

const Edit = () => {
  const router = useRouter();
  const params = useParams(); 
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      const allRecords = await getRecords();
      const found = allRecords.find(r => r._id === params.id);
      setRecord(found);
    };
    if (params.id) fetchRecord();
  }, [params.id]);

  // MODIFICARE AICI: Funcția onSubmit acum salvează datele real
  const onSubmit = async (data) => {
    try {
      // Deoarece funcția ta de updateRecord din utils extrage singură _id-ul din obiect, 
      // trimitem tot obiectul 'data'
      const response = await updateRecord(data);
      
      if (response) {
        router.push('/'); // Ne întoarcem la jurnal dacă totul e OK
      } else {
        alert("Eroare la salvarea modificărilor.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("A apărut o problemă la comunicarea cu serverul.");
    }
  };

  if (!record) return <div className="p-8 text-center font-serif text-gray-600">Se încarcă datele amintirii...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-serif font-bold mb-8 text-center text-gray-800">
          Editează Amintirea
        </h1>
        <RecordForm 
          initialValues={record} 
          onSubmit={onSubmit} 
        />
        <button 
          onClick={() => router.push('/')}
          className="mt-4 text-gray-400 hover:text-gray-600 w-full text-center text-sm transition font-serif"
        >
          ← Renunță la modificări
        </button>
      </div>
    </div>
  );
};

export default Edit;