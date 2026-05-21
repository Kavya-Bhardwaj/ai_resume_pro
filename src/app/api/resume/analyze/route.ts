import { NextRequest, NextResponse } from 'next/server';

interface AnalysisRequest {
  resumeText: string;
}

interface AnalysisResponse {
  atsScore: number;
  keywords: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  overallFeedback: string;
}

const KEYWORDS = [
  'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C++',
  'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Git',
  'REST API', 'GraphQL', 'Agile', 'Scrum', 'JIRA', 'CI/CD',
  'Machine Learning', 'Data Science', 'AI', 'Analytics', 'Dashboard',
  'Full Stack', 'Frontend', 'Backend', 'DevOps', 'Cloud',
  'Leadership', 'Communication', 'Problem Solving', 'Teamwork',
];

const STRENGTH_INDICATORS = [
  'experienced', 'expert', 'proficient', 'skilled', 'advanced',
  'passionate', 'innovative', 'creative', 'leader', 'manager',
  'developer', 'engineer', 'architect', 'specialist', 'analyst',
];

const IMPROVEMENT_SUGGESTIONS = [
  'Add quantifiable metrics and achievements (e.g., "Improved performance by 40%")',
  'Include relevant certifications and awards',
  'Highlight leadership and team collaboration experience',
  'Add specific project outcomes and business impact',
  'Use action verbs (Created, Implemented, Designed, etc.)',
  'Include soft skills like communication and problem-solving',
  'Add links to portfolio or GitHub projects',
  'Specify technologies and tools used in each role',
  'Include metrics about team size you managed',
  'Add details about scale of projects (users, transactions, data volume)',
];

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json();
    const { resumeText } = body;

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    const text = resumeText.toLowerCase();
    const lines = text.split('\n');

    let atsScore = 0;
    const foundKeywords: string[] = [];

    KEYWORDS.forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword);
        atsScore += 1.5;
      }
    });

    if (lines.length > 5) atsScore += 5;
    if (text.includes('email') || text.includes('phone')) atsScore += 5;
    if (text.includes('linkedin') || text.includes('github') || text.includes('portfolio')) atsScore += 5;
    if (text.includes('http') || text.includes('www')) atsScore += 5;

    if (text.includes('experience') || text.includes('worked')) atsScore += 5;
    if (text.includes('skill') || text.includes('proficient')) atsScore += 5;
    if (text.includes('project') || text.includes('developed')) atsScore += 5;
    if (text.includes('achievement') || text.includes('award') || text.includes('result')) atsScore += 5;

    if (resumeText.length > 1000) atsScore += 5;
    if (resumeText.length > 2000) atsScore += 5;

    atsScore = Math.min(Math.round(atsScore), 100);

    const strengths: string[] = [];
    STRENGTH_INDICATORS.forEach(indicator => {
      if (text.includes(indicator)) {
        strengths.push(`Strong background in ${indicator} skills`);
      }
    });

    if (foundKeywords.length > 10) {
      strengths.push(`Diverse technical skill set (${foundKeywords.length}+ technologies)`);
    }

    if (text.includes('led') || text.includes('managed') || text.includes('leadership')) {
      strengths.push('Leadership and team management experience');
    }

    if (text.includes('award') || text.includes('recognition') || text.includes('certified')) {
      strengths.push('Recognized achievements and certifications');
    }

    const weaknesses: string[] = [];

    if (foundKeywords.length < 5) {
      weaknesses.push('Limited technical keywords - consider adding more skills');
    }

    if (!text.includes('metric') && !text.includes('improved') && !text.includes('increased')) {
      weaknesses.push('Missing quantifiable achievements and metrics');
    }

    if (!text.includes('project') && !text.includes('developed')) {
      weaknesses.push('Limited project details - add specific examples');
    }

    if (!text.includes('team') && !text.includes('collaboration')) {
      weaknesses.push('Missing collaboration and teamwork examples');
    }

    if (resumeText.length < 800) {
      weaknesses.push('Resume might be too brief - consider adding more details');
    }

    const suggestions = IMPROVEMENT_SUGGESTIONS
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    let overallFeedback = '';
    if (atsScore >= 80) {
      overallFeedback = 'Excellent resume! Your resume is well-optimized for ATS systems and likely to pass initial screening.';
    } else if (atsScore >= 60) {
      overallFeedback = 'Good resume! Consider implementing some suggestions to improve your ATS score and increase chances of passing automated screening.';
    } else if (atsScore >= 40) {
      overallFeedback = 'Fair resume. Add more keywords, metrics, and project details to improve your chances of passing ATS screening.';
    } else {
      overallFeedback = 'Your resume needs improvement. Follow the suggestions to enhance its effectiveness for ATS systems and recruiters.';
    }

    const analysis: AnalysisResponse = {
      atsScore,
      keywords: foundKeywords.slice(0, 10),
      strengths: strengths.slice(0, 4),
      weaknesses: weaknesses.slice(0, 4),
      suggestions,
      overallFeedback,
    };

    return NextResponse.json(analysis, { status: 200 });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}
