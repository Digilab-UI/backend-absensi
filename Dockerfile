# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the app
COPY . .

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
