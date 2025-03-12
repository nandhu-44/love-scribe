import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartCrack } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] p-8 bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <div className="max-w-md text-center px-12">
        <HeartCrack className="mx-auto h-24 w-24 text-pink-400 mb-6" />
        <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">Love Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          The page you're looking for seems to have disappeared like an unrequited love.
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Don't worry though, there are plenty more pages in the sea.
        </p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transition-all px-6 py-2 shadow-md hover:shadow-lg">
            Return to LoveScribe
          </Button>
        </Link>
      </div>
    </div>
  );
}