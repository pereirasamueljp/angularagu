# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install Angular CLI globally
# RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port
EXPOSE 4200

# Command to start the server
CMD ["/app/node_modules/angular/cli/bin/ng", "serve", "--host", "0.0.0.0"]
