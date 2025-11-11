# === Node 18 LTS ===
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copia manifestos
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm ci --omit=dev --no-audit --no-fund

# Copia o restante da aplicação
COPY . .

# Expõe a porta exigida pelo Cloud Run
EXPOSE 8080

# Saúde básica (opcional, ajuda em debug local; Cloud Run usa a própria checagem)
RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS http://localhost:8080/health || exit 1

# Segurança — não roda como root
USER node

# Entrypoint
CMD ["npm", "start"]
