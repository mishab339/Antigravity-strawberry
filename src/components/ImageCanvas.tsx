'use client';
import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function ImageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();
  const frameCount = 154; // from 00039.jpg to 00192.jpg

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const num = (i + 39).toString().padStart(5, '0');
      img.src = `/bottle_opening/${num}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1 && canvasRef.current && i === 0) {
          drawFrame(0, [img]);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawFrame = (index: number, imgs: HTMLImageElement[] = images) => {
    if (imgs[index] && imgs[index].complete && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = imgs[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Scale the image down a bit to show the full bottle (85% of screen instead of cropping)
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.85;
        const w = img.width * scale;
        const h = img.height * scale;
        // Center horizontally
        const x = (canvas.width / 2) - (w / 2);
        // Place it some distance apart from the top (e.g., 10% of canvas height)
        const y = canvas.height * 0.1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, w, h);
      }
    }
  };

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const index = Math.min(Math.floor(latest), frameCount - 1);
    drawFrame(index);
  });

  useEffect(() => {
    const handleResize = () => {
      const index = Math.min(Math.floor(frameIndex.get()), frameCount - 1);
      drawFrame(index);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-black pointer-events-none">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}
