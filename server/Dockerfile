# === Node 18 LTS ===
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copia manifestos (package.json e package-lock.json)
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm ci --omit=dev --no-audit --no-fund

# Copia o restante da aplicação (inclui index.js e pastas auxiliares)
COPY . .

# Define ambiente e porta
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Adiciona utilitário curl para o healthcheck
RUN apk add --no-cache curl

# Healthcheck (Cloud Run verifica automaticamente)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS http://localhost:8080/health || exit 1

# Segurança — não roda como root
USER node

# As variáveis sensíveis (DATABASE_URL, ENSURE_DB, etc.) vêm do Cloud Run
CMD ["npm", "start"]
