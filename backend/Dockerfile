FROM node:24-bookworm-slim
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm","start"]