"use client";

import { useEffect, useState } from "react";

export function AnimatedDoctor() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Main doctor image with removed background */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025.jpg-fTz3nqidy6F5uEoiFHiyxPbc3ah7uf.jpeg"
          alt="Medical Professional"
          className="object-contain animate-gentle-bounce"
          style={{}}
        />
      </div>

      {/* Animated floating icons */}
      <div className="absolute inset-0">
        {/* Heartbeat icon with pulse effect */}
        <div
          className={`absolute top-[15%] left-[20%] transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center animate-float-icon shadow-lg relative after:content-[''] after:absolute after:inset-0 after:bg-purple-500/30 after:rounded-full after:animate-ping">
            <svg
              className="w-6 h-6 text-white animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
        </div>

        {/* Medical cross with rotation */}
        <div
          className={`absolute top-[25%] right-[15%] transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center animate-float-icon-reverse shadow-lg">
            <svg
              className="w-5 h-5 text-white animate-spin-slow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
        </div>

        {/* Shield icon with glow */}
        <div
          className={`absolute bottom-[30%] right-[25%] transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-float-icon-slow shadow-lg relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-glow"></div>
            <svg
              className="w-6 h-6 text-white relative z-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
        </div>

        {/* Stethoscope icon */}
        <div
          className={`absolute bottom-[20%] left-[15%] transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center animate-float-icon shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16M4 8h16M12 12v8" />
            </svg>
          </div>
        </div>

        {/* Connecting lines with gradient */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ filter: "blur(1px)" }}
        >
          <defs>
            <linearGradient
              id="line-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(147,51,234,0.2)" />
              <stop offset="100%" stopColor="rgba(45,212,191,0.2)" />
            </linearGradient>
          </defs>
          <path
            d="M100,100 C150,150 200,150 250,100"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-draw-line"
          />
        </svg>
      </div>
    </div>
  );
}
