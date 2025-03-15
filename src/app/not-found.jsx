'use client';

import React from 'react';

import Link from 'next/link';

import './globals.css';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/70 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg">Lo sentimos, la página que buscas no existe</p>
      <Link href="/peliculas-series" className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
        Volver al inicio
      </Link>
    </div>
  );
}
