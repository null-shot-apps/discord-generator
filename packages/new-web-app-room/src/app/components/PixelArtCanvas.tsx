'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface PixelArtCanvasProps {
  username: string;
  size?: number;
}

// Seeded random number generator for consistent results
class SeededRandom {
  private seed: number;

  constructor(seed: string) {
    this.seed = this.hashCode(seed);
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

const PixelArtCanvas = forwardRef<HTMLCanvasElement, PixelArtCanvasProps>(
  ({ username, size = 256 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      if (!canvasRef.current || !username) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 32;
      canvas.height = 32;

      // Create seeded random generator
      const rng = new SeededRandom(username.toLowerCase());

      // Color palettes for different traits
      const skinTones = [
        '#FFDBAC', '#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#654321'
      ];

      const hairColors = [
        '#2C1B18', '#724832', '#A0522D', '#DEB887', '#FFD700', '#FF6347',
        '#9370DB', '#00CED1', '#32CD32', '#FF1493'
      ];

      const eyeColors = [
        '#8B4513', '#228B22', '#4169E1', '#DC143C', '#FF8C00'
      ];

      const accessoryColors = [
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
        '#FFA500', '#800080', '#FFC0CB', '#A52A2A'
      ];

      // Generate character traits
      const skinTone = skinTones[rng.nextInt(0, skinTones.length - 1)];
      const hairColor = hairColors[rng.nextInt(0, hairColors.length - 1)];
      const eyeColor = eyeColors[rng.nextInt(0, eyeColors.length - 1)];
      const hasHat = rng.next() > 0.7;
      const hasGlasses = rng.next() > 0.8;
      const hasBeard = rng.next() > 0.6;
      const hatColor = accessoryColors[rng.nextInt(0, accessoryColors.length - 1)];
      const glassesColor = accessoryColors[rng.nextInt(0, accessoryColors.length - 1)];

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 32, 32);

      // Helper function to draw pixel
      const drawPixel = (x: number, y: number, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      };

      // Draw face outline (head shape)
      const facePixels = [
        // Row by row definition of face shape
        [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [20, 8], [21, 8],
        [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [16, 9], [17, 9], [18, 9], [19, 9], [20, 9], [21, 9], [22, 9],
        [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [16, 10], [17, 10], [18, 10], [19, 10], [20, 10], [21, 10], [22, 10], [23, 10],
        [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11], [16, 11], [17, 11], [18, 11], [19, 11], [20, 11], [21, 11], [22, 11], [23, 11],
        [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12], [16, 12], [17, 12], [18, 12], [19, 12], [20, 12], [21, 12], [22, 12], [23, 12],
        [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13], [16, 13], [17, 13], [18, 13], [19, 13], [20, 13], [21, 13], [22, 13], [23, 13],
        [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14],
        [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15], [16, 15], [17, 15], [18, 15], [19, 15], [20, 15], [21, 15], [22, 15], [23, 15],
        [8, 16], [9, 16], [10, 16], [11, 16], [12, 16], [13, 16], [14, 16], [15, 16], [16, 16], [17, 16], [18, 16], [19, 16], [20, 16], [21, 16], [22, 16], [23, 16],
        [8, 17], [9, 17], [10, 17], [11, 17], [12, 17], [13, 17], [14, 17], [15, 17], [16, 17], [17, 17], [18, 17], [19, 17], [20, 17], [21, 17], [22, 17], [23, 17],
        [8, 18], [9, 18], [10, 18], [11, 18], [12, 18], [13, 18], [14, 18], [15, 18], [16, 18], [17, 18], [18, 18], [19, 18], [20, 18], [21, 18], [22, 18], [23, 18],
        [8, 19], [9, 19], [10, 19], [11, 19], [12, 19], [13, 19], [14, 19], [15, 19], [16, 19], [17, 19], [18, 19], [19, 19], [20, 19], [21, 19], [22, 19], [23, 19],
        [9, 20], [10, 20], [11, 20], [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20], [19, 20], [20, 20], [21, 20], [22, 20],
        [10, 21], [11, 21], [12, 21], [13, 21], [14, 21], [15, 21], [16, 21], [17, 21], [18, 21], [19, 21], [20, 21], [21, 21],
      ];

      // Draw face
      facePixels.forEach(([x, y]) => {
        drawPixel(x, y, skinTone);
      });

      // Draw hair
      if (!hasHat) {
        const hairPixels = [
          [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [21, 7],
          [9, 8], [22, 8],
          [8, 9], [23, 9],
          [7, 10], [8, 10], [23, 10], [24, 10],
          [7, 11], [24, 11],
          [7, 12], [24, 12],
        ];
        
        hairPixels.forEach(([x, y]) => {
          drawPixel(x, y, hairColor);
        });
      }

      // Draw eyes
      drawPixel(12, 13, eyeColor);
      drawPixel(13, 13, eyeColor);
      drawPixel(18, 13, eyeColor);
      drawPixel(19, 13, eyeColor);

      // Draw nose
      drawPixel(15, 15, '#000000');

      // Draw mouth
      drawPixel(14, 17, '#000000');
      drawPixel(15, 17, '#000000');
      drawPixel(16, 17, '#000000');
      drawPixel(17, 17, '#000000');

      // Draw beard if present
      if (hasBeard) {
        const beardPixels = [
          [11, 19], [12, 19], [13, 19], [14, 19], [15, 19], [16, 19], [17, 19], [18, 19], [19, 19], [20, 19],
          [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20], [19, 20],
          [13, 21], [14, 21], [15, 21], [16, 21], [17, 21], [18, 21],
        ];
        
        beardPixels.forEach(([x, y]) => {
          drawPixel(x, y, hairColor);
        });
      }

      // Draw hat if present
      if (hasHat) {
        const hatPixels = [
          [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6], [16, 6], [17, 6], [18, 6], [19, 6], [20, 6], [21, 6], [22, 6],
          [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [21, 7], [22, 7], [23, 7],
          [9, 8], [22, 8],
        ];
        
        hatPixels.forEach(([x, y]) => {
          drawPixel(x, y, hatColor);
        });
      }

      // Draw glasses if present
      if (hasGlasses) {
        // Left lens
        drawPixel(11, 12, glassesColor);
        drawPixel(12, 12, glassesColor);
        drawPixel(13, 12, glassesColor);
        drawPixel(14, 12, glassesColor);
        drawPixel(11, 13, glassesColor);
        drawPixel(14, 13, glassesColor);
        drawPixel(11, 14, glassesColor);
        drawPixel(12, 14, glassesColor);
        drawPixel(13, 14, glassesColor);
        drawPixel(14, 14, glassesColor);

        // Right lens
        drawPixel(17, 12, glassesColor);
        drawPixel(18, 12, glassesColor);
        drawPixel(19, 12, glassesColor);
        drawPixel(20, 12, glassesColor);
        drawPixel(17, 13, glassesColor);
        drawPixel(20, 13, glassesColor);
        drawPixel(17, 14, glassesColor);
        drawPixel(18, 14, glassesColor);
        drawPixel(19, 14, glassesColor);
        drawPixel(20, 14, glassesColor);

        // Bridge
        drawPixel(15, 13, glassesColor);
        drawPixel(16, 13, glassesColor);
      }

      // Scale up the canvas for display
      ctx.imageSmoothingEnabled = false;
      
    }, [username]);

    return (
      <canvas
        ref={canvasRef}
        width={32}
        height={32}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          imageRendering: 'pixelated',
          imageRendering: '-moz-crisp-edges',
          imageRendering: 'crisp-edges',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          backgroundColor: '#000'
        }}
      />
    );
  }
);

PixelArtCanvas.displayName = 'PixelArtCanvas';

export default PixelArtCanvas;
