# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies for both frontend and backend
RUN npm install

# Copy the rest of the frontend application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the ports for both frontend and backend
EXPOSE 3000
EXPOSE 5000

# Start both frontend and backend servers using concurrently
CMD ["npm", "run", "start:dev"]
