"use client"

import React from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen min-w-[350px] bg-black flex items-center justify-center px-4 py-10 font-bybit">
      <div className="bg-black shadow-lg rounded-xl w-full max-w-2xl p-8 space-y-8 border border-[#333]">

        <div className="flex justify-center">
          <img src="/bybit-logo.jpg" alt="O'zbekiston gerbi" className="h-20 rounded-full" />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-white">Popolneniye balansi</h1>
        </div>

        <section className="bg-[#111111] border border-[#333] rounded-lg p-6 space-y-3 text-center">
          <h3 className="text-xl font-semibold text-white">O'zbekiston Markaziy Bankining talabi</h3>
          <p className="text-[#999999]">Balansni to'ldirish uchun quyidagi rekvizitlarga pul o'tkazing:</p>
          <p className="text-white font-bold">Mablag'lar 2 ish soati ichida hisobingizga tushadi</p>
        </section>

        <section className="bg-[#111111] border border-[#333] rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white text-center">Balansni to'ldirish uchun rekvizitlar</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-[#999999] mb-1">Bank nomi:</label>
              <div className="relative">
                <input
                  type="text"
                  value="Vladik"
                  readOnly
                  className="w-full px-3 py-2 pr-10 border border-[#444] rounded-md bg-black text-white"
                />
                <button
                  onClick={() => handleCopy('Vladik')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999999] hover:text-white cursor-pointer group"
                  aria-label="Copy Bank nomi"
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs text-white bg-[#333] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Nusxalash
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#999999] mb-1">Oluvchi:</label>
              <div className="relative">
                <input
                  type="text"
                  value="Qabul qiluvchi"
                  readOnly
                  className="w-full px-3 py-2 pr-10 border border-[#444] rounded-md bg-black text-white"
                />
                <button
                  onClick={() => handleCopy('Qabul qiluvchi')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999999] hover:text-white cursor-pointer group"
                  aria-label="Copy Oluvchi"
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs text-white bg-[#333] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Nusxalash
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#999999] mb-1">Karta raqami:</label>
              <div className="relative">
                <input
                  type="text"
                  value="1234 5678 9012 3456"
                  readOnly
                  className="w-full px-3 py-2 pr-10 border border-[#444] rounded-md bg-black text-white"
                />
                <button
                  onClick={() => handleCopy('1234 5678 9012 3456')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999999] hover:text-white cursor-pointer group"
                  aria-label="Copy Karta raqami"
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs text-white bg-[#333] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Nusxalash
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}