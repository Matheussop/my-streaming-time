# My Streaming Time

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

A platform designed to help users track and organize their streaming activities across different services.

## Features

- Track new updates from your chosen streaming services
- Organize and manage your watching activities
- Get personalized streaming recommendations
- Rate and analyze your watched content

## Tech Stack

- **Frontend:** React.js 19 with Next.js 15
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI
- **Package Manager:** pnpm
- **Authentication:** JWT with HTTPOnly cookies
- **Testing:** Jest with React Testing Library

## Getting Started

### Prerequisites

- Node.js (LTS version)
- pnpm package manager

### Installation (Local)

1. Clone the repository:
   ```bash
   git clone https://github.com/Matheussop/my-streaming-time.git
   cd my-streaming-time
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage |

### Project Structure

```
my-streaming-time/
├── src/
│   ├── app/         # Next.js app directory
│   ├── components/  # Reusable components
│   ├── lib/         # Utility functions
│   ├── context/     # React contexts
│   ├── interfaces/  # TypeScript interfaces
│   └── api/         # API services
├── public/          # Static assets
└── ...config files
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- [Design Mockups (Figma)](https://www.figma.com/file/bQm1CV2E9apIj88sB4TVqV/My-TV-Time)
- [Project Kanban Board](https://www.notion.so/My-Streaming-Time-f6c7883b297f4e27b9c2df9319f095be?pvs=4)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please reach out to [matheussopluiz@outlook.com](mailto:matheussopluiz@outlook.com)
 