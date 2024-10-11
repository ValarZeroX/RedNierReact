# 使用 Node.js 22 作為基礎映像
FROM node:20

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝項目依賴
RUN npm install

# 複製所有源代碼
COPY . .

# 構建 React 應用
RUN npm run build

# 安裝 Serve 來提供靜態資源
RUN npm install -g serve

# 暴露前端應用埠
EXPOSE 3000

# 使用 Serve 提供編譯後的靜態文件
CMD ["serve", "-s", "build"]