import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Fetch resumes from database
    // For now, return mock data
    const mockResumes = [
      {
        id: '1',
        fileName: 'John_Doe_Resume.pdf',
        atsScore: 78,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        fileName: 'John_Doe_Resume_v2.pdf',
        atsScore: 85,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    return NextResponse.json({ resumes: mockResumes }, { status: 200 });
  } catch (error) {
    console.error('Resume list error:', error);
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 });
  }
}
