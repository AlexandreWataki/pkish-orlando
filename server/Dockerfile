# syntax=docker/dockerfile:1
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Instala DEPENDÊNCIAS
COPY package*.json ./
RUN npm ci --omit=dev

# Copia o servidor
COPY server.js ./

# Cloud Run fornece $PORT; seu server usa process.env.PORT
EXPOSE 8080
CMD ["node", "server.js"]
