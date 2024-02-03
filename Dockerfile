# Use an official Node.js runtime as a parent image
FROM node:21-alpine3.18

# Set the working directory in the container
WORKDIR .

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port on which your app will run
EXPOSE 3000

# Set environment variables
ENV DATABASE_URL="postgresql://postgres:rvR8jEHEyGiR1Bfz@db.qapnmxgytxjyaoohkzst.supabase.co:5432/postgres"
ENV NODE_ENV="development"
ENV ENCRYPTION_KEY="xEywM1JA9VTJEpzbL3XtERq6TRpd7MTbzUo7KYzkuJM="
ENV SESSION_STORE='mongodb+srv://admin:ogYGizfwCG7c9gw5@cluster0.lvikbnl.mongodb.net/clientPortal?retryWrites=true&w=majority'

# Define the command to run your app
CMD ["npm", "run", "start"]
