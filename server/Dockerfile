# === Node 18 LTS ===
FROM node:18-alpine

# Define o ambiente como produção
ENV NODE_ENV=production

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os manifestos e instala apenas dependências de produção
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Copia o restante da aplicação
COPY . .

# (Opcional) adiciona curl — útil se quiser testar o /health dentro do container
RUN apk add --no-cache curl

# Corrige permissões para o usuário 'node' (boa prática)
RUN chown -R node:node /app

# Expõe a porta padrão usada pelo Cloud Run
EXPOSE 8080

# Segurança: roda como usuário não-root
USER node

# Comando de inicialização
CMD ["npm", "start"]
