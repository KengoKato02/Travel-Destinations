# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the entire monorepo
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile 

# Expose the ports the apps run on
EXPOSE 3000 8080

# Start both the API and web applications
CMD ["pnpm", "dev"]