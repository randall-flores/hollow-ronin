'use client'
import { useEffect, useRef } from 'react'

const BLADE = "M 62,252 C 92,168 134,78 158,12 C 118,92 78,174 62,252 Z"
const SPINE = "M 62,252 C 92,168 134,78 158,12"
const TIP   = [158, 12]

const EMBERS = [
  { r: 2.5, fill: '#ff2200', anim: 'hrEmber0' },
  { r: 2.0, fill: '#ffffff', anim: 'hrEmber1' },
  { r: 3.0, fill: '#ff4400', anim: 'hrEmber2' },
  { r: 1.8, fill: '#ffffff', anim: 'hrEmber3' },
  { r: 2.2, fill: '#ff1100', anim: 'hrEmber4' },
  { r: 1.5, fill: '#ffaa00', anim: 'hrEmber5' },
]

export default function SlashCursor() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    const handleClick = (e) => {
      const rot = (Math.random() * 55 - 27).toFixed(1)
      const ox  = e.clientX - 110
      const oy  = e.clientY - 163

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.style.cssText = `
        transform: translate(${ox}px,${oy}px) rotate(${rot}deg);
        transform-origin: 110px 163px;
        animation: hrBladeFade .85s ease-out forwards;
      `

      g.innerHTML = `
        <path d="${BLADE}" fill="#aa0000" opacity=".28" filter="url(#hr-f-outer)"
          style="animation:hrBladeIn .05s ease-out forwards"/>
        <path d="${BLADE}" fill="#dd1100" opacity=".55" filter="url(#hr-f-mid)"
          style="animation:hrBladeIn .07s ease-out forwards"/>
        <path d="${BLADE}" fill="#ff2200" opacity=".75"
          style="animation:hrBladeIn .07s ease-out forwards"/>
        <path d="${BLADE}" fill="#ff6633" opacity=".4" filter="url(#hr-f-core)"
          style="animation:hrBladeIn .07s ease-out forwards"/>
        <path d="${SPINE}" pathLength="1"
          stroke="#ff3300" stroke-width="5" fill="none" stroke-linecap="round"
          filter="url(#hr-f-mid)" opacity=".6"
          style="stroke-dasharray:1;stroke-dashoffset:1;animation:hrSpineDraw .11s ease-out forwards"/>
        <path d="${SPINE}" pathLength="1"
          stroke="#ffffff" stroke-width="1.4" fill="none" stroke-linecap="round"
          filter="url(#hr-f-core)" opacity=".95"
          style="stroke-dasharray:1;stroke-dashoffset:1;animation:hrSpineDraw .11s ease-out forwards"/>
        <circle cx="${TIP[0]}" cy="${TIP[1]}" r="9" fill="#ff2200" opacity=".7"
          filter="url(#hr-f-tip)"
          style="animation:hrTipFlare .5s ease-out forwards .07s;transform-origin:${TIP[0]}px ${TIP[1]}px;opacity:0"/>
        <circle cx="${TIP[0]}" cy="${TIP[1]}" r="4" fill="white" opacity=".9"
          filter="url(#hr-f-core)"
          style="animation:hrTipFlare .4s ease-out forwards .07s;transform-origin:${TIP[0]}px ${TIP[1]}px;opacity:0"/>
        ${EMBERS.map((em, i) => `
          <circle cx="${TIP[0]}" cy="${TIP[1]}" r="${em.r}" fill="${em.fill}"
            style="animation:${em.anim} ${.4+i*.04}s ease-out forwards ${.06+i*.02}s;
                   opacity:0;transform-origin:${TIP[0]}px ${TIP[1]}px"/>
        `).join('')}
      `

      layer.appendChild(g)
      setTimeout(() => g.remove(), 950)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <style>{`
        @keyframes hrBladeIn   { from{opacity:0} to{opacity:1} }
        @keyframes hrBladeFade { 0%{opacity:1} 55%{opacity:.85} 100%{opacity:0} }
        @keyframes hrSpineDraw { from{stroke-dashoffset:1} to{stroke-dashoffset:0} }
        @keyframes hrTipFlare  { 0%{opacity:0;transform:scale(0)} 25%{opacity:1;transform:scale(1.4)} 100%{opacity:0;transform:scale(.6)} }
        @keyframes hrEmber0    { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(-20px,-30px) scale(0)} }
        @keyframes hrEmber1    { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(16px,-38px) scale(0)} }
        @keyframes hrEmber2    { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(-10px,-45px) scale(0)} }
        @keyframes hrEmber3    { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(26px,-22px) scale(0)} }
        @keyframes hrEmber4    { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(-28px,-18px) scale(0)} }
        @keyframes hrEmber5    { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(8px,-52px) scale(0)} }
      `}</style>

      <svg
        ref={layerRef}
        style={{ position:'fixed', inset:0, width:'100vw', height:'100vh', pointerEvents:'none', zIndex:9999, overflow:'visible' }}
      >
        <defs>
          <filter id="hr-f-outer" x="-200%" y="-100%" width="500%" height="300%">
            <feGaussianBlur stdDeviation="11"/>
          </filter>
          <filter id="hr-f-mid" x="-100%" y="-60%" width="300%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="hr-f-core" x="-50%" y="-30%" width="200%" height="160%">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="hr-f-tip" x="-200%" y="-200%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="7" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
      </svg>
    </>
  )
}
