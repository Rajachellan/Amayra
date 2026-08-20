"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Play } from "lucide-react";

const REELS = [
  { id: 1, video: "/videos/8855209-uhd_2160_3840_30fps.mp4", thumb: "https://images.unsplash.com/photo-1626008455548-23719c89487c?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, video: "/videos/bangles.mp4", thumb: "https://images.unsplash.com/photo-1603561596112-0a132b757442?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, video: "/videos/weddig_jewels.mp4", thumb: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, video: "/videos/rings.mp4", thumb: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop" },
  { id: 5, video: "/videos/luxury_jewel.mp4", thumb: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop" },
  { id: 6, video: "/videos/weddig.mp4", thumb: "https://images.unsplash.com/photo-1605100804763-247f67b3f413?q=80&w=2070&auto=format&fit=crop" },
  { id: 7, video: "/videos/neckle.mp4", thumb: "https://images.unsplash.com/photo-1605100804763-247f67b3f413?q=80&w=2070&auto=format&fit=crop" },
];




export const InstagramGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#faf9f6] to-[#f3f2ee]">
      <div className="px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-yellow-600 uppercase tracking-[0.4em] text-xs font-semibold block">
              Digital Muse
            </span>

            <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mt-2">
              Our Digital <span className="italic text-gray-600">Universe</span>
            </h2>
          </div>

          <button className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gray-800 hover:text-yellow-600 transition border-b border-gray-300 pb-1">
            <Camera className="w-4 h-4" />
            @GemsOfMaiRii
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {REELS.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative h-[420px] rounded-xl overflow-hidden 
              bg-white border border-gray-200 
              hover:border-yellow-400 transition-all duration-500 
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] 
              hover:-translate-y-1 group"
            >

              {/* VIDEO */}
              <VideoPlayer src={reel.video} poster={reel.thumb} />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {/* PLAY ICON */}
              {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow">
                  <Play className="w-4 h-4 text-gray-900 ml-0.5" />
                </div>
              </div> */}

              {/* LABEL */}
              <div className="absolute bottom-3 left-3">
                <span className="text-white text-[9px] uppercase tracking-widest font-semibold">
                  Watch
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const VideoPlayer = ({ src, poster }: { src: string; poster: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover"
      />
    </div>
  );
};