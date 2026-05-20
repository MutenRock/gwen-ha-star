'use client'
import { useEffect, useState, useRef } from 'react'
import { Play, PenTool, FlaskConical, Globe, Brain, ShoppingBag, Swords, Zap, Leaf } from 'lucide-react'

const DAILY_VIDEO = {
  url:    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  title:  'Vidéo du Jour',
  author: 'Agent Marcel'
}

const services = [
  { id:'sterenna',   title:'STERENNA',         desc:'Boutique · Laser · 3D Print',   icon:ShoppingBag, color:'#f9ca24', href:'https://shop.sterenna.fr',                    role:'all', external:true  },
  { id:'chronicles', title:'CHRONICLES TCG',   desc:'Trading Card Game · Alpha',     icon:Swords,      color:'#ff6b6b', href:'https://chronicles.sterenna.fr',              role:'all', external:true  },
  { id:'pokegang',   title:'POKEFORGE',        desc:'Rocket HQ · Gang Wars',         icon:Play,        color:'#ff6b6b', href:'https://pokegang.nitro.sterenna.fr',          role:'all', external:true  },
  { id:'botanica',   title:'BOTANICA OBSCURA', desc:'Idle Gacha · Mutations · Codex',icon:Leaf,        color:'#4caf50', href:'/botanica',                                  role:'all', external:false },
  { id:'draw',       title:'EXCALIDRAW',       desc:'Whiteboard · Collaboratif',     icon:PenTool,     color:'#4ecdc4', href:'https://draw.nitro.sterenna.fr',              role:'all', external:true  },
  { id:'chef',       title:'CYBERCHEF',        desc:'Encodage · Crypto · Utils',     icon:FlaskConical,color:'#34d399', href:'https://chef.nitro.sterenna.fr',              role:'all', external:true  },
  { id:'lab',        title:'LAB',              desc:'Expérimentations · Sterenna',   icon:FlaskConical,color:'#00b894', href:'https://lab.sterenna.fr',                    role:'all', external:true  },
  { id:'clicker',    title:'STEAM CLICKER',    desc:'Incremental Game · En cours',   icon:Zap,         color:'#fdcb6e', href:'#',                                          role:'all', external:false },
  { id:'leme',       title:'LEME',             desc:'Lemegeton · Agent IA · Oracle', icon:Brain,       color:'#c084fc', href:'https://leme.nitro.sterenna.fr',              role:'all', external:true  },
]

const LOG_MESSAGES = [
  'STERENNA SYSTEMS · ONLINE',
  'CHRONICLES TCG · ALPHA BUILD',
  'POKEFORGE · GANG WARS ACTIVE',
  'LAB STERENNA · EXPERIMENTS RUNNING',
  'STEAM CLICKER · BUILD IN PROGRESS',
  'TUNNEL CLOUD · SECURE',
  'DRAW MODULE · STANDBY',
  'CYBERCHEF · READY',
  'SIGNAL NOMINAL · 99.8%',
  'LEME AGENT · ONLINE',
  'BOTANICA · MUTATIONS ACTIVE',
]

type Star = {
  width: string
  height: string
  top: string
  left: string
  opacity: number
  animation: string
}

function seededNumber(index: number, salt: number) {
  const value = Math.sin(index * 77.13 + salt * 31.7) * 10000
  return value - Math.floor(value)
}

const STAR_FIELD: Star[] = Array.from({ length: 80 }, (_, i) => ({
  width:     seededNumber(i, 1) > 0.85 ? '2px' : '1px',
  height:    seededNumber(i, 2) > 0.85 ? '2px' : '1px',
  top:       `${seededNumber(i, 3) * 100}%`,
  left:      `${seededNumber(i, 4) * 100}%`,
  opacity:   seededNumber(i, 5) * 0.7 + 0.1,
  animation: `twinkle ${2 + seededNumber(i, 6) * 4}s ${seededNumber(i, 7) * 5}s infinite`,
}))

