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
ENV DATABASE_URL="postgres://postgres.qapnmxgytxjyaoohkzst:rvR8jEHEyGiR1Bfz@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
ENV NODE_ENV="development"
ENV SESSION_SECRET="eKt2oap/gYsmWP3G2OCrlAv0tPFtDWw8lrcpeL6VLH0="
ENV ENCRYPTION_KEY="xEywM1JA9VTJEpzbL3XtERq6TRpd7MTbzUo7KYzkuJM="
ENV SESSION_STORE="mongodb+srv://admin:ogYGizfwCG7c9gw5@cluster0.lvikbnl.mongodb.net/clientPortal?retryWrites=true&w=majority"
ENV CLIENT_URL="http://localhost:3001"
# Define the command to run your app
CMD ["npm", "run", "start"]
