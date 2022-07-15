FROM node:14-alpine AS build
RUN apk add git 

WORKDIR /front

RUN git clone https://github.com/DMarlon/tact-front .

ARG vue_app_front_name
ARG vue_app_api_url

ENV VUE_APP_FRONT_NAME=${vue_app_front_name}
ENV VUE_APP_API_URL=${vue_app_api_url}

RUN npm install
RUN npm run build

FROM python:alpine

WORKDIR /front

COPY --from=build /front/dist/ ./

EXPOSE 8801

CMD [\
  "python3",\
  "-m",\
  "http.server",\
  "8801"\
]
