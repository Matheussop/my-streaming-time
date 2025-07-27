# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-27

### Added
- **User Streaming History UI**: Introduced user interface for tracking watched content, including support for episode-level tracking, progress percentage, and watched duration in minutes.
- **Seasons and Episodes Pages**: Created components and dynamic routes for displaying season summaries and detailed episode information.
- **Genre Management UI**: Added pages and components for managing genres, integrated with TMDB-based genre data.
- **Authentication Enhancements**: Improved login validation, enhanced error messages for token extraction and authorization issues.
- **Initial Genre Synchronization**: Automatically fetches and displays movie and TV genres from TMDB if the local database is empty.
- **Form Validation with Zod**: Implemented robust form validation using Zod and React Hook Form, with user-friendly error messages.
- **Updated Types and Interfaces**: Introduced new types/interfaces for `watchedDurationInMinutes`, `completionPercentage`, `episodeId`, and other updated models.

### Changed
- **Series View Enhancements**: Updated series pages to reflect new season structure with `seasonsSummary`, including season and episode counters.
- **Toast Notifications**: Standardized error and success messages using Shadcn/UI toasts across the app.
- **Validation Architecture**: Migrated all validation logic to Zod schemas for consistency and better error handling.
- **New Routes**: Added new frontend routes for `/history`, `/genres`, `/seasons/[id]`, and `/episodes/[id]`.
- **Performance Improvements**: Applied lazy loading and conditional rendering to improve load times for content-heavy components.
- **UI/UX Polish**: Adjusted layout, spacing, icons, and responsiveness for better user experience across devices.

### Fixed
- Fixed empty history rendering issue.
- Fixed crash when episodes had undefined or null duration.
- Fixed genre duplication display issue.
- Fixed token extraction issues that caused login failures with malformed headers.
  
### Removed
- Context-based layout configuration in favor of route-based approach
- Unused AuthContainer component in favor of direct page-based routing
- localStorage-based token storage in favor of secure cookies

## [0.2.0] - 2024-03-28

### Added
- Episode components
- Structure for user streaming history
- Streaming-detail section for detailed viewing
- API for user streaming history
- Interface for common media and streaming history

### Modified
- UI components enhancement
- Update of series and movies interfaces

## [0.1.0] - 2024-02-22

### Added
- Initial project structure with Next.js 15
- TailwindCSS configuration
- Themes with next-themes
- Base UI components
- Component to search by streaming title.
- Home page with recommended sections and categories
- Top Streaming carousel
- Loading and suspense system
- Radix UI components for interactive elements
- Initial API structure with apiService
- Jest configuration for testing
- Basic interfaces for streaming and media types

### Configured
- ESLint and Prettier for code standardization
- TypeScript support
- Testing environment with Jest
- Tailwind and PostCSS 