export default function StarPage() {
  const [time, setTime]   = useState('')
  const [logs, setLogs]   = useState<{ t: string; msg: string }[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('fr-FR', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const push = () => {
      const t   = new Date().toLocaleTimeString('fr-FR', { hour12: false })
      const msg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]
      setLogs(prev => [...prev.slice(-7), { t, msg }])
    }
    push()
    const id = setInterval(push, 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let phase = 0, raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#00ff88'
      ctx.lineWidth   = 1.5
      ctx.shadowColor = '#00ff88'
      ctx.shadowBlur  = 8
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += 2) {
        const y = (canvas.height / 2)
          + Math.sin(x * 0.04  + phase)       * 18
          + Math.sin(x * 0.015 + phase * 0.7) * 12
          + Math.sin(x * 0.1   + phase * 2.3) * 4
        ctx.lineTo(x, y)
      }
      ctx.stroke()
      phase += 0.08
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{ fontFamily: '"Share Tech Mono", monospace', background: '#03050f', minHeight: '100vh', color: '#c8b8ff', overflowX: 'hidden' }}>

      {/* ÉTOILES */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {STAR_FIELD.map((star, i) => (
          <div key={i} style={{ position: 'absolute', borderRadius: '50%', background: '#fff', ...star }}/>
        ))}
      </div>

      {/* SCANLINES */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)' }}/>

      {/* HEADER */}
      <header style={{
        position: 'relative', zIndex: 10,
        padding: '12px 24px',
        borderBottom: '1px solid rgba(0,255,136,0.2)',
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '10px', letterSpacing: '3px', color: '#00ff88' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff88', display: 'inline-block', animation: 'pulse 2s infinite', boxShadow: '0 0 6px #00ff88' }}/>
            SYS · NOMINAL
          </span>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#7b5cf0', letterSpacing: '6px' }}>GWEN·HA·STAR</span>
          <span style={{ opacity: 0.5 }}>BRIDGE v4.2</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '10px', letterSpacing: '2px' }}>
          <span style={{ color: 'rgba(200,184,255,0.6)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={11} color="#00ff88"/>
            Public <strong style={{ color: '#fff' }}>STERENNA NETWORK</strong>
          </span>
          <span style={{ color: '#00ff88', fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', fontVariantNumeric: 'tabular-nums' }}>{time}</span>
        </div>
      </header>

      {/* MAIN GRID */}
      <main style={{
        position: 'relative', zIndex: 10,
        display: 'grid',
        gridTemplateColumns: '200px 1fr 250px',
        gap: '16px', padding: '20px',
        minHeight: 'calc(100vh - 120px)'
      }}>

        {/* COL 1 — RADAR + SYSTEMS */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: 'rgba(0,15,8,0.8)', border: '1px solid rgba(0,255,136,0.25)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#00ff88', marginBottom: '10px' }}>RADAR · SCAN</div>
            <svg viewBox="0 0 200 200" style={{ width: '100%' }}>
              <defs>
                <radialGradient id="sweep" cx="100%" cy="0%" r="100%">
                  <stop offset="0%" stopColor="#00ff88" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
                </radialGradient>
              </defs>
              {[90,60,30].map(r => (
                <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#00ff88" strokeWidth="1" opacity={r===30 ? 0.8 : 0.25}/>
              ))}
              <line x1="100" y1="10" x2="100" y2="190" stroke="#00ff88" strokeWidth="0.4" opacity="0.2"/>
              <line x1="10"  y1="100" x2="190" y2="100" stroke="#00ff88" strokeWidth="0.4" opacity="0.2"/>
              <g style={{ transformOrigin: '100px 100px', animation: 'sweep 4s linear infinite' }}>
                <path d="M100,100 L100,10 A90,90 0 0,1 163,55 Z" fill="url(#sweep)" opacity="0.35"/>
              </g>
              <circle cx="68"  cy="72"  r="3" fill="#00ff88" style={{ animation: 'blip 2s ease-in-out infinite' }}/>
              <circle cx="140" cy="130" r="2" fill="#ff6b6b" style={{ animation: 'blip 3s ease-in-out infinite 0.8s' }}/>
              <circle cx="115" cy="52"  r="2" fill="#f9ca24" style={{ animation: 'blip 2.5s ease-in-out infinite 1.5s' }}/>
            </svg>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#00ff88', marginBottom: '12px' }}>SYSTEMS</div>
            {[
              { label:'POWER',    color:'#00ff88', d:'0s'   },
              { label:'NETWORK',  color:'#00ff88', d:'0.3s' },
              { label:'TUNNEL',   color:'#00ff88', d:'0.6s' },
              { label:'AI CORE',  color:'#f9ca24', d:'0.9s' },
              { label:'MEDIA',    color:'#6c5ce7', d:'1.2s' },
              { label:'STREAM',   color:'#3ecfcf', d:'1.5s' },
              { label:'BOTANICA', color:'#4caf50', d:'1.8s' },
            ].map(s => (
              <div key={s.label} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'10px', color:'rgba(255,255,255,0.6)', marginBottom:'8px' }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:s.color, flexShrink:0, boxShadow:`0 0 6px ${s.color}`, animation:`pulse 2s infinite ${s.d}`, display:'inline-block' }}/>
                {s.label}
              </div>
            ))}
          </div>
        </aside>

        {/* COL 2 — MODULES */}
        <section>
          <div style={{ fontSize:'9px', letterSpacing:'3px', color:'#00ff88', marginBottom:'14px' }}>
            MODULES · {services.length} SYSTEMS ONLINE
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'12px' }}>
            {services.map(svc => (
              <div key={svc.id}
                onClick={() => {
                  if (svc.external) { window.open(svc.href, '_blank', 'noopener,noreferrer'); return }
                  if (svc.href !== '#') { window.location.href = svc.href }
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = svc.color
                  el.style.boxShadow   = `0 0 24px ${svc.color}40`
                  el.style.transform   = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                  el.style.boxShadow   = 'none'
                  el.style.transform   = 'translateY(0)'
                }}
                style={{
                  background:'rgba(0,0,0,0.55)', border:'1px solid rgba(255,255,255,0.08)',
                  borderRadius:'12px', padding:'18px', cursor: svc.href === '#' ? 'not-allowed' : 'pointer',
                  transition:'all 0.2s ease', position:'relative', backdropFilter:'blur(6px)'
                }}
              >
                <span style={{ position:'absolute', top:'4px',    left:'4px',   fontSize:'10px', color:svc.color, opacity:0.4 }}>⌐</span>
                <span style={{ position:'absolute', top:'4px',    right:'4px',  fontSize:'10px', color:svc.color, opacity:0.4, transform:'scaleX(-1)' }}>⌐</span>
                <span style={{ position:'absolute', bottom:'4px', left:'4px',   fontSize:'10px', color:svc.color, opacity:0.4, transform:'scaleY(-1)' }}>⌐</span>
                <span style={{ position:'absolute', bottom:'4px', right:'4px',  fontSize:'10px', color:svc.color, opacity:0.4, transform:'rotate(180deg)' }}>⌐</span>
                <span style={{ position:'absolute', top:'10px', right:'10px', width:7, height:7, borderRadius:'50%', background:svc.color, boxShadow:`0 0 8px ${svc.color}`, animation:'pulse 2.5s infinite', display:'inline-block' }}/>
                <div style={{ width:40, height:40, borderRadius:'10px', background:`${svc.color}22`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'12px' }}>
                  <svc.icon size={18} color={svc.color}/>
                </div>
                <div style={{ fontSize:'12px', fontWeight:'bold', color:'#e8e0ff', letterSpacing:'2px', marginBottom:'4px' }}>{svc.title}</div>
                <div style={{ fontSize:'9px', color:'rgba(200,184,255,0.45)', letterSpacing:'1px' }}>{svc.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* COL 3 — LOGS + OSC + VIDEO */}
        <aside style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <div style={{ background:'rgba(0,0,0,0.7)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:'14px', padding:'16px', flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'9px', letterSpacing:'3px', color:'#00ff88', marginBottom:'12px' }}>
              STATUS FEED
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#00ff88', animation:'pulse 1.5s infinite', display:'inline-block' }}/>
            </div>
            <div style={{ fontSize:'10px', fontFamily:'monospace', color:'rgba(0,255,136,0.7)', minHeight:'160px' }}>
              {logs.map((l, i) => (
                <div key={i} style={{ marginBottom:'6px', opacity: 0.35 + (i / logs.length) * 0.65 }}>
                  <span style={{ color:'rgba(0,255,136,0.35)' }}>[{l.t}] </span>{l.msg}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background:'rgba(0,10,4,0.9)', border:'1px solid rgba(0,255,136,0.35)', borderRadius:'12px', padding:'12px' }}>
            <div style={{ fontSize:'9px', letterSpacing:'3px', color:'#00ff88', marginBottom:'8px' }}>SIGNAL MONITOR</div>
            <canvas ref={canvasRef} width={280} height={80}
                    style={{ width:'100%', borderRadius:'6px', background:'rgba(0,0,0,0.5)', border:'1px solid rgba(0,255,136,0.15)', display:'block' }}/>
          </div>

          <a href={DAILY_VIDEO.url} target="_blank" rel="noopener noreferrer"
             onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.75'}
             onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
             style={{ display:'block', background:'rgba(123,92,240,0.08)', border:'1px solid rgba(123,92,240,0.35)', borderRadius:'12px', padding:'14px', textDecoration:'none', transition:'opacity 0.2s' }}>
            <div style={{ fontSize:'9px', letterSpacing:'3px', color:'#7b5cf0', marginBottom:'10px' }}>RECOMMANDATION · AGENT</div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ width:38, height:38, background:'rgba(123,92,240,0.25)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Play size={16} color="#7b5cf0"/>
              </div>
              <div>
                <div style={{ fontSize:'12px', fontWeight:'bold', color:'#e8e0ff', marginBottom:'3px' }}>{DAILY_VIDEO.title}</div>
                <div style={{ fontSize:'9px', color:'rgba(200,184,255,0.45)' }}>{DAILY_VIDEO.author} · ▶ PLAY</div>
              </div>
            </div>
          </a>
        </aside>
      </main>

      {/* FOOTER TICKER */}
      <footer style={{
        position:'relative', zIndex:10,
        padding:'10px 20px',
        borderTop:'1px solid rgba(0,255,136,0.15)',
        background:'rgba(0,0,0,0.85)',
        display:'flex', alignItems:'center', gap:'12px', overflow:'hidden'
      }}>
        <div style={{ display:'flex', gap:'6px', flexShrink:0 }}>
          {['#00ff88','#f9ca24','#ff6b6b'].map((c, i) => (
            <span key={i} style={{ width:9, height:9, borderRadius:'50%', background:c, boxShadow:`0 0 6px ${c}`, animation:`pulse 2s ${i*0.3}s infinite`, display:'inline-block' }}/>
          ))}
        </div>
        <div style={{ overflow:'hidden', flex:1 }}>
          <div style={{ fontSize:'10px', color:'rgba(0,255,136,0.5)', letterSpacing:'2px', whiteSpace:'nowrap', animation:'ticker 40s linear infinite' }}>
            STERENNA · ONLINE · CHRONICLES TCG · ALPHA · POKEFORGE · GANG WARS · LAB · EXPERIMENTS RUNNING · STEAM CLICKER · IN PROGRESS · BOTANICA · MUTATIONS ACTIVE · DRAW · READY · CYBERCHEF · ONLINE · LEME · AGENT READY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        @keyframes sweep   { to { transform: rotate(360deg); } }
        @keyframes blip    { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
        @keyframes pulse   { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes twinkle { 0%,100%{opacity:0.8;} 50%{opacity:0.1;} }
        @keyframes ticker  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  )
}
