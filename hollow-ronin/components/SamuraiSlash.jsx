'use client'

import { useEffect, useRef, useCallback } from 'react'

const DURATION = 520

function createSlash(x, y) {
  const dir = Math.random() > 0.5 ? 1 : -1
  const angle = dir * (35 + Math.random() * 25)
  const len = 90 + Math.random() * 90
  const sparks = Array.from({ length: 10 }, () => ({
    vx: (Math.random() - 0.5) * 7,
    vy: (Math.random() - 0.5) * 7 - 1.5,
    life: 0.5 + Math.random() * 0.5,
  }))
  return { x, y, angle, len, sparks, born: performance.now() }
}

export default function SamuraiSlash() {
  const canvasRef = useRef(null)
  const slashesRef = useRef([])
  const rafRef = useRef(null)
  const activeRef = useRef(false)

  const loop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const now = performance.now()

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    slashesRef.current = slashesRef.current.filter((s) => {
      const t = (now - s.born) / DURATION
      if (t >= 1) return false

      const appear = Math.min(t / 0.1, 1)
      const fade = Math.max(0, 1 - Math.pow((t - 0.08) / 0.92, 0.6))
      const alpha = appear * fade

      const rad = (s.angle * Math.PI) / 180
      const cx = Math.cos(rad)
      const cy = Math.sin(rad)
      const half = (s.len / 2) * appear

      const x1 = s.x - cx * half
      const y1 = s.y - cy * half
      const x2 = s.x + cx * half
      const y2 = s.y + cy * half

      ctx.save()
      ctx.lineCap = 'round'

      // Outer crimson glow — wide, soft
      ctx.globalAlpha = alpha * 0.45
      ctx.strokeStyle = '#9b0000'
      ctx.lineWidth = 10
      ctx.shadowColor = '#ff1a1a'
      ctx.shadowBlur = 30
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()

      // Mid red layer
      ctx.globalAlpha = alpha * 0.7
      ctx.strokeStyle = '#dd2222'
      ctx.lineWidth = 3.5
      ctx.shadowColor = '#ff3030'
      ctx.shadowBlur = 14
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()

      // White-hot core — the blade edge
      ctx.globalAlpha = alpha * 0.95
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1.2
      ctx.shadowColor = '#fff'
      ctx.shadowBlur = 5
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()

      // Impact flash at click point
      if (t < 0.18) {
        const flash = 1 - t / 0.18
        ctx.globalAlpha = flash * 0.85
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = '#ff3333'
        ctx.shadowBlur = 50
        ctx.beginPath()
        ctx.arc(s.x, s.y, 6 * flash, 0, Math.PI * 2)
        ctx.fill()
      }

      // Sparks
      s.sparks.forEach((sp) => {
        if (t > sp.life) return
        const st = t / sp.life
        const sx = s.x + sp.vx * t * 50
        const sy = s.y + sp.vy * t * 50
        const sparkAlpha = alpha * (1 - st) * 0.85
        ctx.globalAlpha = sparkAlpha
        ctx.fillStyle = t < 0.15 ? '#ffffff' : '#ff4444'
        ctx.shadowColor = '#ff2020'
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(sx, sy, 1.8 * (1 - st * 0.7), 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
      return true
    })

    if (slashesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(loop)
    } else {
      activeRef.current = false
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onClick = (e) => {
      slashesRef.current.push(createSlash(e.clientX, e.clientY))
      if (!activeRef.current) {
        activeRef.current = true
        rafRef.current = requestAnimationFrame(loop)
      }
    }
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(rafRef.current)
    }
  }, [loop])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}
