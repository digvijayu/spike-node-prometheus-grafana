FROM node:16.14
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "index.js"]
