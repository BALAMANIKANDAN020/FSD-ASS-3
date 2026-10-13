FROM node:slim

# Step 3.1 - Add working directory
WORKDIR /app

# Enable legacy OpenSSL provider for Node 17+ compatibility and set cloud environment
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV HOST=0.0.0.0
ENV BROWSER=none
ENV CI=true

# Step 3.2 - Copy npm dependencies
COPY package*.json ./

# Step 3.3 - Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port and start the application
EXPOSE 3000
CMD ["npm", "start"]