# Travel Destinations

This project is a monorepo workspace containing a vanilla JavaScript frontend and an Express.js API backend for a Travel Destinations application.

## ER Diagrams

### V1 (Basic Version)

![ER Diagram V1](/assets/ER-Diagram-v1.png)

This initial version of the ER diagram for the Travel Destinations project meets the minimum requirements, depicting a simple relationship between users and destinations. It shows a one-to-many relationship where one user can have multiple destinations.

### V2 (For mongo : No-Normlaization)
![ER Diagram V2](/assets/ER-Diagram-v2.png)

The second version of the ER diagram is designed for MongoDB without normalization. This version is intended to be implemented within our final submission. The digram shows a one to many for users to trips, and a many to many for the trips to destinations. The destinations array in the trips table also holds an array of destination_id's 

### V3 (For SQL : Normalized)

![ER Diagram V3](/assets/ER-Diagram-v3.png)

The third version of the ER diagram is tailored for SQL databases with normalization considerations. This version includes normalized tables to reduce redundancy and improve data integrity. It hold similar strucutre to v2 but introduces a join table called `TripDestinations` that contains `trip_id` and `destination_id` to establish a many-to-many relationship between trips and destinations.

## Project Structure

The project is organized into the following directories:

- `apps/api`: Contains the Express.js API backend.
- `apps/web`: Contains the vanilla JavaScript frontend.

Each application has its own `package.json` file and can be developed and run independently.

## Prerequisites

- Node.js (version >= 18.16.1)
- pnpm (latest version)

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/travel-destinations.git
   cd travel-destinations
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Start the development servers:

   ```
   pnpm start
   ```

   This will start both the API (http://localhost:3000) and the frontend (http://localhost:8080) concurrently.

## Project Configuration

### Workspaces

This project uses pnpm workspaces. The workspace configuration can be found in:

### Scripts

The following scripts are available in the root `package.json`:

- `pnpm start`: Starts both the API and frontend servers
- `pnpm start:api`: Starts only the API server
- `pnpm start:web`: Starts only the frontend server
- `pnpm lint`: Runs ESLint on all JavaScript files
- `pnpm format`: Runs Prettier to format all files

### Linting and Formatting

This project uses Biome for linting and code formatting. The configurations can be found in:

- `biome.json`: Biome configuration
- `.biomeignore`: Files and directories to be ignored by Biome

You can run linting and formatting using the following commands:
- `pnpm lint`: Runs Biome linter on all files
- `pnpm format`: Runs Biome formatter on all files

### Git Hooks

We use Husky for Git hooks and lint-staged for running linters on staged files before committing. The configuration can be found in the root `package.json`:

## API (Express.js)

The main entry point is `apps/api/src/index.js`.

## Frontend (Vanilla JavaScript)

The frontend is located in the `apps/web` directory.

## Development Workflow

1. Make your changes in the respective `apps/api` or `apps/web` directories.
2. Stage your changes: `git add .`
3. Commit your changes: `git commit -m "Your commit message"`
   - This will trigger the pre-commit hook, running linters and formatters on staged files.
4. Push your changes: `git push`
5. Please NEVER push to main, and always make sure to create a new branch and make a pull request.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

Developers: Patrick, Digna, Frej, Kengo
