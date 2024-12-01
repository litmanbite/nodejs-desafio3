# Use official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Install TypeScript globally
RUN npm install -g typescript ts-node

# Expose the port your app will run on
EXPOSE 8080

# Run the app using ts-node
CMD ["ts-node", "src/index.ts"]
