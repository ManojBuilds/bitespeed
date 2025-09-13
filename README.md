# Bitespeed Flow Builder

A visual flow builder application built with Next.js and React Flow. This application allows users to create, edit, and manage workflows by dragging and dropping different types of nodes onto a canvas.

## Features

- Visual flow builder with drag-and-drop functionality
- Node-based workflow creation
- Connection management between nodes
- Node configuration panel
- Responsive design
- Local storage persistence

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a production build:

```bash
pnpm build
```

To serve the production build locally:

```bash
pnpm start
```

## Project Structure

- `src/app` - Next.js app router pages
- `src/components` - React components
- `src/store` - Zustand store for state management
- `src/lib` - Utility functions

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React Flow](https://reactflow.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Deployed Application

The application is deployed on Vercel at: [https://bitespeed-flow-builder.vercel.app](https://bitespeed-flow-builder.vercel.app)

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [React Flow Documentation](https://reactflow.dev/docs/) - learn about React Flow features
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction) - learn about Zustand state management

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.