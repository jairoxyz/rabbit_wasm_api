FROM node:21-alpine

# Print build information (ARGS are automatic, and target can be set)
ARG TARGETPLATFORM
ARG BUILDPLATFORM
RUN printf "I am running on ${BUILDPLATFORM}, building for ${TARGETPLATFORM}\n$(uname -a)\n"

# Copy needed files
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package.json package-lock.json tsconfig.json LICENSE ./
COPY --chown=node:node src ./src/
RUN chown -R node:node /home/node/app

# Install, build, and remove source code & dev packages
RUN npm install && \
    npm run build && \
    rm -rf src tsconfig.json && \
    npm prune --production

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source and chown to non root
COPY --chown=node:node . .

# Expose app port binding
EXPOSE 3000

CMD [ "npm", "start" ]