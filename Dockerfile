# ====== STAGE 1: Build ======
FROM node:18 AS builder

WORKDIR /app

# Copier les fichiers de dépendances en premier (optimisation du cache Docker)
COPY package.json package-lock.json ./

RUN npm install --only=production

# Copier tout le code source
COPY . .

# Build du projet
RUN npm run build

# ====== STAGE 2: Run ======
FROM node:18-alpine

WORKDIR /app

# Copier uniquement le build et node_modules de l’étape précédente
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Définir les variables d’environnement (optionnel)
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Commande pour démarrer l’application
CMD ["node", "dist/main.js"]
