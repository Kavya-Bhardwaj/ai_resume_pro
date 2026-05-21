import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Generate unique filename
    const resumeId = uuidv4();
    const fileExtension = file.type === 'application/pdf' ? 'pdf' : 'docx';
    const filename = `${resumeId}.${fileExtension}`;

    // Save file to uploads directory
    const uploadDir = join(process.cwd(), 'public', 'uploads', userId);
    await mkdir(uploadDir, { recursive: true });
    const filepath = join(uploadDir, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // TODO: Parse resume and calculate ATS score using AI
    // For now, return mock data
    const mockAtsScore = Math.floor(Math.random() * (95 - 60 + 1)) + 60;

    return NextResponse.json(
      {
        success: true,
        resumeId,
        fileName: file.name,
        atsScore: mockAtsScore,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resume upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
