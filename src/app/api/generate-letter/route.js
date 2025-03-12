export const runtime = 'edge';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { generateLoveLetter } from '@/lib/openai';
import connectToDatabase from '@/lib/db';
import Letter from '@/lib/models/Letter';

export async function POST(request) {
  try {
    const body = await request.json();
    const { recipientName, senderName, occasion, tone, additionalDetails } = body;

    if (!recipientName || !senderName || !occasion || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const content = await generateLoveLetter({
      recipientName,
      senderName,
      occasion,
      tone,
      additionalDetails
    });

    try {
      await connectToDatabase();

      const letter = new Letter({
        recipientName,
        senderName,
        occasion,
        tone,
        additionalDetails,
        content
      });

      await letter.save();

      return NextResponse.json({
        success: true,
        letterId: letter.letterId
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      return NextResponse.json({
        success: false,
        error: 'Failed to save letter to database',
        content: content,
        fallback: true
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error generating letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate letter' },
      { status: 500 }
    );
  }
}