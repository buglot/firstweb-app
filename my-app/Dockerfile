# เลือกฐานของ Docker image ที่มี Node.js และ npm ติดตั้งอยู่
FROM node:18.17

# กำหนดไดเร็กทอรีที่จะเป็นที่เก็บโค้ดใน Docker container
WORKDIR /app

# คัดลอก package.json และ package-lock.json ไปยังไดเร็กทอรีที่เลือก
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง Docker container
COPY . .

# พอรันคำสั่งนี้จะทำให้โปรแกรมของคุณเริ่มทำงาน
CMD [ "npm", "start" ]
