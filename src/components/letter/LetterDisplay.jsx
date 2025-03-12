"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const occasionColors = {
  valentine: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  anniversary: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  birthday: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  proposal: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  apology: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  justbecause: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
};

const toneColors = {
  romantic: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  passionate: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300", 
  playful: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  sincere: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  poetic: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  funny: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
};

const getDisplayName = (key) => {
  const capitalizedFirstLetter = key.charAt(0).toUpperCase() + key.slice(1);
  if (key === 'justbecause') return 'Just Because';
  return capitalizedFirstLetter;
};

export function LetterDisplay({ letter }) {
  return (
    <Card className="w-full max-w-3xl mx-auto my-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-serif">
          A Letter for {letter.recipientName}
        </CardTitle>
        <div className="flex justify-center gap-2 mt-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${occasionColors[letter.occasion] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
            {getDisplayName(letter.occasion)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${toneColors[letter.tone] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
            {getDisplayName(letter.tone)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none font-serif">
          {letter.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button
          variant="outline"
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
          }}
        >
          Share this Letter
        </Button>
      </CardFooter>
    </Card>
  );
}