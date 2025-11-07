# Node 18 LTS
FROM node:18-alpine

WORKDIR /app

# Copia manifestos (cobre package.json e package-lock.json)
COPY package*.json ./

# Instala dependências de produção
RUN npm ci --omit=dev --no-audit --no-fund

# Copia somente a aplicação (layout atual: index.js na raiz do server)
COPY index.js ./

# Ambiente
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Utilitário de saúde para o HEALTHCHECK
RUN apk add --no-cache curl

# HEALTHCHECK (ajuda diagnóstico em runtime)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS http://localhost:8080/health || exit 1

# Segurança: não rodar como root
USER node

# Vars sensíveis (DATABASE_URL, ENSURE_DB, ALLOWED_ORIGINS, etc.) vêm do Cloud Run
CMD ["npm", "start"]
