FROM node:20-alpine3.16

WORKDIR /app
# COPY package.json ./
COPY . .

# RUN npm install -g npm@9.6.6
# RUN npm install --global yarn
RUN yarn install

CMD npm run start
# CMD tail -f /dev/null
