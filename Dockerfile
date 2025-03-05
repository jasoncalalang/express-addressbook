FROM node:22-alpine

WORKDIR /usr/src/app
# Copy the package files first to install dependencies
COPY package*.json ./
RUN npm install

# Copy remaining source code
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
