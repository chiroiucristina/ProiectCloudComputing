'use client';
import { useState } from 'react';

const RecordForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen p-8 bg-[#f0f9f4]">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Oraș</label>
          <input name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="ex: Paris" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Țară</label>
          <input name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="ex: Franța" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Notă (1-5)</label>
          <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Impresii de călătorie</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg" rows="4" placeholder="Cum a fost atmosfera?" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
          Salvează în Jurnal
        </button>
      </form>
    </div>
  );
};

export default RecordForm;