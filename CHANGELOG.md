# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Authentication system with login and registration
  - Authentication context
  - Login and registration forms with Zod validation
  - Authentication page
  - Route protection middleware
  - Authentication API service
  - User interface
  - User menu with profile and logout options
- Route-based layout configuration
  - Dynamic titles and subtitles based on current route path
  - Improved navigation between auth pages using Next.js Link
  - Client-side route detection for better UX

### Changed
- Enhanced form validation with Zod schema
  - Real-time validation feedback
  - Detailed validation error messages
  - Type-safe form handling
  - Complex validation rules (regex patterns, min length)
- Simplified AuthForm component
  - Consolidated form state management
  - Improved error handling with toast notifications
  - Better field validation
  - Portuguese localization of UI elements
  - Better accessibility with appropriate autoComplete attributes
  - Streamlined navigation between login and registration pages

### Removed
- Context-based layout configuration in favor of route-based approach
- Unused AuthContainer component in favor of direct page-based routing

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