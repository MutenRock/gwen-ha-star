'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createClient } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

const SLOT_Y = 190

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('SAISIR LES INFORMATIONS D\'IDENTIFICATION')
  const [statusColor, setStatusColor] = useState('#3ecfcf')
  const [cardY, setCardY] = useState(0)
  const [tiltX, setTiltX] = useState(0)
  const [cardId, setCardId] = useState('BZH-????-????')
  const [scanning, setScanning] = useState(false)
  const [dragging, setDragging] = useState(false)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const resetCard = useCallback(() => {
    setDragging(false)
    setCardY(0)
    setTiltX(0)
    setStatus('SAISIR LES INFORMATIONS D\'IDENTIFICATION')
    setStatusColor('#3ecfcf')
  }, [])

  const triggerScan = useCallback(async () => {
    if (!email || !password) {
      setStatusColor('#ff4466')
      setStatus('DONNÉES MANQUANTES · MISSING DATA')
      setTimeout(resetCard, 1500)
      return
    }
    setCardY(SLOT_Y)
    setScanning(true)
    setStatus('SCAN EN COURS · SCANNING...')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setScanning(false)
    if (error) {
      setStatusColor('#ff4466')
      setStatus('ACCÈS REFUSÉ · ACCESS DENIED')
      setTimeout(resetCard, 1500)
    } else {
      setStatusColor('#7b5cf0')
      setStatus('ACCÈS ACCORDÉ · ACCESS GRANTED')
      setTimeout(() => router.push('/'), 1000)
    }
  }, [email, password, resetCard, router, supabase])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const raw = e.clientY - startY.current
      const clamped = Math.max(-20, Math.min(raw, SLOT_Y))
      const progress = Math.max(0, clamped / SLOT_Y)
      setCardY(clamped)
      setTiltX(progress * 180)
      if (progress > 0.7) setStatus('INSERTION EN COURS · INSERTING...')
      else if (progress > 0.3) setStatus('APPROCHE DU LECTEUR · APPROACHING READER')
    }
    const onMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      setDragging(false)
      const el = document.getElementById('card-wrapper')
      const raw = parseInt(el?.style.top || '0')
      if (raw / SLOT_Y > 0.85) triggerScan()
      else resetCard()
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [resetCard, triggerScan])

  function onMouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLElement).tagName === 'INPUT') return
    isDragging.current = true
    setDragging(true)
    startY.current = e.clientY - cardY
    e.preventDefault()
  }

  function handleEmailChange(v: string) {
    setEmail(v)
    if (v.length > 3) {
      const hash = v.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
      setCardId('BZH-' + String(hash).padStart(4,'0').slice(-4) + '-' + String(hash*7).padStart(4,'0').slice(-4))
    } else setCardId('BZH-????-????')
  }

  const bars = Array.from({length: 20}, (_,i) => ({h: ((i*37+13)%14)+8}))

  return (
    <div style={{background:'#03050f',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px 20px',fontFamily:'monospace',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(100,60,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(100,60,255,0.07) 1px,transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none'}}/>
      <div style={{textAlign:'center',marginBottom:'32px',zIndex:2}}>
        <div style={{fontSize:'22px',fontWeight:700,color:'#c8b8ff',letterSpacing:'6px',textTransform:'uppercase'}}>Gwen ha Star</div>
        <div style={{fontSize:'11px',color:'#3ecfcf',letterSpacing:'3px',marginTop:'6px',textTransform:'uppercase'}}>Système d&apos;identification galactique · BZH-PW</div>
      </div>
      <div style={{position:'relative',width:'340px',height:'220px',zIndex:2}}>
        <div id="card-wrapper" onMouseDown={onMouseDown} style={{position:'absolute',top:cardY+'px',left:'50%',transform:'translateX(-50%)',width:'280px',height:'168px',perspective:'800px',cursor:'grab',userSelect:'none'}}>
          <div style={{width:'100%',height:'100%',position:'relative',transformStyle:'preserve-3d',transform:`rotateX(${tiltX}deg)`,transition:dragging?'none':'transform 0.4s ease'}}>
            <div style={{position:'absolute',inset:0,borderRadius:'12px',border:'1px solid #7b5cf0',background:'linear-gradient(135deg,#0d0b1e 0%,#0f0a2a 60%,#0a1628 100%)',padding:'14px',backfaceVisibility:'hidden'}}>
              <div style={{position:'absolute',inset:0,borderRadius:'12px',overflow:'hidden',pointerEvents:'none'}}>
                <div style={{position:'absolute',left:0,right:0,top:'40%',height:'1px',background:'rgba(123,92,240,0.3)'}}/>
                <div style={{position:'absolute',left:0,right:0,top:'75%',height:'1px',background:'rgba(123,92,240,0.3)'}}/>
                <div style={{position:'absolute',top:0,bottom:0,left:'70%',width:'1px',background:'rgba(62,207,207,0.2)'}}/>
              </div>
              {[['8px','8px','2px 0 0 2px'],['8px','auto','2px 2px 0 0'],['auto','8px','0 0 2px 2px'],['auto','auto','0 2px 2px 0']].map(([t,l,bw],i)=>(
                <div key={i} style={{position:'absolute',width:'16px',height:'16px',top:t==='auto'?undefined:'8px',bottom:t==='auto'?'8px':undefined,left:l==='auto'?undefined:'8px',right:l==='auto'?'8px':undefined,borderColor:'#3ecfcf',borderStyle:'solid',borderWidth:bw,opacity:0.6}}/>
              ))}
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                <div>
                  <div style={{fontSize:'8px',color:'#7b5cf0',letterSpacing:'2px',textTransform:'uppercase'}}>C.I.G. · Carte d&apos;identification galactique</div>
                  <div style={{fontSize:'9px',color:'#3ecfcf',letterSpacing:'1px',marginTop:'2px'}}>ID: {cardId}</div>
                </div>
                <div style={{width:'24px',height:'18px',background:'linear-gradient(135deg,#7b5cf0,#3ecfcf)',borderRadius:'3px',opacity:0.8}}/>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
                  <label style={{fontSize:'8px',color:'#7b5cf0',letterSpacing:'2px',textTransform:'uppercase'}}>Identifiant · Identifier</label>
                  <input type="email" value={email} onChange={e=>handleEmailChange(e.target.value)} placeholder="agent@bzhpw.gal" style={{background:'rgba(123,92,240,0.1)',border:'1px solid rgba(123,92,240,0.4)',borderRadius:'4px',padding:'5px 8px',fontSize:'11px',color:'#c8b8ff',outline:'none',fontFamily:'monospace',width:'100%'}}/>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
                  <label style={{fontSize:'8px',color:'#7b5cf0',letterSpacing:'2px',textTransform:'uppercase'}}>Code d&apos;accès · Access code</label>
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{background:'rgba(123,92,240,0.1)',border:'1px solid rgba(123,92,240,0.4)',borderRadius:'4px',padding:'5px 8px',fontSize:'11px',color:'#c8b8ff',outline:'none',fontFamily:'monospace',width:'100%'}}/>
                </div>
              </div>
              <div style={{marginTop:'8px',display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
                <div style={{display:'flex',gap:'2px',alignItems:'flex-end',height:'24px'}}>
                  {bars.map((b,i)=><div key={i} style={{width:'2px',height:b.h+'px',background:'#3ecfcf',opacity:0.7}}/>)}
                </div>
                <div style={{fontSize:'8px',color:'rgba(62,207,207,0.5)',letterSpacing:'1px'}}>SECTOR-7 · CLASS-A</div>
              </div>
            </div>
            <div style={{position:'absolute',inset:0,borderRadius:'12px',background:'#050312',transform:'rotateX(180deg)',backfaceVisibility:'hidden',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'8px'}}>
              <div style={{fontSize:'9px',color:'#3ecfcf',letterSpacing:'3px'}}>SCANNING...</div>
              <div style={{width:'80%',height:'2px',background:'rgba(62,207,207,0.4)',overflow:'hidden',borderRadius:'1px'}}>
                <div style={{width:'100%',height:'100%',background:'#3ecfcf'}}/>
              </div>
            </div>
          </div>
        </div>
        <div style={{position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',width:'200px',height:'8px',background:'#0a0a1a',border:'1px solid #3ecfcf',borderRadius:'2px',boxShadow:'0 0 12px rgba(62,207,207,0.4)'}}>
          {scanning && <div style={{position:'absolute',bottom:0,left:0,right:0,height:'2px',background:'#3ecfcf',boxShadow:'0 0 10px #3ecfcf'}}/>}
        </div>
        <div style={{position:'absolute',bottom:'-22px',left:'50%',transform:'translateX(-50%)',fontSize:'10px',color:'#3ecfcf',letterSpacing:'2px',whiteSpace:'nowrap'}}>[ INSÉRER LA CARTE · INSERT CARD ]</div>
      </div>
      <div style={{marginTop:'48px',fontSize:'10px',color:statusColor,letterSpacing:'3px',textAlign:'center',zIndex:2,minHeight:'16px',textTransform:'uppercase',transition:'color 0.3s'}}>{status}</div>
      <div style={{marginTop:'8px',fontSize:'9px',color:'rgba(62,207,207,0.4)',letterSpacing:'2px',textAlign:'center',zIndex:2,textTransform:'uppercase'}}>Glisser la carte vers la fente · Drag card to slot</div>
      <button onClick={()=>router.push('/register')} style={{marginTop:'16px',background:'transparent',border:'none',color:'rgba(62,207,207,0.4)',fontSize:'9px',letterSpacing:'2px',cursor:'pointer',fontFamily:'monospace',textTransform:'uppercase',zIndex:2}}>Pas encore agent ? · New recruit → S&apos;ENREGISTRER</button>
      <style>{`input::placeholder{color:rgba(200,184,255,0.3);font-size:10px}`}</style>
    </div>
  )
}
