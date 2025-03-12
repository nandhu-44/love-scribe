import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "LoveScribe | Express Your Feelings",
  description: "Create beautiful, personalized AI-generated love letters for someone special in your life.",
  keywords: "love letter, AI love letter, personalized letter, romantic letter generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/lovescribe.svg" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <header className="py-4 px-6 bg-pink-200 dark:bg-gray-900 shadow-sm backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-pink-600 dark:text-pink-400">
              <Image src="/lovescribe.svg" alt="LoveScribe Logo" width={28} height={28} className="my-auto" />
              <span>LoveScribe</span>
            </Link>
            <nav>
              <Link 
                href="/" 
                className="text-sm font-semibold text-gray-700 hover:text-pink-600 dark:text-gray-200 dark:hover:text-pink-400"
              >
                Create a Letter
              </Link>
            </nav>
          </div>
        </header>
        
        <main>
          {children}
        </main>
        
        <footer className="py-6 px-6 bg-pink-200 dark:bg-gray-900/90 border-t border-pink-200/20 dark:border-gray-800/50">
          <div className="max-w-4xl mx-auto text-center text-sm text-gray-600 dark:text-gray-300 font-medium">
            <div className="flex justify-center mb-4">
              <Image src="/lovescribe.svg" alt="LoveScribe Logo" width={40} height={40} />
            </div>
            <p>Created with ❤️ for those who want to express their feelings</p>
            <p className="mt-2">© {new Date().getFullYear()} LoveScribe</p>
          </div>
        </footer>
        
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
