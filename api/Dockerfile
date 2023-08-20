# เลือกฐานของ Docker image ที่มี Golang ติดตั้งอยู่
FROM golang:1.20.7-bullseye

# กำหนดไดเร็กทอรีที่จะเป็นที่เก็บโค้ดใน Docker container
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
# คัดลอกโค้ดทั้งหมดไปยัง Docker container
COPY . .

# Build แอพพลิเคชัน Golang
RUN go build -o main .

# พอรันคำสั่งนี้จะทำให้แอพพลิเคชัน Golang เริ่มทำงาน
CMD [ "./main" ]
