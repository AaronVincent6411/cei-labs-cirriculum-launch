"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ksum_logo from "@/public/assets/ksum_logo.webp";
import ssk_logo from "@/public/assets/ssk_logo.webp";
import cei_logo_2 from "@/public/assets/cei_logo_2.webp";
import fablab_logo from "@/public/assets/fablab_logo.webp";
import { gsap } from "gsap";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// Badge SVG component (unchanged)
const Badge = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
      fill="#00AA45"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56ZM27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
      fill="#24292E"
    ></path>
  </svg>
);

export default function Home() {
  const [showText, setShowText] = useState(false);
  const [showBox, setShowBox] = useState(false); 
  const [showVideo, setShowVideo] = useState(false);  
  const [shrinkVideo, setShrinkVideo] = useState(false);
  const [showBoxText, setShowBoxText] = useState(false);
  const [firstBox, setFirstBox] = useState({
  showVideo: false,
  shrinkVideo: false,
  showBoxText: false
});
const [additionalBoxes, setAdditionalBoxes] = useState([
  {
    id: 2,
    showVideo: false,
    shrinkVideo: false,
    showBoxText: false,
    videoSrc: "assets/cei_lab_launch_video_2.mp4",
    title: "Module 2",
    subtitle: "How to turn on 3D Printer"
  },
  {
    id: 3,
    showVideo: false,
    shrinkVideo: false,
    showBoxText: false,
    videoSrc: "assets/cei_lab_launch_video_3.mp4",
    title: "Module 3",
    subtitle: "3D Printer UI"
  }
]);
  const [showContinue, setShowContinue] = useState(false);

  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const boxRef = useRef(null);
  const videoRef = useRef(null); 

  const words = "മികച്ച വിദ്യാഭ്യാസം ഉറപ്പാക്കുക എന്ന ലക്ഷ്യത്തോടെ";
  const word_2 = "CEI learning modules"

  const handleLaunch = () => {
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
      onComplete: () => setShowText(true),
    });

    tl.to(containerRef.current, { opacity: 0, scale: 0.95 })
      .to(overlayRef.current, { opacity: 1, duration: 0.5 }, "-=0.5");
  };

  useEffect(() => {
    if (showText) {
      const boxTimer = setTimeout(() => {
        setShowBox(true);
      }, 3000);

      return () => clearTimeout(boxTimer);
    }
  }, [showText]);

  useEffect(() => {
  if (showText) {
    const clearTimer = setTimeout(() => {
      setShowText(false);
    }, 3000); 

    return () => clearTimeout(clearTimer);
  }
}, [showText]);


  useEffect(() => {
    if (showBox) {
      gsap.fromTo(
        boxRef.current,
        { width: 0, opacity: 0 },
        { width: "80%", opacity: 1, duration: 1, ease: "power2.out" }
      );

      setTimeout(() => {
        setShowVideo(true); 
      }, 1000); 
    }
  }, [showBox]);

  useEffect(() => {
  if (showVideo) {
    const timer = setTimeout(() => {
      setShrinkVideo(true);
    }, 41000);

    return () => clearTimeout(timer);
  }
}, [showVideo]);

useEffect(() => {
  if (shrinkVideo && boxRef.current) {
    gsap.to(boxRef.current, {
      width: "400px",
      height: "350px",
      top: "50%",
      left: "200px",        // Adjust left offset as needed
      xPercent: -0,         // Reset transform X
      yPercent: -50,        // Keep vertical center alignment
      borderRadius: "20px",
      duration: 1.5,
      ease: "power3.inOut"
    });
  }
}, [shrinkVideo]);

useEffect(() => {
  if (shrinkVideo) {
    const textTimer = setTimeout(() => {
      setShowBoxText(true);
    }, 500); // delay after shrink completes

    return () => clearTimeout(textTimer);
  }
}, [shrinkVideo]);

useEffect(() => {
  if (shrinkVideo) {
    additionalBoxes.forEach((box, index) => {
      setTimeout(() => {
        setAdditionalBoxes((prev) =>
          prev.map((b) =>
            b.id === box.id ? { ...b, showVideo: true, showBoxText: true } : b
          )
        );
      }, (index + 1) * 500); // stagger each box by 500ms
    });
  }
}, [shrinkVideo]);

