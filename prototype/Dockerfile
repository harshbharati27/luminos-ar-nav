# Use Node
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Build the Vite app
RUN npm run build

# Expose port
EXPOSE 8080

# Start server
CMD ["node", "server.js"]