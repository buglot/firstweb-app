package main

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://192.168.1.45:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Next()
	})

	r.GET("/os", osStatus)
	r.GET("/full", osStatusful)
	r.Run(":1235")
}
func GetOS(s string) string {
	for i := 0; i < 4; i++ {
		if strings.Contains(s, "Windows NT") {
			return "Windows"
		} else if strings.Contains(s, "Android") {
			return "Android"
		} else if strings.Contains(s, "iPhone OS") {
			return "Ios"
		} else {
			return "Linux"
		}
	}

	return "a"
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
