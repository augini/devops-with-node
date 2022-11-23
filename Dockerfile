FROM --platform=linux/amd64 node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
ARG NODE_ENV
RUN if [ "$NODE_ENV" "=" "development" ]; \
   then npm install; \
   else npm install --only=production; \
   fi
COPY . .
ENV PORT 4000
EXPOSE $PORT
