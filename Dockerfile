# Stage 1: Build Frontend
FROM oven/bun:latest AS frontend-builder
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install
COPY . .
RUN bun run build

# Stage 2: Serve Backend & Frontend
FROM oven/bun:latest
WORKDIR /app

# Copy production assets
COPY --from=frontend-builder /app/dist ./dist
COPY --from=frontend-builder /app/server ./server
COPY --from=frontend-builder /app/package.json ./package.json
COPY --from=frontend-builder /app/public ./public

# Install production dependencies
RUN bun install --production

# Default container settings
EXPOSE 3001
ENV NODE_ENV=production
ENV DATA_DIR=/app/data

# Run server
CMD ["bun", "run", "server"]
