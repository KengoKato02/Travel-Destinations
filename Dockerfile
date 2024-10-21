# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the entire monorepo
COPY . .

# Install dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install

# Expose the ports the apps run on
EXPOSE 3000 8080

# Start both the API and web applications
CMD ["pnpm", "dev"]