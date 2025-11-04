# Step 1: Use Node.js official image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the code
COPY . .

# Step 5: Expose the backend port (e.g., 5000)
EXPOSE 5000

# Step 6: Start the backend server
CMD ["npm", "start"]
