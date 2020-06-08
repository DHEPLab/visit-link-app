FROM node:12

# Create app directory
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn global add expo-cli
RUN yarn 

# Bundle app source
COPY . .

EXPOSE 19001
EXPOSE 19002
EXPOSE 19003
CMD ["yarn", "start"] 