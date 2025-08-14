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
          <img src="/bybit-logo.jpg" alt="Uzbekistan Emblem" className="h-20 rounded-full" />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-white">O'ZBEKISTON RESPUBLIKASI</h1>
          <h2 className="text-xl text-[#999999]">Iqtisodiyot vazirligi</h2>
        </div>

        <section className="bg-[#111111] border border-[#333] rounded-lg p-6 space-y-3">
          <h3 className="text-xl font-semibold text-white">Ўзбекистон Марказий Банкининг талаби</h3>
          <p className="text-[#999999]">Сиз кредит олиш учун қуйидагиларни тўлашингиз керак:</p>
          <p className="text-white font-bold">ДАВЛАТ БОЖИ | БАНК ХИЗМАТЛАРИ</p>
        </section>

        <section className="bg-[#111111] border border-[#333] rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">Бухгалтерия менеджерининг реквизитлари</h3>
          <div className="space-y-3">
            {/* Bank nomi */}
            <div>
              <label className="block text-sm text-[#999999] mb-1">Bank nomi:</label>
              <div className="relative">
                <input
                  type="text"
                  value="Владик"
                  readOnly
                  className="w-full px-3 py-2 pr-10 border border-[#444] rounded-md bg-black text-white"
                />
                <button
                  onClick={() => handleCopy('Владик')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999999] hover:text-white cursor-pointer group"
                  aria-label="Copy Bank nomi"
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs text-white bg-[#333] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Copy to clipboard
                  </span>
                </button>
              </div>
            </div>

            {/* Oluvchi */}
            <div>
              <label className="block text-sm text-[#999999] mb-1">Oluvchi:</label>
              <div className="relative">
                <input
                  type="text"
                  value="Где"
                  readOnly
                  className="w-full px-3 py-2 pr-10 border border-[#444] rounded-md bg-black text-white"
                />
                <button
                  onClick={() => handleCopy('Где')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999999] hover:text-white cursor-pointer group"
                  aria-label="Copy Oluvchi"
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs text-white bg-[#333] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Copy to clipboard
                  </span>
                </button>
              </div>
            </div>

            {/* Karta raqami */}
            <div>
              <label className="block text-sm text-[#999999] mb-1">Karta raqami:</label>
              <div className="relative">
                <input
                  type="text"
                  value="Деньги?"
                  readOnly
                  className="w-full px-3 py-2 pr-10 border border-[#444] rounded-md bg-black text-white"
                />
                <button
                  onClick={() => handleCopy('Деньги?')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999999] hover:text-white cursor-pointer group"
                  aria-label="Copy Karta raqami"
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs text-white bg-[#333] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Copy to clipboard
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
