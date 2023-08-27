package main

import (
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://192.168.1.45:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Next()
	})
	fmt.Println("Connected to MySQL database!")
	r.POST("/login", loginHandler)
	r.GET("/os", osStatus)
	r.GET("/full", osStatusful)
	r.POST("/f", Pastp)
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{})
	})
	r.GET("/web/login", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{})
	})
	r.GET("/web/app", func(ctx *gin.Context) {
		fmt.Println(ctx.DefaultQuery("m", ""))
		ctx.JSON(200, gin.H{})
	})
	r.GET("/m/app", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{})
	})
	r.POST("/registor", registor)
	r.Run(":1235")

}
func genKey() string {
	keySize := 64
	key := make([]byte, keySize)
	rand.Read(key)
	base64Key := base64.StdEncoding.EncodeToString(key)
	return base64Key
}
func registor(c *gin.Context) {
	db, err := getDB()
	email := c.PostForm("email")
	password := c.PostForm("password")
	if err != nil {
		c.JSON(500, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()
	query1 := "SELECT * FROM accounts WHERE email = ?"
	getRow := db.QueryRow(query1, email)
	var id int
	var xxx string
	var xxx1 string
	var xxx2 string
	var xxx3 string
	getRow.Scan(&id, &xxx, &xxx1, &xxx2, &xxx3)
	println(xxx, email)
	if xxx == email {
		c.JSON(409, gin.H{"error": "This email has been registered already!"})
		return
	}
	query := "INSERT INTO accounts (email, password, mykeyAccountadd,premistion) VALUES (?, ?, ?,?)"
	key := genKey() // สร้างคีย์ที่น่าสนใจ
	ad := "user"
	row := db.QueryRow(query, email, password, key, ad)
	if row.Err() != nil {

		c.JSON(401, gin.H{"error": "has problem server!!!!"})
		return
	}
	sd := choice(GetOS(c.GetHeader("User-Agent")))
	c.JSON(200, gin.H{"status": 200, "redirect": fmt.Sprintf("/%s/login", sd)})
}
func getDB() (*sql.DB, error) {
	dsn := "root:Yongkeat12+@tcp(localhost:3306)/mydb" // แก้ไขเป็นข้อมูลจริง
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
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

func Pastp(c *gin.Context) {
	pc := c.PostForm("email")
	c.JSON(http.StatusOK, pc)
}

func osStatus(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"os": GetOS(c.GetHeader("User-Agent")),
	})
	println(GetOS(c.GetHeader("User-Agent")))
}
func loginHandler(c *gin.Context) {
	email := c.PostForm("email")
	password := c.PostForm("password")
	db, err := getDB()
	if err != nil {
		c.JSON(500, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()
	query := "SELECT  * FROM accounts WHERE email = ? AND password = ?"
	row := db.QueryRow(query, email, password)

	var id int
	var xxx string
	var xxx1 string
	var xxx2 string
	var xxx3 string
	err = row.Scan(&id, &xxx, &xxx1, &xxx2, &xxx3)
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid email or password. Please try again."})
		return
	}
	a := GetOS(c.GetHeader("User-Agent"))
	sd := choice(a)
	c.JSON(200, gin.H{
		"status":      200,
		"redirect":    fmt.Sprintf("/%s/app?m=%s", sd, xxx2),
		"linkprofile": xxx2,
	})
}
func choice(a string) string {
	var sd string
	switch a {
	case "Android":
	case "Ios":
		sd = "m"
		break
	default:
		sd = "web"
	}
	return sd
}
