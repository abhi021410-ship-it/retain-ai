'use client';

import { useState, useEffect } from 'react';

interface Memory {
  id: string;
  fact: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState<{ role: string; content: string }[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  const fetchMemories = async () => {
    try {
      const res = await fetch('http://localhost:8000/memories');
      const data = await res.json();
      setMemories(data.memories || []);
    } catch (err) {
      console.error("Failed to fetch memories", err);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    setInput('');
    setChatLog((prev) => [...prev, { role: 'user', content: textToSend }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      setChatLog((prev) => [...prev, { role: 'ai', content: data.response }]);
      fetchMemories();
    } catch (err) {
      console.error("Chat error:", err);
      setChatLog((prev) => [...prev, { role: 'ai', content: "Error connecting to backend agent." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-screen bg-[#000000] text-white font-sans overflow-hidden select-none">
      
      {/* 1. FAR-LEFT NAVIGATION RAIL */}
      <aside className="w-16 border-r border-zinc-900/80 bg-[#020202] flex flex-col items-center py-6 justify-between z-20">
        <div className="flex flex-col items-center gap-5">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-inner cursor-pointer hover:border-zinc-600 transition">
            AI
          </div>
          <button 
            onClick={() => setActiveNav('home')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${activeNav === 'home' ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-200'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          </button>
          <button 
            onClick={() => setActiveNav('memory')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${activeNav === 'memory' ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-200'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </button>
          <button 
            onClick={() => setActiveNav('vector')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${activeNav === 'vector' ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-200'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          </button>
          <button 
            onClick={() => setActiveNav('analytics')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${activeNav === 'analytics' ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-200'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
            N
          </div>
        </div>
      </aside>

      {/* 2. MEMORY BANK SIDEBAR */}
      <section className="w-84 border-r border-zinc-900/80 bg-[#040404] flex flex-col p-5 z-10">
        <div className="mb-5 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">retain<span className="text-zinc-500">.ai</span></h1>
            <p className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-0.5">Your AI Memory Agent</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">v1.0</span>
        </div>

        {/* Agent Status Panel */}
        <div className="bg-[#08080a] border border-zinc-800/80 rounded-2xl p-4 mb-5 relative overflow-hidden shadow-sm group hover:border-zinc-700 transition">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-zinc-800/20 to-transparent pointer-events-none rounded-bl-full"></div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Agent Status</span>
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
            </span>
          </div>
          <div className="my-2.5 py-2 px-3 rounded-xl bg-black/60 border border-zinc-900 flex items-center justify-center">
            {/* Miniature CSS Neural Node Animation */}
            <div className="relative w-full h-8 flex items-center justify-center overflow-hidden">
              <div className="absolute w-6 h-6 rounded-full border border-zinc-600 animate-ping opacity-20"></div>
              <div className="absolute w-4 h-4 rounded-full border border-zinc-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]"></div>
              <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent"></div>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono italic text-center">Always learning. Always remembering.</p>
        </div>

        {/* Memory Bank Header */}
        <div className="flex justify-between items-center mb-3 px-1">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Memory Bank</span>
          <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-md">
            {memories.length}
          </span>
        </div>

        {/* Memory Fragments Scroll List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
          {memories.length === 0 ? (
            <p className="text-xs text-zinc-600 italic px-1 font-mono">No memory fragments recorded...</p>
          ) : (
            memories.map((m, idx) => (
              <div 
                key={m.id || idx} 
                className="bg-[#08080a] border border-zinc-900 hover:border-zinc-700/80 p-3.5 rounded-2xl transition-all duration-200 group shadow-sm hover:translate-x-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-400 mt-1.5 group-hover:bg-white transition shadow-[0_0_6px_rgba(255,255,255,0.5)] flex-shrink-0"></span>
                    <p className="text-xs text-zinc-200 leading-relaxed font-normal">{m.fact}</p>
                  </div>
                  <button className="text-zinc-600 hover:text-zinc-300 transition flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.690h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.690l1.519-4.674z"/></svg>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-zinc-900 text-[9px] font-mono text-zinc-500">
                  <span>ID: {m.id ? m.id.slice(0, 8) : '2a18d420'}...</span>
                  <span className="text-emerald-400/90 font-mono">SYNCED</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Upgrade / Pro Badge Footer */}
        <div className="mt-4 pt-3 border-t border-zinc-900 flex flex-col gap-2">
          <div className="flex items-center justify-between bg-gradient-to-r from-zinc-900 to-black p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Upgrade Agent</span>
            <span className="text-[9px] font-mono bg-white text-black px-2 py-0.5 rounded font-bold">PRO</span>
          </div>
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-200">
                N
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-200">Nexus</p>
                <p className="text-[10px] text-zinc-500">Building the future.</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>
      </section>

      {/* 3. MAIN WORKSPACE / CINEMATIC HERO */}
      <section className="flex-1 flex flex-col justify-between bg-[#000000] p-8 relative overflow-hidden">
        
        {/* Subtle Background Neural Grid / Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-zinc-800/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-zinc-900/20 via-transparent to-transparent pointer-events-none rounded-full blur-2xl"></div>

        {/* Top Header Bar */}
        <div className="flex justify-between items-center border-b border-zinc-900/80 pb-4 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">WELCOME BACK, NEXUS</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 transition flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> API Status
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:bg-zinc-800 transition shadow-sm">
              Logs
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-white shadow-sm ml-1">
              N
            </div>
          </div>
        </div>

        {/* Center Hero & Chat Area */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col justify-end max-w-4xl mx-auto w-full space-y-6 z-10">
          
          {chatLog.length === 0 ? (
            <div className="my-auto flex flex-col lg:flex-row items-center justify-between gap-10 py-6">
              
              {/* Left Hero Typography */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  POWERED BY FASTAPI, CHROMADB & GEMINI
                </div>
                
                <div className="space-y-1">
                  <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans">
                    STATEFUL
                  </h1>
                  <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-zinc-400 uppercase font-sans">
                    MEMORY AGENT
                  </h1>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    <span>/// I&apos;M ALL EARS</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">What&apos;s on your mind?</h2>
                  <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
                    I remember everything that matters. Ask me anything. I&apos;ve got you.
                  </p>
                </div>

                {/* Example Quick Trigger Cards */}
                <div className="pt-2 flex flex-col gap-2.5 max-w-md">
                  <button 
                    onClick={() => sendMessage("I love riding BMWs and building Next.js apps.")}
                    className="w-full text-left bg-[#08080a] hover:bg-[#111116] border border-zinc-800 hover:border-zinc-600 p-3.5 rounded-2xl text-xs text-zinc-300 transition flex items-center justify-between group shadow-sm"
                  >
                    <span className="flex items-center gap-2 font-mono">
                      <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                      Try an example
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500 group-hover:text-zinc-300">&quot;I drive BMWs...&quot;</span>
                  </button>
                  <div className="bg-[#08080a] border border-zinc-800/80 p-3.5 rounded-2xl flex items-center gap-3">
                    <span className="text-zinc-500 text-sm">“</span>
                    <p className="text-xs text-zinc-400 italic">Persistent long-term vector embeddings active in ChromaDB.</p>
                    <span className="text-zinc-500 text-sm">”</span>
                  </div>
                </div>
              </div>

              {/* Right Side Neural Brain Graphic */}
              <div className="w-full lg:w-[340px] flex items-center justify-center relative py-6">
                <div className="relative w-72 h-72 flex items-center justify-center">
                  {/* Outer Rotating Rings */}
                  <div className="absolute inset-0 rounded-full border border-zinc-800 animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute inset-3 rounded-full border border-dashed border-zinc-700/60 animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-8 rounded-full border border-zinc-800/80"></div>
                  
                  {/* Orbiting Particle Nodes */}
                  <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#ffffff] top-4 left-1/2 animate-pulse"></div>
                  <div className="absolute w-2 h-2 bg-zinc-400 rounded-full shadow-[0_0_10px_#ffffff] bottom-8 right-12"></div>
                  
                  {/* Central Glowing Brain / Neural Core */}
                  <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-800 to-black border border-zinc-700 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center relative group">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent animate-pulse"></div>
                    <svg className="w-20 h-20 text-white opacity-90 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            chatLog.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-white text-black font-medium rounded-br-none'
                    : 'bg-[#08080a] border border-zinc-800 text-zinc-100 rounded-bl-none shadow-xl'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#08080a] border border-zinc-800 text-zinc-400 px-4 py-3 rounded-2xl text-xs font-mono animate-pulse flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                Reconciling memory vector bank & generating response...
              </div>
            </div>
          )}
        </div>

        {/* Bottom Floating Command Input Bar */}
        <div className="max-w-3xl mx-auto w-full pt-2 z-10">
          <div className="bg-[#08080a] border border-zinc-800 focus-within:border-zinc-500 rounded-2xl p-2.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center gap-3 transition-all duration-200">
            <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tell the agent something about yourself..."
              className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none px-2 font-mono"
            />
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition hidden sm:flex">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
              </button>
              <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition hidden sm:flex">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"/></svg>
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="bg-white hover:bg-zinc-200 text-zinc-950 px-6 py-2.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-md"
              >
                Send →
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center text-zinc-600 mt-2 font-mono tracking-wider">
            RETAIN.AI // PERSISTENT MEMORY LAYER POWERED BY CHROMADB & GEMINI 3.6 FLASH
          </p>
        </div>

      </section>
    </main>
  );
}