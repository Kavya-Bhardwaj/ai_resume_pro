import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // TODO: Fetch resume details from database
    // For now, return mock data
    const mockResume = {
      id,
      fileName: 'John_Doe_Resume.pdf',
      atsScore: 78,
      createdAt: new Date().toISOString(),
      analysis: {
        strengths: [
          'Strong technical skills highlighted',
          'Good project descriptions with metrics',
          'Clear career progression',
        ],
        weaknesses: [
          'Missing specific keywords for target role',
          'Some bullet points lack quantifiable results',
          'Education section could be more detailed',
        ],
        suggestions: [
          'Add more industry-specific keywords',
          'Quantify achievements with metrics',
          'Reorder experience by relevance to target role',
        ],
      },
      keywords: {
        found: ['React', 'Node.js', 'MongoDB', 'AWS'],
        missing: ['TypeScript', 'GraphQL', 'Docker', 'Kubernetes'],
      },
    };

    return NextResponse.json(mockResume, { status: 200 });
  } catch (error) {
    console.error('Resume detail error:', error);
    return NextResponse.json({ error: 'Failed to fetch resume details' }, { status: 500 });
  }
}
