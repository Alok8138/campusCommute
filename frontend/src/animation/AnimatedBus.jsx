// // AnimatedBus.jsx (inline or separate file)
// import { motion, useReducedMotion } from 'framer-motion';

// export function AnimatedBus({ active = true }) {
//   const prefersReduced = useReducedMotion();
//   if (prefersReduced) {
//     return (
//       <div className="pointer-events-none absolute bottom-10 left-6 opacity-70">
//         <BusSVG />
//       </div>
//     );
//   }
//   return (
//     <motion.div
//       className="pointer-events-none absolute bottom-10 left-0 right-0 mx-auto max-w-[720px] opacity-80"
//       initial={{ x: '-60%', y: 0 }}
//       animate={
//         active
//           ? {
//               x: ['-60%', '60%'],
//               y: [0, -4, 0],
//               transition: {
//                 x: { duration: 10, repeat: Infinity, ease: 'linear' },
//                 y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
//               }
//             }
//           : { x: '-60%', y: 0 }
//       }
//     >
//       <BusSVG />
//     </motion.div>
//   );
// }

// function BusSVG() {
//   return (
//     <svg width="140" height="44" viewBox="0 0 140 44" fill="none">
//       <rect x="6" y="8" width="120" height="24" rx="6" fill="#111827" />
//       <rect x="16" y="12" width="52" height="8" rx="2" fill="#9CA3AF" />
//       <rect x="72" y="12" width="44" height="8" rx="2" fill="#9CA3AF" />
//       <rect x="16" y="22" width="20" height="6" rx="2" fill="#F59E0B" />
//       <rect x="40" y="22" width="36" height="6" rx="2" fill="#10B981" />
//       <circle cx="34" cy="36" r="6" fill="#111827" />
//       <circle cx="34" cy="36" r="3" fill="#D1D5DB" />
//       <circle cx="98" cy="36" r="6" fill="#111827" />
//       <circle cx="98" cy="36" r="3" fill="#D1D5DB" />
//       <rect x="126" y="14" width="8" height="10" rx="2" fill="#EF4444" />
//     </svg>
//   );
// }
