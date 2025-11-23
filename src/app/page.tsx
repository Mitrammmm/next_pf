// import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center text-gray-900"
      style={{ backgroundImage: "url('/dragon.jpg')" }}
    >
      <div className="bg-white/20 min-h-screen">
        {/* NAV */}
        <header className="w-full 
  fixed top-0 left-0 
  backdrop-blur-lg 
  bg-white/40 
  shadow-sm 
  z-50 
  px-6 py-6 
  flex items-center justify-between">
          <div className="text-3xl font-extrabold tracking-widest">SAUMITRA</div>
          <nav className="space-x-6">
            <a className="font-semibold tracking-widest text-sm uppercase cursor-pointer" href="#home">Home</a>
            <a className="font-semibold tracking-widest text-sm uppercase cursor-pointer" href="#projects">Projects</a>
            <a className="font-semibold tracking-widest text-sm uppercase cursor-pointer" href="#contact">Contact</a>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-28">
          {/* HOME INTRO */}
          <section id="home" className="pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-6xl font-black">Hi, I am Saumitra</h1>
                <p className="mt-6 max-w-xl font-semibold leading-relaxed">
                  I build fast, scalable and production-ready web apps.<br />
                  Full-Stack • System Design • DevOps.
                </p>
              </div>
            </div>
          </section>

          
        </main>

        <footer className="text-center py-8">© {new Date().getFullYear()} Saumitra</footer>
      </div>
    </div>
  );
}