# FootballSite - NFL Analysis & Fantasy Platform

A comprehensive NFL website built with Next.js 14, featuring season analysis, fantasy rankings, draft coverage, and expert picks.

## 🏈 Features

### Core Sections
- **Season**: Standings, playoff odds, schedules, team analysis
- **Draft**: Prospect database, big board rankings, weekly mock drafts
- **Picks**: Weekly picks with confidence ratings, unit tracking, ROI analysis
- **Fantasy**: Position rankings, tier lists, scoring system toggles

### Technical Features
- Modern React with TypeScript
- Responsive design with Tailwind CSS
- Data adapters for external APIs
- Prisma ORM with PostgreSQL
- NextAuth.js authentication
- Sanity CMS integration
- Comprehensive testing setup

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd football-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:e2e` - Run end-to-end tests with Playwright

### Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

### Sanity CMS Commands

- `npm run studio` - Start Sanity Studio
- `npm run build:studio` - Build Sanity Studio
- `npm run deploy:studio` - Deploy Sanity Studio

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── season/            # Season analysis pages
│   ├── draft/             # Draft coverage pages
│   ├── picks/             # Picks and betting pages
│   ├── fantasy/           # Fantasy rankings pages
│   └── ...                # Other pages
├── components/             # React components
│   ├── ui/                # UI components (shadcn/ui)
│   ├── shared/            # Shared components
│   ├── season/            # Season-specific components
│   ├── draft/             # Draft-specific components
│   ├── picks/             # Picks-specific components
│   └── fantasy/           # Fantasy-specific components
├── lib/                    # Utility libraries
│   ├── adapters/          # Data adapters for APIs
│   ├── auth/              # Authentication utilities
│   ├── sanity/            # Sanity CMS utilities
│   └── utils.ts           # General utilities
├── types/                  # TypeScript type definitions
├── hooks/                  # Custom React hooks
└── styles/                 # Global styles
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/football_site"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your-sanity-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-sanity-api-token"
```

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- NFL team colors
- Custom spacing and typography
- Dark mode support
- Custom animations

### Prisma Schema

The database includes models for:
- Users and authentication
- Favorites and user preferences
- Picks and betting records
- View logs and analytics

## 🧪 Testing

### Unit Tests
- **Framework**: Vitest
- **Location**: `src/lib/__tests__/`
- **Run**: `npm run test`

### End-to-End Tests
- **Framework**: Playwright
- **Location**: `tests/e2e/`
- **Run**: `npm run test:e2e`

### Test Coverage
- Utility functions
- Data adapters
- Component rendering
- User interactions

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application: `npm run build`
2. Start the production server: `npm run start`

## 📱 Mobile Support

The application is built with a mobile-first approach:
- Responsive design for all screen sizes
- Touch-friendly interactions
- Optimized for iPhone 13/SE breakpoints

## 🔒 Security & Compliance

### Gambling Disclaimer
- 21+ only banner
- Responsible gaming resources
- Odds delay disclaimers
- "Not investment advice" warnings

### Data Protection
- Secure authentication with NextAuth.js
- Environment variable protection
- Database connection security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## �� License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: contact@footballsite.com
- Issues: GitHub Issues
- Documentation: Project Wiki

## 🏆 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Prisma for the excellent ORM
- Sanity for the headless CMS
- All contributors and supporters

---

**Remember**: This is not investment advice. Please gamble responsibly. 21+ only.
