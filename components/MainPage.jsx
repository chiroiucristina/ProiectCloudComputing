'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Am adăugat deleteRecord în importuri
import { getRecords, deleteRecord } from '@/utils/recordsFunctions';

const MainPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getRecords();
      if (data) setRecords(data);
    };
    fetchRecords();
  }, []);

  // FUNCȚIA NOUĂ: Se ocupă de ștergerea unei amintiri
  const handleDelete = async (id) => {
    if (confirm("Sigur vrei să ștergi această amintire din jurnal?")) {
      const success = await deleteRecord(id);
      if (success) {
        // Actualizăm lista pe ecran (scoatem record-ul șters)
        setRecords(records.filter(record => record._id !== id));
      } else {
        alert("Eroare la ștergerea înregistrării.");
      }
    }
  };

  return (
    <div className="min-h-screen p-8 bg-[#f0f9f4]"> 
      
      <div className="flex justify-between items-center mb-10">
        <Link href="/contact" className="bg-gray-800 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-700 transition">
          Contact
        </Link>
        <h1 className="text-4xl font-serif font-bold text-gray-800">Jurnal de Călătorii</h1>
        <Link href="/records/create" className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition">
          + Adaugă Amintire
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record) => (
          <div key={record._id} className="bg-white/90 backdrop-blur-sm border border-blue-100 p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-blue-900">{record.city}, {record.country}</h2>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-bold">
                ⭐ {record.rating}/5
              </span>
            </div>
            <p className="text-gray-600 italic mb-4">"{record.description}"</p>
            
            <div className="flex gap-2 justify-end">
              <Link href={`/records/edit/${record._id}`} className="text-sm bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition">
                Edit
              </Link>
              {/* MODIFICARE AICI: Am legat butonul de funcția handleDelete */}
              <button 
                onClick={() => handleDelete(record._id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;