'use client';
import { useState } from 'react';

export default function NotifyMe() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div style={{
        padding: '14px 16px', background: '#0a0a0a',
        display: 'flex', justifyContent: 'center',
      }}>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: '8px',
          letterSpacing: '0.15em', textTransform: 'uppercase', color: '#DC143C',
        }}>
          TRANSMISSION RECEIVED
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{
      display: 'flex', background: '#0a0a0a', padding: '0',
    }}>
      <input
        type="email"
        required
        placeholder="ENTER_EMAIL"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{
          flex: 1, background: 'transparent',
          border: '1px solid rgba(240,237,230,0.15)', borderRight: 'none',
          padding: '10px 10px', color: '#f0ede6',
          fontFamily: "'Space Mono', monospace", fontSize: '8px',
          letterSpacing: '0.1em', outline: 'none', minWidth: 0,
        }}
      />
      <button type="submit" style={{
        background: '#c0001e', color: '#f0ede6', border: 'none',
        padding: '10px 14px', fontFamily: "'Space Mono', monospace",
        fontSize: '8px', letterSpacing: '0.15em', textTransform: 'uppercase',
        cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
      }}>
        NOTIFY_ME
      </button>
    </form>
  );
}
