import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeId } = await req.json();

    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }

    // TODO: Call AI API to enhance resume
    // For now, return mock improved resume
    const mockImprovedResume = {
      success: true,
      originalScore: 78,
      improvedScore: 92,
      improvements: [
        'Added industry-specific keywords',
        'Quantified all achievements with metrics',
        'Reorganized experience by relevance',
        'Enhanced professional summary',
      ],
      downloadUrl: '/api/resume/download?id=' + resumeId + '&version=improved',
    };

    return NextResponse.json(mockImprovedResume, { status: 200 });
  } catch (error) {
    console.error('Resume enhance error:', error);
    return NextResponse.json({ error: 'Failed to enhance resume' }, { status: 500 });
  }
}
