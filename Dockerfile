# FROM node:18.18.1-slim AS builder
# RUN ["mkdir", "app"]
# COPY ./src ./app/src
# COPY ./public ./app/public
# COPY package.json ./app/package.json
# COPY package-lock.json ./app/package-lock.json
# WORKDIR /app
# RUN npm i
# RUN npm run build

FROM nginx
RUN ["rm" ,"-rf", "/usr/share/nginx/html/*"]
COPY ./default.conf /etc/nginx/conf.d/p.conf
# COPY --from=builder /app/build /usr/share/nginx/app
COPY build /usr/share/nginx/app
EXPOSE 3000

# docker build -t front .
# docker stop front
# docker rm front
# docker run -p 80:3000 --name front1 -d front

# npm start로 실행
#FROM node:18.18.1-slim
#RUN ["mkdir", "app"]
#COPY ./src ./app/src
#COPY ./public ./app/public
#COPY package.json ./app/package.json
#COPY package-lock.json ./app/package-lock.json
#WORKDIR ./app
#RUN ["npm", "install"]
#ENTRYPOINT ["npm", "start"]