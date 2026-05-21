# AI Resume Pro

A modern, AI-powered web application that helps users analyze and improve their resumes while recommending relevant jobs based on their skills and experience.

## Features

### Core Features
- **AI Resume Upload & Parsing**: Upload PDF/DOCX resumes and extract data automatically
- **AI Resume Analysis**: ATS compatibility scoring, keyword detection, grammar checking
- **Smart Job Recommendations**: AI-powered job matching based on resume data
- **AI Resume Improvement Assistant**: ChatBot for resume enhancement suggestions
- **Resume Score Dashboard**: Visual analytics and improvement tracking
- **One-Click Resume Enhancement**: Auto-improve and download enhanced resumes
- **User Authentication**: Secure login with Google OAuth
- **Admin Panel**: User management and analytics

### Advanced Features
- AI-powered career roadmap suggestions
- AI interview preparation questions
- AI cover letter generator
- Skill-gap analysis
- Career growth prediction
- Real-time notifications
- Email alerts for matching jobs

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js, Express (optional)
- **Database**: MongoDB
- **Authentication**: Clerk
- **AI**: OpenAI API / Google Gemini API
- **Payments**: Stripe
- **Animations**: Framer Motion
- **Charts**: Recharts
- **PDF Processing**: pdf-parse, mammoth

## Project Structure

```
ai_resume_pro/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Home page
│   │   └── api/               # API routes
│   ├── components/            # Reusable components
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── landing/
│   │   └── shared/
│   ├── lib/                   # Utility functions
│   ├── hooks/                 # Custom React hooks
│   ├── store/                 # Zustand stores
│   ├── types/                 # TypeScript types
│   └── utils/                 # Helper functions
├── public/                    # Static assets
├── .env.local.example         # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB account
- Clerk account for authentication
- OpenAI API key
- Stripe account (for payments)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Kavya-Bhardwaj/ai_resume_pro.git
cd ai_resume_pro
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

4. Run development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Build
```bash
npm run build
```

### Type checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signup` - Sign up
- `POST /api/auth/signout` - Sign out

### Resume
- `POST /api/resume/upload` - Upload and parse resume
- `POST /api/resume/analyze` - Analyze resume for ATS compatibility
- `GET /api/resume/:id` - Get resume data
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume

### Jobs
- `GET /api/jobs/recommend` - Get job recommendations
- `GET /api/jobs/search` - Search jobs
- `POST /api/jobs/bookmark` - Bookmark a job

### AI Assistant
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/improve-resume` - Get resume improvement suggestions
- `POST /api/ai/cover-letter` - Generate cover letter

## Deployment

The application is ready for deployment on:
- Vercel (recommended for Next.js)
- AWS
- Digital Ocean
- Heroku

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@airesumepro.com or open an issue on GitHub.
