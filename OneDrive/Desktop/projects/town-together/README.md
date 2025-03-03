# Town Together

A platform for civic engagement in small towns with populations between 5,000 and 20,000. The app enables residents to report local issues and allows the community to prioritize these issues through voting and comments.

![Town Together Logo](public/logo.png)

## Features

- **Issue Reporting**: Submit local issues with categories, descriptions, and geolocation
- **Community Engagement**: Vote and comment on reported issues
- **Interactive Map**: View issues on a geospatial map
- **Admin Dashboard**: Manage issues and access analytics
- **Residency Verification**: Ensure users are actual residents
- **Mobile-Responsive Design**: Built with Material UI for all devices

## Tech Stack

- **Frontend**: React 18+ with Next.js 15+
- **UI Framework**: Material UI (MUI) 5+
- **Backend**: Node.js with Express
- **Database**: MongoDB 5.0+ with geospatial indexing
- **Authentication**: JWT with secure cookie handling
- **Geolocation**: Google Maps API integration
- **Styling**: SCSS with modular components

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- MongoDB 5.0+ (local or Atlas)
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/DAD-The-Developer/town-together.git
   cd town-together
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
town-together/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── api/         # API routes
│   │   ├── auth/        # Authentication pages
│   │   ├── dashboard/   # Admin dashboard
│   │   ├── issues/      # Issue management
│   │   ├── profile/     # User profile
│   │   └── ...
│   ├── components/      # Reusable components
│   ├── lib/             # Utility functions
│   ├── models/          # MongoDB models
│   └── styles/          # SCSS styles
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore file
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## Deployment

The application can be deployed to various platforms:

- **Vercel**: Recommended for Next.js applications
- **AWS/Google Cloud**: For more control over infrastructure
- **Docker**: Container deployment available

## License

Proprietary - All rights reserved

## Contributing

This is a private project. Contributions are by invitation only.

## Contact

For any inquiries, please contact:
- GitHub: [@DAD-The-Developer](https://github.com/DAD-The-Developer)
