'use client';

import { useState, useRef, useCallback } from 'react';
import PixelArtCanvas from './PixelArtCanvas';

export default function NFTGenerator() {
  const [username, setUsername] = useState('');
  const [generatedNFT, setGeneratedNFT] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateNFT = useCallback(async () => {
    if (!username.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate the NFT data URL from canvas
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setGeneratedNFT(dataUrl);
    }
    
    setIsGenerating(false);
  }, [username]);

  const downloadNFT = () => {
    if (!generatedNFT) return;
    
    const link = document.createElement('a');
    link.download = `${username}-nft.png`;
    link.href = generatedNFT;
    link.click();
  };

  const resetGenerator = () => {
    setUsername('');
    setGeneratedNFT(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-white mb-3">
              Discord Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter any Discord username..."
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && generateNFT()}
            />
          </div>

          <button
            onClick={generateNFT}
            disabled={!username.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Generating...
              </div>
            ) : (
              'Generate NFT'
            )}
          </button>

          {generatedNFT && (
            <div className="space-y-3">
              <button
                onClick={downloadNFT}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Download NFT
              </button>
              <button
                onClick={resetGenerator}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Generate Another
              </button>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-xl font-semibold text-white">NFT Preview</h3>
          
          <div className="bg-black/30 rounded-lg p-6 border-2 border-dashed border-white/30">
            {username ? (
              <PixelArtCanvas 
                ref={canvasRef}
                username={username} 
                size={256} 
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p>Enter a username to see preview</p>
                </div>
              </div>
            )}
          </div>

          {username && (
            <div className="text-center">
              <p className="text-sm text-gray-300">
                32×32 CryptoPunk Style
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Generated from: <span className="font-mono">{username}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
