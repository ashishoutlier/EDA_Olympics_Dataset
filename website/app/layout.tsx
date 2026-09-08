import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {"title": "The Olympic Record | Ashish", "description": "Explore 70,000 athlete event records by season, sport and Olympic committee."};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
