package main

import (
	"database/sql"
	"fmt"
	"myApi/database"
	keyencry "myApi/keyEncry"
	osswitch "myApi/osSwitch"
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
	fmt.Println("Connected to MySQL database!")
	r.POST("/login", loginHandler)
	r.GET("/os", osStatus)
	r.GET("/full", osStatusful)
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{})
	})
	r.GET("/web/login", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{})
	})
	r.GET("/web/app", func(ctx *gin.Context) {
		fmt.Println()
		ctx.JSON(200, gin.H{})

	})
	r.GET("/m/app", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{})

	})
	r.POST("/registor", registor)
	r.GET("/d", NameAndKey)
	r.GET("/stateKey", getOnKey)
	r.POST("/connectKey", ConnectedKey)

	r.Run(":1235")

}
func ConnectedKey(c *gin.Context) {
	db, err := database.GetDB()
	if err != nil {
		c.JSON(500, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()
	query1 := "select preKey,shareKey,idhostkey from mykey where preKey =? or shareKey =?"
	keyKey := c.PostForm("key")
	row := db.QueryRow(query1, keyKey, keyKey)
	var shareKey sql.NullString
	var prekey string
	var idhostkey sql.NullInt16
	err = row.Scan(&prekey, &shareKey, &idhostkey)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(500, gin.H{"error": "Invalid Key in server. Please try again."})
		return
	}
	fmt.Println("idhostkey:", idhostkey == sql.NullInt16{})
	if (idhostkey == sql.NullInt16{}) {
		c.JSON(500, gin.H{"status": 200})
		return
	}
	if (shareKey != sql.NullString{}) {
		c.JSON(500, gin.H{"status": 200})
		return
	} else {
		c.JSON(500, gin.H{"error": "Invalid Key in server. Please try again."})
	}

}
func getOnKey(c *gin.Context) {
	db, err := database.GetDB()
	if err != nil {
		c.JSON(500, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()
	query1 := "select key_idkey,nickname,K.preKey from mykey K ,accounts_has_key where accounts_id=? and K.idkey = key_idkey"
	id := c.DefaultQuery("id", "")
	rows, err := db.Query(query1, id)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(406, gin.H{
			"data": 0,
		})
		return
	}
	defer rows.Close()

	dataList := make([]map[string]interface{}, 0) // Use interface{} to handle NULL values

	for rows.Next() {
		var keyname int
		var prekey string
		var nickname sql.NullString // Use sql.NullString to handle NULL strings
		err := rows.Scan(&keyname, &nickname, &prekey)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(500, gin.H{"error": "Internal server error"})
			return
		}

		// Create a map for the current row's data
		rowData := map[string]interface{}{
			"keyname":  keyname,
			"nickname": nickname.String,
			"codeKey":  prekey, // Get the actual string value if not NULL
		}

		dataList = append(dataList, rowData)
	}

	c.JSON(200, gin.H{
		"status": 200,
		"data":   dataList,
	})
}

func NameAndKey(c *gin.Context) {
	db, err := database.GetDB()
	if err != nil {
		c.JSON(500, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()
	key := c.DefaultQuery("m", "")
	d := strings.Split(key, "+")
	fmt.Println("my key :    ", d)
	query := "select id,email from accounts   where mykeyAccountadd =?"
	getRow := db.QueryRow(query, key)
	var email string
	var id int
	err = getRow.Scan(&id, &email)
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid link"})
		return
	}
	c.JSON(200, gin.H{
		"status": 200,
		"id":     id,
		"email":  email,
	})
}

func registor(c *gin.Context) {
	db, err := database.GetDB()
	email := c.PostForm("email")
	password := c.PostForm("password")
	if err != nil {
		c.JSON(500, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()
	query1 := "SELECT email FROM accounts WHERE email = ?"
	getRow := db.QueryRow(query1, email)
	var xxx string
	getRow.Scan(&xxx)
	fmt.Println(xxx, email)
	if xxx == email {
		c.JSON(409, gin.H{"error": "This email has been registered already!"})
		return
	}
	query := "INSERT INTO accounts (email, password, mykeyAccountadd,premistion) VALUES (?, ?, ?,?)"
	key := keyencry.GenKey() // สร้างคีย์ที่น่าสนใจ
	ad := "user"
	row := db.QueryRow(query, email, password, key, ad)
	if row.Err() != nil {

		c.JSON(401, gin.H{"error": "has problem server!!!!"})
		return
	}
	sd := osswitch.ChoiceSwitch(osswitch.GetOS(c.GetHeader("User-Agent")))
	c.JSON(200, gin.H{"status": 200, "redirect": fmt.Sprintf("/%s/login", sd)})
}

func osStatusful(c *gin.Context) {
	data := map[string]string{"User-Agent": c.GetHeader("User-Agent")}
	c.JSON(http.StatusOK, data)
}

func osStatus(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"os": osswitch.GetOS(c.GetHeader("User-Agent")),
	})
	fmt.Println(osswitch.GetOS(c.GetHeader("User-Agent")))
}
func loginHandler(c *gin.Context) {
	email := c.PostForm("email")
	password := c.PostForm("password")
	db, err := database.GetDB()
	if err != nil {
		c.JSON(500, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()
	query := "SELECT * FROM accounts WHERE email = ? AND password = ?"
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
	a := osswitch.GetOS(c.GetHeader("User-Agent"))
	sd := osswitch.ChoiceSwitch(a)
	c.JSON(200, gin.H{
		"status":      200,
		"redirect":    fmt.Sprintf("/%s/app?m=%s", sd, xxx2),
		"linkprofile": xxx2,
	})
}
