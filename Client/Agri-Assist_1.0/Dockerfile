# #Stage 1
# FROM node:18-alpine as builder
# WORKDIR /app
# COPY package.json .
# COPY yarn.lock .
# RUN yarn install 
# COPY . .
# RUN yarn build

# #Stage 2
# FROM nginX:1.19.0
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# ENTRYPOINT [ "nginx" , "-g" , "daemon off;" ]

# FROM node:18-alpine AS development
# ENV NODE_ENV development
# # Add a work directory
# WORKDIR /app
# # Cache and Install dependencies
# COPY package.json .
# COPY yarn.lock .
# RUN yarn install
# # Copy app files
# COPY . .
# # Expose port
# EXPOSE 3000
# # Start the app
# CMD [ "yarn", "preview" ]

# FROM node:18-alpine AS builder
# ENV NODE_ENV production
# # Add a work directory
# WORKDIR /app
# # Cache and Install dependencies
# COPY package.json .
# COPY yarn.lock .
# RUN yarn install
# # Copy app files
# COPY . .
# # Build the app
# RUN yarn build

# # Bundle static assets with nginx
# FROM nginx:1.21.0-alpine as production
# ENV NODE_ENV production
# # Copy built assets from builder
# COPY --from=builder /app/build /usr/share/nginx/html
# # Add your nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# # Expose port
# EXPOSE 80
# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]



# FROM node as builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install 
# COPY . .
# RUN npm run build
# EXPOSE 8000


# FROM nginx
# COPY --from=builder /app/build /usr/share/nginx/html

FROM node as builder
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 8000

