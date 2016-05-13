FROM mhart/alpine-node:4

COPY . /src
WORKDIR /src

RUN npm install
RUN npm install -g forever
RUN mkdir -p /media

EXPOSE 3001
CMD ["forever", "index.js"]