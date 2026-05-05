'use client'

import { useState } from 'react'
import { createClient } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState('CRÉER VOTRE IDENTITÉ GALACTIQUE')
  const [statusColor, setStatusColor] = useState('#3ecfcf')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister() {
    if (!email || !password) {
      setStatusColor('#ff4466')
      setStatus('DONNÉES MANQUANTES · MISSING DATA')
      return
    }
    if (password !== confirm) {
      setStatusColor('#ff4466')
      setStatus('CODES D\'ACCÈS NON CONCORDANTS · PASSWORDS MISMATCH')
      return
    }
    if (password.length < 8) {
      setStatusColor('#ff4466')
      setStatus('CODE TROP COURT · MIN 8 CARACTÈRES')
      return
    }
    setLoading(true)
    setStatus('ENREGISTREMENT EN COURS · REGISTERING...')
    setStatusColor('#7b5cf0')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: 'https://nitro.sterenna.fr/star' }
    })
    setLoading(false)
    if (error) {
      setStatusColor('#ff4466')
      setStatus('ERREUR · ' + error.message)
    } else {
      setStatusColor('#3ecfcf')
      setStatus('DOSSIER SOUMIS · CHECK YOUR EMAIL')
    }
  }

  const bars = Array.from({length: 20}, (_,i) => ({h: ((i*37+13)%14)+8}))

  return (
    <div style={{background:'#03050f',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px 20px',fontFamily:'monospace',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(100,60,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(100,60,255,0.07) 1px,transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none'}}/>
      
      <div style={{textAlign:'center',marginBottom:'32px',zIndex:2}}>
        <div style={{fontSize:'22px',fontWeight:700,color:'#c8b8ff',letterSpacing:'6px',textTransform:'uppercase'}}>Gwen ha Star</div>
        <div style={{fontSize:'11px',color:'#3ecfcf',letterSpacing:'3px',marginTop:'6px',textTransform:'uppercase'}}>Nouvelle demande d&apos;embarquement · New boarding request</div>
      </div>

      <div style={{position:'relative',width:'300px',zIndex:2}}>
        <div style={{background:'linear-gradient(135deg,#0d0b1e 0%,#0f0a2a 60%,#0a1628 100%)',border:'1px solid #7b5cf0',borderRadius:'12px',padding:'20px',position:'relative'}}>
          <div style={{position:'absolute',inset:0,borderRadius:'12px',overflow:'hidden',pointerEvents:'none'}}>
            <div style={{position:'absolute',left:0,right:0,top:'35%',height:'1px',background:'rgba(123,92,240,0.3)'}}/>
            <div style={{position:'absolute',left:0,right:0,top:'75%',height:'1px',background:'rgba(123,92,240,0.3)'}}/>
            <div style={{position:'absolute',top:0,bottom:0,left:'72%',width:'1px',background:'rgba(62,207,207,0.2)'}}/>
          </div>
          {[['8px','8px','2px 0 0 2px'],['8px','auto','2px 2px 0 0'],['auto','8px','0 0 2px 2px'],['auto','auto','0 2px 2px 0']].map(([t,l,bw],i)=>(
            <div key={i} style={{position:'absolute',width:'16px',height:'16px',top:t==='auto'?undefined:'8px',bottom:t==='auto'?'8px':undefined,left:l==='auto'?undefined:'8px',right:l==='auto'?'8px':undefined,borderColor:'#3ecfcf',borderStyle:'solid',borderWidth:bw,opacity:0.6}}/>
          ))}
          
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}>
            <div>
              <div style={{fontSize:'8px',color:'#7b5cf0',letterSpacing:'2px',textTransform:'uppercase'}}>C.I.G. · Nouvelle recrue</div>
              <div style={{fontSize:'9px',color:'#3ecfcf',letterSpacing:'1px',marginTop:'2px'}}>BZH-PW · SECTOR-7</div>
            </div>
            <div style={{width:'24px',height:'18px',background:'linear-gradient(135deg,#7b5cf0,#3ecfcf)',borderRadius:'3px',opacity:0.8}}/>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
              <label style={{fontSize:'8px',color:'#7b5cf0',letterSpacing:'2px',textTransform:'uppercase'}}>Identifiant · Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="agent@bzhpw.gal"
                style={{background:'rgba(123,92,240,0.1)',border:'1px solid rgba(123,92,240,0.4)',borderRadius:'4px',padding:'6px 8px',fontSize:'11px',color:'#c8b8ff',outline:'none',fontFamily:'monospace',width:'100%'}}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
              <label style={{fontSize:'8px',color:'#7b5cf0',letterSpacing:'2px',textTransform:'uppercase'}}>Code d&apos;accès · Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="••••••••"
                style={{background:'rgba(123,92,240,0.1)',border:'1px solid rgba(123,92,240,0.4)',borderRadius:'4px',padding:'6px 8px',fontSize:'11px',color:'#c8b8ff',outline:'none',fontFamily:'monospace',width:'100%'}}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
              <label style={{fontSize:'8px',color:'#7b5cf0',letterSpacing:'2px',textTransform:'uppercase'}}>Confirmer · Confirm</label>
              <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e=>e.key==='Enter'&&handleRegister()}
                style={{background:'rgba(123,92,240,0.1)',border:'1px solid rgba(123,92,240,0.4)',borderRadius:'4px',padding:'6px 8px',fontSize:'11px',color:'#c8b8ff',outline:'none',fontFamily:'monospace',width:'100%'}}/>
            </div>
          </div>

          <div style={{marginTop:'12px',display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
            <div style={{display:'flex',gap:'2px',alignItems:'flex-end',height:'20px'}}>
              {bars.map((b,i)=><div key={i} style={{width:'2px',height:b.h+'px',background:'#3ecfcf',opacity:0.7}}/>)}
            </div>
            <div style={{fontSize:'8px',color:'rgba(62,207,207,0.5)',letterSpacing:'1px'}}>CLASS-RECRUE</div>
          </div>
        </div>

        <button onClick={handleRegister} disabled={loading}
          style={{width:'100%',marginTop:'16px',padding:'12px',background:'rgba(123,92,240,0.15)',border:'1px solid #7b5cf0',borderRadius:'10px',color:'#c8b8ff',fontSize:'10px',letterSpacing:'3px',cursor:'pointer',fontFamily:'monospace',textTransform:'uppercase',transition:'background 0.2s'}}>
          {loading ? 'TRAITEMENT...' : 'SOUMETTRE DOSSIER · SUBMIT'}
        </button>

        <div style={{textAlign:'center',marginTop:'12px'}}>
          <button onClick={()=>router.push('/login')} style={{background:'transparent',border:'none',color:'rgba(62,207,207,0.5)',fontSize:'9px',letterSpacing:'2px',cursor:'pointer',fontFamily:'monospace',textTransform:'uppercase'}}>
            Déjà agent ? · Already aboard? → LOGIN
          </button>
        </div>
      </div>

      <div style={{marginTop:'32px',fontSize:'10px',color:statusColor,letterSpacing:'3px',textAlign:'center',zIndex:2,transition:'color 0.3s',textTransform:'uppercase'}}>{status}</div>
      <style>{`input::placeholder{color:rgba(200,184,255,0.3);font-size:10px}`}</style>
    </div>
  )
}
