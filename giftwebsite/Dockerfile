# Use Node base image
FROM node:18-bullseye

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build frontend (React build step)
RUN npm run build

# Install express server dependencies
RUN npm install express cors

# Expose port
EXPOSE 9000

# Start server
CMD ["node", "index.js"]