useEffect(() => {
  if (shrinkVideo) {
    const eraseBgTimer = setTimeout(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: () => setShowContinue(true), 
      });
    }, 8000); 

    return () => clearTimeout(eraseBgTimer);
  }
}, [shrinkVideo])


  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-linear-to-br from-white via-yellow-200 to-blue-500 overflow-x-hidden">
      {/* White overlay */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full bg-white opacity-0 z-10 pointer-events-none"
      ></div>

      {/* Original content */}
      <section
        ref={containerRef}
        className="w-full flex flex-col items-center justify-center h-screen bg-gradient-to-br from-white via-yellow-200 to-blue-500 animate-gradient relative z-10 gap-20"
      >
        {/* Logos */}
        <div className="absolute flex md:gap-10 gap-2 p-4 w-full top-0 justify-evenly items-center">
          <Image src={ssk_logo} alt="ssk logo" className="2xl:w-48 lg:w-40 md:w-32 sm:w-24 w-16 hover:scale-110" />
          <Image src={ksum_logo} alt="ksum logo" className="2xl:w-36 lg:w-28 md:w-20 sm:w-16 w-10 hover:scale-110" />
          <Image src={cei_logo_2} alt="cei logo" className="2xl:w-40 lg:w-32 md:w-24 sm:w-20 w-14 hover:scale-110" />
          {/* <Image src={streamlab_logo} alt="streamlab logo" className="2xl:w-40 lg:w-32 md:w-24 sm:w-20 w-14 hover:scale-110" /> */}
          <Image src={fablab_logo} alt="fablab logo" className="2xl:w-36 lg:w-28 md:w-20 sm:w-16 w-10 hover:scale-110" />
        </div>
        <div className="flex flex-col text-3xl text-center gap-5">
          <h1 className=""style={{fontFamily:"Montserrat"}}>Launch</h1>
          <h1 style={{fontFamily:"Montserrat"}}>of </h1>
          <h1 className="text-5xl font-bold" style={{fontFamily:"Montserrat"}}>CEI's Learning Modules</h1>
        </div>

        {/* Launch Button */}
        <button
          onClick={handleLaunch}
          className="relative z-20 inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <span className="relative z-20 text-lg">Launch 🚀</span>
        </button>
      </section>

     {showText && (
      <div className="absolute top-0 left-0 w-full h-full bg-white z-40 flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          <TextGenerateEffect words={words} />
        </h1>
      </div>
    )}


     {showBox && (
  <div
    ref={boxRef}
    className={`
      absolute 
      bg-gray-800 
      rounded-lg 
      z-50 
      border-2 
      ${shrinkVideo 
      ? "w-[400px] h-[400px] left-[200px] top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-lg  border-red-500"
      : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-gray-800 animted-border"}
    `}
  >
    {showVideo && (
      <video
        ref={videoRef}
        className={` rounded-lg 
          ${shrinkVideo ? "object-contain border-2 animated-border" : "w-full h-full object-cover"}`}
        src="assets/cei_lab_launch_video.mp4"
        autoPlay
        muted
        loop
      />
    )}
    {shrinkVideo && showBoxText && (
      <div className="flex flex-col text-gray-900 gap-2">
        <h1 className="text-2xl font-bold mt-4" style={{fontFamily: "SpaceGrotesk"}}>Module 1</h1>
        <h2 className="text-lg" style={{fontFamily: "Poppins"}}>Introduction to 3D Printer</h2>
      </div>
    )}
    
  </div>
)}
{shrinkVideo && (
  <h1
    className="absolute top-[15%] left-[50%] -translate-x-1/2 font-bold text-gray-900 z-30"
    style={{ fontFamily: "SpaceGrotesk", fontSize: "32px" }}
  >
      <TextGenerateEffect words={word_2} />
  </h1>
)}
{additionalBoxes.map((box) =>
  box.showVideo && (
    <div
      key={box.id}
      className="absolute top-1/2 bg-white/20 backdrop-blur-lg border-2 border-red-500 rounded-lg p-2 flex flex-col z-20 items-baseline"
      style={{
        width: "400px",
        height: "350px",
        left: `${200 + (box.id - 1) * (550)}px`,
        transform: "translateY(-50%)",
      }}
    >
      <video
        src={box.videoSrc}
        autoPlay
        muted
        loop
        className="object-contain border-2 animated-border rounded-lg"
      />
      <div className="flex flex-col text-gray-900 gap-2">
        <h1 className="text-2xl font-bold mt-4" style={{fontFamily: "SpaceGrotesk"}}>{box.title}</h1>
        <h2 className="text-lg" style={{fontFamily: "Poppins"}}>{box.subtitle}</h2>
      </div>
      
    </div>
  )
)}
{showContinue && (
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-50">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "SpaceGrotesk" }}>
          To be Continued...
        </h1>
      </div>
    )}
    </div>
  );
}