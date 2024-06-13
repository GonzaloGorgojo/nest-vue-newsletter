FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV POSTGRES_HOST=0.0.0.0
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postgres
ENV TOKEN=4c1c8926da8a0ff9f699bbf7f7474ec7

# Build the NestJS app
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Start the NestJS application
CMD npm run typeorm:run && npm run start:prod
