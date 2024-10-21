# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the Web directory
COPY . .

# Install dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install

# Expose the port the Web app runs on
EXPOSE 3000

# Start the Web application
CMD ["pnpm", "dev"]