"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export function LetterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: "",
    senderName: "",
    occasion: "",
    tone: "",
    additionalDetails: "",
  });
  const [fallbackLetter, setFallbackLetter] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFallbackLetter(null);

    try {
      const response = await fetch("/api/generate-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push(`/letter/${data.letterId}`);
      } else if (data.fallback && data.content) {
        setFallbackLetter({
          ...formData,
          content: data.content,
          createdAt: new Date()
        });
        setIsLoading(false);
      } else {
        toast.error(data.error || "Failed to generate letter");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (fallbackLetter) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-serif">
            A Letter for {fallbackLetter.recipientName}
          </CardTitle>
          <div className="text-center text-muted-foreground">
            Occasion: {fallbackLetter.occasion} | Tone: {fallbackLetter.tone}
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md text-yellow-800 dark:text-yellow-200 text-sm mt-4">
            Note: This letter couldn't be saved to our database due to a connection issue, but we've displayed it here for you.
            You may want to copy and save this letter as it won't be accessible via a shareable link.
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none font-serif">
            {fallbackLetter.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 text-right font-serif">
            <p className="italic">With love,</p>
            <p className="font-medium">{fallbackLetter.senderName}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 border-t pt-4">
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(fallbackLetter.content);
              toast.success("Letter content copied to clipboard!");
            }}
          >
            Copy to Clipboard
          </Button>
          <Button 
            onClick={() => {
              setFallbackLetter(null);
              setIsLoading(false);
            }}
          >
            Create New Letter
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create Your Love Letter</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient's Name</Label>
            <Input
              id="recipientName"
              name="recipientName"
              placeholder="Who is this letter for?"
              value={formData.recipientName}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senderName">Your Name</Label>
            <Input
              id="senderName"
              name="senderName"
              placeholder="Your name"
              value={formData.senderName}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Select
              name="occasion"
              onValueChange={(value) => handleSelectChange("occasion", value)}
              required
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="valentine">Valentine's Day</SelectItem>
                <SelectItem value="anniversary">Anniversary</SelectItem>
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="apology">Apology</SelectItem>
                <SelectItem value="justbecause">Just Because</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone of the Letter</Label>
            <Select
              name="tone"
              onValueChange={(value) => handleSelectChange("tone", value)}
              required
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="romantic">Romantic</SelectItem>
                <SelectItem value="passionate">Passionate</SelectItem>
                <SelectItem value="playful">Playful</SelectItem>
                <SelectItem value="sincere">Sincere</SelectItem>
                <SelectItem value="poetic">Poetic</SelectItem>
                <SelectItem value="funny">Funny</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
            <Textarea
              id="additionalDetails"
              name="additionalDetails"
              placeholder="Add any specific memories, inside jokes, or details you'd like included..."
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={4}
              disabled={isLoading}
              className="resize-none"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          onClick={handleSubmit}
          className="w-full relative px-6 py-6 text-lg font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2 align-[-0.125em]"></span>
              <span>Creating your letter...</span>
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 inline mr-2" />
              <span>Generate Love Letter</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}