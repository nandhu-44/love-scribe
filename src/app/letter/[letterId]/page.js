import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Letter from "@/lib/models/Letter";
import { LetterDisplay } from "@/components/letter/LetterDisplay";

export const dynamic = 'force-dynamic';

async function fetchLetter(letterId) {
  if (!letterId) {
    return null;
  }

  try {
    await connectToDatabase();
    
    const letter = await Letter.findOne({ letterId }).lean();
    
    if (!letter) {
      return null;
    }
    
    const cleanLetter = {
      ...letter,
      _id: letter._id.toString(),
      createdAt: letter.createdAt.toISOString()
    };
    
    return cleanLetter;
  } catch (error) {
    console.error("Error fetching letter:", error);
    throw error;
  }
}

export default async function LetterPage({ params }) {
  const { letterId } = params;
  
  if (!letterId) {
    notFound();
  }

  try {
    const letter = await fetchLetter(letterId);
    
    if (!letter) {
      notFound();
    }
    
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
        <div className="max-w-4xl mx-auto pt-6 pb-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400">Your LoveScribe Letter</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Share this page with someone special
            </p>
          </div>
          
          <LetterDisplay letter={letter} />
          
          <div className="mt-10 text-center">
            <a 
              href="/"
              className="text-pink-600 dark:text-pink-400 hover:underline"
            >
              Create another love letter with LoveScribe
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Let Next.js error boundary handle database connection errors
    throw error;
  }
}