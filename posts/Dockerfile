from node:alpine

WORKDIR /app
COPY package.json ./
EXPOSE 4000
RUN npm install

COPY ./ ./

CMD ["npm", "run", "dev"]
