import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Volume2, HardDrive, ListMusic, Plus, Music2 } from 'lucide-react';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(30);

  // Fake canvas visualizer effect
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    
    const draw = () => {
      if (!ctx || !canvasRef.current) return;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      
      ctx.clearRect(0, 0, width, height);
      
      const bars = 64;
      const barWidth = width / bars;
      
      for (let i = 0; i < bars; i++) {
        // Random height for visual effect, pulsating if playing
        const baseHeight = isPlaying ? Math.random() * height * 0.8 : height * 0.1;
        const h = baseHeight + (Math.sin(Date.now() / 200 + i * 0.2) * 20);
        
        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#00a8ff');
        gradient.addColorStop(0.5, '#00e676');
        gradient.addColorStop(1, '#ffffff');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth, height - h, barWidth - 2, h);
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  return (
    <div className="flex h-screen w-full flex-col bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Background with techno/aero styling */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-aero-blue blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-aero-green blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 overflow-hidden p-6 gap-6">
        
        {/* Left Sidebar - Navigation & Library */}
        <div className="w-64 flex flex-col gap-4">
          <div className="glass-panel p-6 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aero-blue to-aero-green flex items-center justify-center shadow-[0_0_20px_rgba(0,168,255,0.5)]">
              <Music2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">KENWOOD<br/>PLAYER</h1>
          </div>
          
          <div className="glass-panel flex-1 p-4 flex flex-col gap-2">
            <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
              <ListMusic className="w-5 h-5 text-aero-blue" />
              My Library
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">
              <HardDrive className="w-5 h-5 text-aero-green" />
              Upload Songs
            </button>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">Playlists</p>
              <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-slate-300">
                <Plus className="w-4 h-4" /> New Playlist
              </button>
              <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-slate-300">
                Night Drive Vibes
              </button>
              <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-slate-300">
                Gym 2026
              </button>
            </div>
          </div>
        </div>

        {/* Center - Visualizer & Main View */}
        <div className="flex-1 flex flex-col gap-6 relative">
          {/* Main Visualizer Area */}
          <div className="glass-panel flex-1 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-6 z-10 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-mono border border-white/20">360° AUDIO ACTIVE</span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-mono border border-white/20">BASS BOOST</span>
            </div>
            
            {/* Visualizer Canvas */}
            <div className="flex-1 flex items-end p-8 pb-0">
               <canvas 
                 ref={canvasRef} 
                 className="w-full h-48 drop-shadow-[0_0_15px_rgba(0,168,255,0.5)] opacity-80" 
                 width={800} 
                 height={200} 
               />
            </div>
            
            {/* Now Playing Info Overlay */}
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-bold font-heading drop-shadow-md">Starlight Resonance</h2>
                <p className="text-xl text-slate-300 drop-shadow mt-1">Cosmic Drift</p>
              </div>
              <div className="w-32 h-32 rounded-xl bg-slate-800 border-2 border-white/20 overflow-hidden shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Album Art" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer">
                    <Plus className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Queue / Effect Presets */}
        <div className="w-72 flex flex-col gap-4">
           <div className="glass-panel p-5 flex flex-col gap-4 h-1/2">
             <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-aero-green animate-pulse"></span>
                Up Next
             </h3>
             <div className="flex-1 overflow-y-auto pr-2 space-y-3">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                   <div className="w-10 h-10 rounded bg-slate-800 flex-shrink-0 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium truncate">Neon Nights {i}</p>
                     <p className="text-xs text-slate-400 truncate">Synthwave</p>
                   </div>
                   <span className="text-xs text-slate-500 font-mono">3:45</span>
                 </div>
               ))}
             </div>
           </div>

           <div className="glass-panel p-5 flex-1 flex flex-col">
              <h3 className="font-heading font-semibold text-lg mb-4">DSP Effects</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-aero-blue/20 to-transparent border border-aero-blue/30 cursor-pointer">
                  <span className="text-sm font-medium text-aero-blue">Concert Hall</span>
                  <div className="w-3 h-3 rounded-full bg-aero-blue shadow-[0_0_10px_#00a8ff]"></div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                  <span className="text-sm font-medium">8D Audio</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                  <span className="text-sm font-medium">Clear Voice</span>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Player Bar */}
      <div className="h-24 glass-panel m-6 mt-0 rounded-b-none border-b-0 rounded-t-3xl flex items-center justify-between px-8 relative z-20">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 w-[250px]">
          <div className="w-14 h-14 rounded-lg bg-slate-800 overflow-hidden shadow-lg animate-[spin_10s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
            <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover rounded-full" alt="Spinning Art" />
          </div>
          <div>
            <h4 className="font-medium">Starlight Resonance</h4>
            <p className="text-xs text-slate-400">Cosmic Drift</p>
          </div>
        </div>

        {/* Controls & Scrubber */}
        <div className="flex-1 max-w-2xl flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors">
              <Shuffle className="w-5 h-5" />
            </button>
            <button className="text-slate-300 hover:text-white transition-colors">
              <SkipBack className="w-6 h-6 fill-current" />
            </button>
            
            <button 
              className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </button>
            
            <button className="text-slate-300 hover:text-white transition-colors">
              <SkipForward className="w-6 h-6 fill-current" />
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">1:23</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 relative cursor-pointer group">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-aero-blue to-aero-green rounded-full pointer-events-none" 
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">4:20</span>
          </div>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center gap-4 w-[250px] justify-end">
          <button className="text-slate-400 hover:text-white transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <div className="w-24 h-1.5 rounded-full bg-white/10 relative cursor-pointer group">
            <div className="absolute top-0 left-0 h-full w-2/3 bg-white rounded-full pointer-events-none">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
