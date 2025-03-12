import Image from "next/image";
import { LetterForm } from "@/components/letter/LetterForm";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <div className="max-w-4xl mx-auto pt-10 pb-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">LoveScribe</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create a beautiful, AI-generated love letter for someone special
          </p>
        </div>
        <LetterForm />
      </div>
    </div>
  );
}
