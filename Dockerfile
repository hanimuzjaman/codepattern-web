# Build stage
FROM node:21-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Runtime stage
FROM node:21-alpine

WORKDIR /app

# Install serve to run the static build
RUN npm install -g serve

# Create non-root user
RUN addgroup -g 1000 appuser && \
    adduser -D -u 1000 -G appuser appuser

# Copy built app from builder
COPY --from=builder --chown=appuser:appuser /app/dist ./dist

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/index.html || exit 1

# Switch to non-root user
USER appuser

# Start application
CMD ["serve", "-s", "dist", "-l", "3000"]
