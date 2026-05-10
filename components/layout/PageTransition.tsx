'use client';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const SLASH_DUR = 0.22;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.18, delay: SLASH_DUR + 0.05 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Katana slash — thin crimson line sweeps L→R on route change */}
      <AnimatePresence>
        <motion.div
          key={pathname + '-slash'}
          initial={{ scaleX: 0, originX: '0%' }}
          animate={{
            scaleX: [0, 1, 1, 0],
            originX: ['0%', '0%', '100%', '100%'],
            transition: { duration: SLASH_DUR * 2, times: [0, 0.45, 0.55, 1], ease: 'easeInOut' },
          }}
          style={{
            position: 'fixed',
            top: '50%',
            left: 0,
            width: '100%',
            height: '2px',
            background: '#DC143C',
            zIndex: 9999,
            pointerEvents: 'none',
            boxShadow: '0 0 8px rgba(220,20,60,0.8)',
          }}
        />
      </AnimatePresence>
    </>
  );
}
