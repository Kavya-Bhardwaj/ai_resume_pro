import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // TODO: Integrate with OpenAI or Gemini API
    // For now, return mock responses
    const mockResponses: { [key: string]: string } = {
      'how can i improve my ats score?':
        'Here are 5 ways to improve your ATS score: 1) Use keyword-rich descriptions matching the job posting, 2) Include relevant skills in a dedicated skills section, 3) Avoid graphics and complex formatting, 4) Use standard section headers (Experience, Education, Skills), 5) Include specific metrics and achievements.',
      'suggest better bullet points for my experience':
        'Strong bullet points should follow this format: [Action verb] + [Task] + [Result/Impact]. Example: "Increased website conversion rate by 35% through implementing A/B testing strategies, resulting in $2M additional revenue." Focus on quantifiable results!',
      'how do i write a strong professional summary?':
        'A strong professional summary should: 1) Be 2-3 sentences max, 2) Highlight your key achievements, 3) Include relevant keywords for your target role, 4) Show your unique value proposition, 5) Be tailored to the job description.',
      'what skills should i highlight?':
        'Review the job posting and identify: 1) Required technical skills, 2) Preferred skills, 3) Soft skills mentioned, 4) Industry-specific keywords. Prioritize matching the job requirements. Include both hard skills (e.g., Python, React) and soft skills (e.g., Leadership, Communication).',
    };

    const lowerMessage = message.toLowerCase();
    let response = mockResponses[lowerMessage] || 
      `Great question about your resume! I can help you with that. To give you more specific advice, could you provide more context? Here's a general tip: Always tailor your resume to each job posting, highlighting skills and experiences that match their requirements.`;

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
