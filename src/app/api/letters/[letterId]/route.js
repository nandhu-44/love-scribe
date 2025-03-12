import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Letter from '@/lib/models/Letter';

export async function GET(request, { params }) {
  try {
    const { letterId } = params;
    
    if (!letterId) {
      return NextResponse.json(
        { error: 'Letter ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const letter = await Letter.findOne({ letterId });

    if (!letter) {
      return NextResponse.json(
        { error: 'Letter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(letter);
  } catch (error) {
    console.error('Error retrieving letter:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve letter' },
      { status: 500 }
    );
  }
}