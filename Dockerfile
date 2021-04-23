FROM node:15.14.0-stretch-slim

# https://jaked.org/blog/2021-02-18-How-to-run-Electron-on-Linux-on-Docker-on-Mac

# stuff needed to get Electron to run
RUN apt-get update && apt-get install \
    libpango1.0-dev libcairo2-dev libx11-xcb1 libxcb-dri3-0 \
    libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd -d /point point
USER point

WORKDIR /point
COPY . .
RUN yarn
# RUN npx electron-rebuild

# Electron needs root for sandboxing
# see https://github.com/electron/electron/issues/17972
USER root
RUN chown root /point/node_modules/electron/dist/chrome-sandbox && \
    chmod 4755 /point/node_modules/electron/dist/chrome-sandbox

USER point
RUN yarn build
# ENV ELECTRON_ENABLE_LOGGING=true

ENTRYPOINT [ "yarn", "start", "--no-sandbox" ]
