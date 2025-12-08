# Kortex

Kortex is a web-based Kanban board application designed for streamlined project management. It provides a visual and intuitive interface to help users organize tasks, track progress, and collaborate effectively.

## Features

- **Interactive Kanban Boards:** Create and manage multiple boards for different projects.
- **Customizable Lists:** Organize your workflow with customizable lists like "To Do", "In Progress", and "Done".
- **User Authentication:** Secure your boards with user registration and login.

## Technologies

- **Frontend:**
  - [Vue 3](https://vuejs.org/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Pinia](https://pinia.vuejs.org/) for state management
  - [Vue Router](https://router.vuejs.org/) for client-side routing
- **Testing:**
  - [Vitest](https://vitest.dev/) for unit tests
  - [Playwright](https://playwright.dev/) for end-to-end tests

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project Structure

The project follows a standard Vue 3 application structure:

- `src/`: Contains the main source code.
  - `assets/`: Static assets like CSS and images.
  - `components/`: Reusable Vue components.
  - `router/`: Vue Router configuration.
  - `services/`: Modules for interacting with APIs.
  - `stores/`: Pinia store modules for state management.
  - `views/`: Application views or pages.
- `e2e/`: End-to-end tests.

## Getting Started

Follow these instructions to set up and run the project locally.

## Prerequisites

- [Node.js](https://nodejs.org/) (version specified in `package.json`)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/kortex-board/kortex-frontend
    ```

2. Navigate to the project directory:

    ```sh
    cd kortex-frontend
    ```

3. Install the dependencies:
  
    ```sh
    # Install dependencies
    $ npm install
    ```

## Development

To start the development server with hot-reloading:

```sh
# Start the development server with hot-reload
$ npm run dev
```

## Building for Production

To build and minify the application for production:

```sh
# Build and minify for production
$ npm run build
```

## Testing

## Unit Tests

To run the unit tests:

```sh
#Run unit tests with Vitest
$ npm run test:unit
```

## End-to-End Tests

Before running the e2e tests, you need to install the browser binaries for Playwright:

```sh
npx playwright install
```

Then, you can run the tests:

```sh
# Run E2E tests
$ npm run test:e2e
```

## Contact

- GitHub: [kortex-board](https://github.com/kortex-board)

## Acknowledgements

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [Biome](https://biomejs.dev/)
