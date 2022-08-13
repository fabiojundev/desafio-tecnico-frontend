FROM node:16-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

# Build for production.
RUN npm run build --omit=dev

# Install `serve` to run the application.
RUN npm install --location=global serve

EXPOSE 3000
CMD [ "npm", "run", "start" ]

