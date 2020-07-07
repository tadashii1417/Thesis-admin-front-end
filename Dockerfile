FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.15
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

COPY --from=build-stage /app/build/ /usr/share/nginx/html
