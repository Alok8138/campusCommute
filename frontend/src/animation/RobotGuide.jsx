// // RobotGuide.jsx (inline or separate file)
// import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
// import { useEffect } from 'react';

// export function RobotGuide({ attachToSelector }) {
//   const prefersReduced = useReducedMotion();
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);
//   const sx = useSpring(mx, { stiffness: 120, damping: 14 });
//   const sy = useSpring(my, { stiffness: 120, damping: 14 });

//   useEffect(() => {
//     const input = document.querySelector(attachToSelector);
//     if (!input || prefersReduced) return;

//     const onMove = (e) => {
//       const rect = input.getBoundingClientRect();
//       const cx = rect.left + rect.width / 2;
//       const cy = rect.top + rect.height / 2;
//       const dx = Math.max(-40, Math.min(40, e.clientX - cx));
//       const dy = Math.max(-20, Math.min(20, e.clientY - cy));
//       mx.set(dx / 40); // -1..1
//       my.set(dy / 20);
//     };
//     window.addEventListener('pointermove', onMove);
//     return () => window.removeEventListener('pointermove', onMove);
//   }, [attachToSelector, prefersReduced, mx, my]);

//   const eyeX = useTransform(sx, (v) => v * 6);
//   const eyeY = useTransform(sy, (v) => v * 4);

//   return (
//     <motion.div
//       className="pointer-events-none absolute -right-14 -top-10 md:-right-16 md:-top-12"
//       initial={{ opacity: 0, y: -8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <RobotSVG eyeX={prefersReduced ? 0 : eyeX} eyeY={prefersReduced ? 0 : eyeY} />
//     </motion.div>
//   );
// }

// function RobotSVG({ eyeX = 0, eyeY = 0 }) {
//   return (
//     <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
//       <defs>
//         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
//           <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
//         </filter>
//       </defs>
//       <g filter="url(#shadow)">
//         <rect x="15" y="18" width="60" height="50" rx="12" fill="#111827" />
//         <rect x="28" y="12" width="34" height="8" rx="4" fill="#4F46E5" />
//         <circle cx="33" cy="42" r="12" fill="#1F2937" />
//         <circle cx="57" cy="42" r="12" fill="#1F2937" />
//         <motion.circle cx="33" cy="42" r="5" fill="#A7F3D0" style={{ x: eyeX, y: eyeY }} />
//         <motion.circle cx="57" cy="42" r="5" fill="#A7F3D0" style={{ x: eyeX, y: eyeY }} />
//         <rect x="36" y="58" width="18" height="4" rx="2" fill="#9CA3AF" />
//         <motion.path
//           d="M75 40 C85 36, 85 48, 75 44"
//           stroke="#F59E0B"
//           strokeWidth="3"
//           strokeLinecap="round"
//           initial={{ pathLength: 0, opacity: 0 }}
//           animate={{ pathLength: 1, opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.4, ease: [0.22,1,0.36,1], repeat: Infinity, repeatDelay: 1.8 }}
//         />
//       </g>
//     </svg>
//   );
// }
