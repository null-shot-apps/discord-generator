'use client';

import { useState } from 'react';
import NFTGenerator from './components/NFTGenerator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Discord NFT Generator
          </h1>
          <p className="text-xl text-gray-300">
            Generate unique 32×32 pixel-art NFTs from any Discord username
          </p>
        </div>
        
        <NFTGenerator />
      </div>
    </div>
  );
}

