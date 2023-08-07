package main

import (
	"Iapi/ap"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetOS(s string) string {
	for i := 0; i < 4; i++ {
		if strings.Contains(s, "Windows NT") {
			return "Windows"
		} else if strings.Contains(s, "Android") {
			return "Android"
		} else if strings.Contains(s, "iPhone OS") {
			return "iso"
		} else {
			return "Linux"
		}
	}

	return "a"
}

func main() {

	fmt.Printf("i am peter \n")
	fmt.Printf("%d", ap.Mp(5, 5))
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://192.168.1.45:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Next()
	})

	r.GET("/os", osStatus)
	r.GET("/", index)
	r.GET("/full", osStatusful)
	r.POST("/login", loginHandler)
	r.Run()
}
func index(c *gin.Context) {
	cookie, err := c.Cookie("logins")
	if err == nil {
		c.JSON(http.StatusOK, gin.H{
			"os":         GetOS(c.GetHeader("User-Agent")),
			"Login save": "nil",
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"os":         GetOS(c.GetHeader("User-Agent")),
			"Login save": cookie,
		})
	}

}
func osStatusful(c *gin.Context) {
	data := map[string]string{"User-Agent": c.GetHeader("User-Agent")}
	c.JSON(http.StatusOK, data)
}
func osStatus(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"os": GetOS(c.GetHeader("User-Agent")),
	})
	println(GetOS(c.GetHeader("User-Agent")))
}
func loginHandler(c *gin.Context) {
	// ค้นหาข้อมูลผู้ใช้จากฐานข้อมูล หรือเป็นตัวอย่างเรียกใช้งานแบบคงที่
	username := c.PostForm("username")
	password := c.PostForm("password")
	cookie, err := c.Cookie("logins")
	// ตรวจสอบชื่อผู้ใช้และรหัสผ่านในฐานข้อมูล (หรือตรวจสอบการตรงกับข้อมูลที่ตั้งค่าคงที่)
	// ในที่นี้จะใช้ข้อมูลคงที่เป็นตัวอย่างเท่านั้น
	if err != nil {
		println("d")
	}
	if username == "user123" && password == "pass456" {
		c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
		c.SetCookie("logins", "true", 3600, "/", "localhost:5050", false, true)
		println("P", cookie)
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
	}
}
