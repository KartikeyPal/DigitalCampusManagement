import React from "react";
import kartikeyImg from "../images/Kartikey_ki_img.jpeg";
import anuraghImg from "../images/Anuragh_ki_img.jpeg";
import omImg from "../images/Om_ki_img.jpeg";

const TeamMember = ({ name, bio, image }) => (
  <div className="flex flex-col items-center text-center p-6 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-blue-500/50 transition-all group">
    <div className="w-32 h-32 rounded-full bg-zinc-800 mb-4 overflow-hidden border-2 border-zinc-700 group-hover:border-blue-500/50 transition-colors">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover" 
      />
    </div>
    <h3 className="text-xl font-bold text-white">{name}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed min-h-[60px]">{bio}</p>
  </div>
);

const About = () => {
  const team = [
    { 
      name: "Miss. Eshika", 
      bio: "java developer",
      image: "/eshika.jpg"
    },
    { 
      name: "Mr. Kartikey", 
      bio: "kartikey likes exploring tech!",
      image: kartikeyImg
    },
    { 
      name: "Mr. Anuragh Jaudhon", 
      bio: "Highly motivated, pure veg , amazing human being.",
      image: anuraghImg
    },
    { 
      name: "Mr. Om Chavan", 
      bio: "Hahaha...",
      image: omImg
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-blue-500/30">
      
      <section className="py-24 border-b border-zinc-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full -top-24 -left-24"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed mb-8">
            To simplify college life by replacing scattered emails, WhatsApp groups, and notice boards with one intelligent, role-based digital campus platform.
          </p>
          <p className="text-lg text-zinc-400 leading-relaxed">
            <strong>College Sync</strong> exists to help students, faculty, clubs, and administrators communicate clearly, 
            act faster, and stay aligned—without the noise of information overload.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0c0c0e]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-500 flex items-center gap-2">
              <span className="w-8 h-1 bg-red-500 rounded-full"></span> The Problem
            </h2>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed font-light">
              <p>Current college operations are fragmented across multiple platforms, leading to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                   <span className="text-red-500">✕</span> <span>Delayed approvals & lost physical paper trails</span>
                </li>
                <li className="flex items-start gap-2">
                   <span className="text-red-500">✕</span> <span>Critical notices getting buried in WhatsApp chats</span>
                </li>
                <li className="flex items-start gap-2">
                   <span className="text-red-500">✕</span> <span>Role confusion between Faculty, HODs, and Clubs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-400 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-400 rounded-full"></span> The Solution
            </h2>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
              <p>College Sync centralizes all campus communication into a single <strong>Polyglot Microservices</strong> architecture.</p>
              <p>We provide a single source of truth where permissions are inherited by role, ensuring the right message reaches the right person instantly.</p>
              <div className="pt-6">
                <p className="text-zinc-500 text-base italic border-l-2 border-blue-500/30 pl-4 py-1">
                  "Built because we needed it too."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-white underline decoration-blue-500 underline-offset-8">
            The Team Worked on this Project
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-zinc-800 text-center">
        <a href="/" className="text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest group">
          <span className="group-hover:mr-2 transition-all">←</span> Back to Homepage
        </a>
      </section>
    </div>
  );
};

export default About;