import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <div className="max-w-md text-center">
        <div className="relative mx-auto w-24 h-24 mb-6">
          <Heart className="absolute inset-0 text-pink-400 opacity-30 animate-pulse" size={96} />
          <Heart className="absolute inset-0 text-pink-600 opacity-50" size={80} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">Letter Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The love letter you're looking for doesn't seem to exist or may have been removed.
        </p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2">
            Create a New Letter with LoveScribe
          </Button>
        </Link>
      </div>
    </div>
  );
}