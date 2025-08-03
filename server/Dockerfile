# Use the official Node.js 18 (Alpine Linux variant) image as the base image
FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory.
# These files are copied first to leverage Docker's layer caching, as they change less frequently.
COPY package*.json ./

# Install Node.js dependencies listed in package.json
# This step is done after copying package*.json to optimize caching.
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 5000, which the Node.js server will be listening on
EXPOSE 5000

# Define the command to run when the container starts
# This will start the Node.js server using node server.js
CMD ["node", "server.js"] 