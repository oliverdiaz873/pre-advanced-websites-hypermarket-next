# Pre-Advanced Websites – Hypermarket (Next Edition)

A **pre-advanced level hypermarket website** built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and modern front-end architecture principles.

---

## Project Overview

This project represents a **pre-advanced front-end application** developed using **Next.js**, marking the evolution from traditional React SPA architecture to a more scalable and production-oriented framework.

This edition introduces the power of **Next.js with TypeScript**, enabling modern features such as server-side rendering capabilities, optimized routing, improved performance, and enhanced scalability while preserving clean architectural practices.

Unlike previous stages focused primarily on client-side rendering and basic component structures, this edition emphasizes:

- File-based routing with Next.js App Router
- Scalable and modular architecture
- Component-driven UI development
- Type-safe development using TypeScript
- Utility-first styling with Tailwind CSS
- Optimized rendering and performance strategies
- Improved SEO and accessibility support
- Maintainable and production-ready project organization

This project belongs to the **`pre-advanced-websites`** category and demonstrates the transition toward **modern full-stack-ready front-end development using Next.js**.

---

## Features

- Fully responsive layout using Tailwind CSS utility-first design.
- Modern application structure powered by Next.js.
- Component-based UI development with React.
- Internationalization (i18n) support for multiple languages (English/Spanish).
- Type-safe development with TypeScript.
- Reusable UI components for scalable development.
- Optimized routing using the Next.js App Router.
- Clean separation between UI, logic, and feature modules.
- Mobile-first responsive design using Tailwind breakpoints.
- SEO-friendly semantic HTML structure.
- Improved performance through Next.js optimizations.
- Organized and scalable project architecture.

---

## Architecture Approach

This project implements modern architectural patterns designed for scalability, maintainability, and long-term growth.

### 1. Feature-based Architecture (Clean Features)

The codebase is organized by domain features instead of file types, improving maintainability and scalability.

- **src/features/** → Encapsulated business modules (Cart, Products, Navigation, Categories, etc.) containing their own components, hooks, logic, and utilities.
- **src/shared/** → Shared infrastructure such as reusable UI components, types, constants, helpers, and utilities.
- **src/app/** → Main application layer using the Next.js App Router for layouts, routing, metadata, and page orchestration.

### 2. Scalable Internationalization System (i18n)

The application implements a scalable internationalization architecture:

- Translation namespaces divided by domain and feature.
- Lazy-loaded translation resources for performance optimization.
- Persistent language selection.
- Automatic browser language detection.

### 3. Modern Navigation and Routing Management

Navigation is handled through Next.js routing capabilities combined with smooth client-side interactions:

- Optimized client/server navigation.
- Dynamic route support.
- Scroll restoration management.
- Smooth hash-based scrolling for enhanced mobile UX.

### 4. Performance-Oriented Rendering

The project leverages modern Next.js optimizations:

- Automatic code splitting.
- Optimized asset loading.
- Server and client component separation when appropriate.
- Enhanced SEO and rendering performance.

---

## Technologies Used

- **Next.js** – React framework for scalable web applications.
- **React** – Component-based UI library.
- **TypeScript** – Static typing for safer and maintainable development.
- **Tailwind CSS** – Utility-first CSS framework.
- **JavaScript (ES6+)** – Core scripting language.
- **HTML5** – Semantic markup structure.
- **CSS3** – Additional styling support when necessary.

---

## Learning Goals

This project helps practice and reinforce:

- Building scalable applications with **Next.js**
- Using the **Next.js App Router**
- Integrating **TypeScript with Next.js and React**
- Developing reusable and maintainable UI components
- Organizing scalable front-end architectures
- Combining **Tailwind CSS with modern React workflows**
- Understanding rendering strategies and performance optimization
- Structuring production-ready front-end applications

---

## Project Structure

```bash
src/
├── app/            # Next.js App Router structure
├── features/       # Feature-based modules
├── shared/         # Shared components, utilities, and types
├── styles/         # Global styles and Tailwind configuration
├── hooks/          # Custom reusable hooks
├── services/       # External services and API logic
└── assets/         # Static assets
```

---

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

---

## License

This project is licensed under the **MIT License**.  
See the **LICENSE** file for more details.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
