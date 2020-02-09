FROM alpine:3.8 as builder
RUN apk --no-cache add gcc g++ make python nodejs npm
WORKDIR /sierpinski
COPY . .
RUN rm -rf .git && rm -rf node_modules && npm i --production

FROM alpine:3.8
RUN apk --no-cache add nodejs
WORKDIR /sierpinski
COPY --from=builder /sierpinski .
CMD ["./node_modules/.bin/http-server", "-p 9845"]
