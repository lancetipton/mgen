ARG IMAGE_FROM=node:20-alpine3.17

# ---- Base Stage  ---- #
FROM $IMAGE_FROM AS ror-base
WORKDIR /app
RUN npm i -g pnpm
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install --global pnpm@8.3.1
# ---- End Stage ---- #

# ---- PNPM Stage  ---- #
FROM ror-base AS ror-pnpm
WORKDIR /app
COPY .npmrc pnpm-*.yaml ./
RUN pnpm fetch --prod
# ---- End Stage ---- #

# ---- Build Stage  ---- #
FROM ror-pnpm AS ror-build
COPY . .
RUN pnpm install
RUN pnpm mgen /app/frontend/sites
RUN rm -rf /app/frontend/sites/.mgen/code-index.zip
## ---- End Stage ---- #

## ---- Run Stage  ---- #
FROM ror-pnpm AS ror-run
EXPOSE 3005
#RUN pnpm --global add @warren-bank/serve
RUN npm install --global "@warren-bank/serve"
COPY --from=ror-build /app/frontend /app/frontend
CMD ["serve", "-n", "-p", "3005", "-c", "/app/frontend/sites/.mgen/serve.json", "/app/frontend"]
### ---- End Stage ---- #