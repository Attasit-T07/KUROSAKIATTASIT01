import type { ReactNode } from 'react';
import './style.css';
export const metadata = { title: 'Smart Maintenance V1 — Simulation', description: 'Local-only simulated FX5U machine dashboard' };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="th"><body>{children}</body></html> }
