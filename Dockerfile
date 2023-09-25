# Building layer
FROM node:20.7.0-bullseye

# Optional NPM automation (auth) token build argument
# ARG NPM_TOKEN

# Optionally authenticate NPM registry
# RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

# Copy configuration files
COPY . ./app

WORKDIR /app

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm install

# Build application (produces dist/ folder)
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
