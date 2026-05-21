import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const remote = searchParams.get('remote') === 'true';
    const minSalary = parseInt(searchParams.get('minSalary') || '0');
    const location = searchParams.get('location') || '';

    // TODO: Fetch jobs from external API or database
    // For now, return mock data
    const mockJobs = [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'Google',
        location: 'Mountain View, CA',
        salary: { min: 150000, max: 200000, currency: 'USD' },
        skillMatchPercentage: 92,
        remote: false,
      },
      {
        id: '2',
        title: 'Full Stack Developer',
        company: 'Meta',
        location: 'Remote',
        salary: { min: 140000, max: 190000, currency: 'USD' },
        skillMatchPercentage: 88,
        remote: true,
      },
      {
        id: '3',
        title: 'React Developer',
        company: 'Microsoft',
        location: 'New York, NY',
        salary: { min: 130000, max: 180000, currency: 'USD' },
        skillMatchPercentage: 85,
        remote: false,
      },
    ];

    // Apply filters
    let filteredJobs = mockJobs;
    if (remote) {
      filteredJobs = filteredJobs.filter((job) => job.remote);
    }
    if (minSalary > 0) {
      filteredJobs = filteredJobs.filter((job) => job.salary.min >= minSalary);
    }
    if (location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    return NextResponse.json({ jobs: filteredJobs }, { status: 200 });
  } catch (error) {
    console.error('Jobs recommend error:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
