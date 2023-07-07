FROM node:20-alpine3.16

WORKDIR /app
# COPY package.json ./
COPY . .

# RUN npm install -g npm@9.6.6
# RUN npm install --global yarn
RUN yarn install

ENTRYPOINT npx expo start --dev-client
# CMD tail -f /dev/null
