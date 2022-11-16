FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY . .
ENV PORT 4000
EXPOSE $PORT
CMD ["npm", "run", "dev"]
