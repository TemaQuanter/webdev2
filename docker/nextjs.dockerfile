# Step 1: Build Stage
FROM node:23 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install specific version of Next.js 15
RUN npm install next@15

# Install other dependencies
RUN npm install

# Install Prisma CLI (if not installed globally)
RUN npm install prisma --save-dev

# Copy Prisma schema and other necessary files
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy the entire project
COPY . .

# Build the Next.js application
RUN npm run build

# Production Stage
FROM node:23 AS production

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/protected_images ./protected_images
COPY --from=builder /app/public_images ./public_images
COPY --from=builder /app/favicon.ico ./favicon.ico

# Expose port 3000
EXPOSE 3000

# Run Next.js application
CMD ["npm", "run", "start"]
