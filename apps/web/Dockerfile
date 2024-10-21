# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

RUN rm -rf node_modules

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm build

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "dev"]