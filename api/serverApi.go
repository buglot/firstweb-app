package main

import (
	"database/sql"
	"fmt"
	"myApi/database"
	"myApi/fuc"
	keyencry "myApi/keyEncry"
	osswitch "myApi/osSwitch"
	reportstate "myApi/reportState"
	s "myApi/reportState"
	"net/http"

	"github.com/gin-gonic/gin"
)

var db *sql.DB

func main() {
	var err error
	db, err = database.GetDB()
	fuc.Db = db
	reportstate.Mysql = db
	if err != nil {
		fmt.Println("Error connecting to the database:", err)
		return
	}
	defer db.Close()
	r := gin.Default()
	r.Use(CORSMiddleware())
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
		ctx.JSON(200, gin.H{})

	})
	r.GET("/m/app", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{})

	})
	r.POST("/registor", registor)
	r.GET("/d", NameAndKey)
	r.GET("/stateKey", getOnKey)
	r.POST("/connectKey", ConnectedKey)
	r.GET("/changeName", fuc.ChangeName)
	r.GET("/disconectkey", fuc.Disconect_Key)
	r.GET("/genKeyshare", fuc.HostKeyshareing)
	r.GET("/listUserkey", fuc.Listuser)
	r.GET("/HistoryKeys", fuc.StateKey)
	r.GET("/tranferhost", fuc.TranferHost)
	r.GET("/Hardwarcheck", fuc.KeyHardwarcheck)
	r.GET("/Softcheck", fuc.Keycheck)
	r.POST("/OpenClose", fuc.DowithDoor)
	r.Run(":1235")

}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
func ConnectedKey(c *gin.Context) {

	query1 := "select idkey,preKey,shareKey,idhostkey from mykey where preKey =? or shareKey =?"
	keyKey := c.PostForm("key")
	id := c.PostForm("id")
	name := c.PostForm("name")
	row := db.QueryRow(query1, keyKey, keyKey)
	var shareKey sql.NullString
	var idkey int
	var prekey string
	var idhostkey sql.NullInt16
	err := row.Scan(&idkey, &prekey, &shareKey, &idhostkey)
	if err != nil {
		c.JSON(500, gin.H{"error": "Invalid Key in server. Please try again."})
		return
	}
	//host key
	if (idhostkey == sql.NullInt16{}) {
		query2 := "UPDATE mykey SET idhostkey = ? WHERE idkey = ?"
		row := db.QueryRow(query2, id, idkey)
		if row.Err() != nil {
			c.JSON(500, gin.H{"error": "Error in server. Please try again."})
			return
		}

		query3 := "INSERT INTO accounts_has_key (accounts_id, key_idkey) VALUES (?, ?);"
		row1 := db.QueryRow(query3, id, idkey)
		if row1.Err() != nil {
			c.JSON(500, gin.H{"error": "Error in server. Please try again."})
			return
		}
		s.SendReport(idkey, "(Host)", "Enter key")
		c.JSON(200, gin.H{"status": 200})
		return
	}
	//connect from shareKey
	if (shareKey != sql.NullString{}) && (shareKey.String == keyKey) {
		var i int16
		_, err := fmt.Sscanf(id, "%d", &i)
		if err != nil {
			fmt.Println("ไม่สามารถแปลงเป็น int ได้")
			return
		}
		if idhostkey.Int16 == i {
			c.JSON(500, gin.H{"error": "This key is connected. Please dont put it add"})
			return
		}
		query3 := "INSERT INTO accounts_has_key (accounts_id, key_idkey) VALUES (?, ?);"
		row2 := db.QueryRow(query3, id, idkey)
		if row2.Err() != nil {
			c.JSON(500, gin.H{"error": "This key is connected. Please dont put it add"})
			return
		}
		s.SendReport(idkey, "("+name+")", "Join Key *****"+keyKey[5:])
		c.JSON(200, gin.H{"status": 200})
		return
	} else {
		c.JSON(500, gin.H{"error": "Invalid Key in server. Please try again."})
	}

}
func getOnKey(c *gin.Context) {
	query1 := "select key_idkey,nickname,K.preKey,B.email,A.email,K.shareKey from mykey K ,accounts_has_key,accounts A,accounts B where accounts_id=? and K.idkey = key_idkey and A.id = K.idhostkey and B.id = ?;"
	id := c.DefaultQuery("id", "")
	rows, err := db.Query(query1, id, id)
	if err != nil {
		c.JSON(406, gin.H{
			"data": 0,
		})
		return
	}
	defer rows.Close()

	dataList := make([]map[string]interface{}, 0) // Use interface{} to handle NULL values

	for rows.Next() {
		var keyname int
		var useremail string
		var prekey string
		var hostemail string
		var nickname sql.NullString // Use sql.NullString to handle NULL strings
		var shareKey sql.NullString
		err := rows.Scan(&keyname, &nickname, &prekey, &useremail, &hostemail, &shareKey)
		if err != nil {
			c.JSON(500, gin.H{"error": "Internal server error"})
			return
		}
		hostkey := true
		if useremail != hostemail {
			prekey = hostemail
			hostkey = false
		}
		rowData := map[string]interface{}{
			"idkey":    keyname,
			"nickname": nickname.String,
			"codeKey":  prekey,
			"shareKey": shareKey.String,
			"hostkey":  hostkey,
		}

		dataList = append(dataList, rowData)
	}

	c.JSON(200, gin.H{
		"status": 200,
		"data":   dataList,
	})
}

func NameAndKey(c *gin.Context) {
	key := c.DefaultQuery("m", "")
	query := "select id,email from accounts   where mykeyAccountadd =?"
	getRow := db.QueryRow(query, key)
	var email string
	var id int
	err := getRow.Scan(&id, &email)
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid link " + err.Error()})
		return
	}
	c.JSON(200, gin.H{
		"status": 200,
		"id":     id,
		"email":  email,
	})
}

func registor(c *gin.Context) {

	email := c.PostForm("email")
	password := c.PostForm("password")
	query1 := "SELECT email FROM accounts WHERE email = ?"
	getRow := db.QueryRow(query1, email)
	var xxx string
	getRow.Scan(&xxx)
	if xxx == email {
		c.JSON(409, gin.H{"error": "This email has been registered already!"})
		return
	}
	query := "INSERT INTO accounts (email, password, mykeyAccountadd,premistion) VALUES (?, ?, ?,?)"
	key := keyencry.GenKey(128, true) // สร้างคีย์ที่น่าสนใจ
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
}
func loginHandler(c *gin.Context) {
	email := c.PostForm("email")
	password := c.PostForm("password")
	query := "SELECT * FROM accounts WHERE email = ? AND password = ?"
	row := db.QueryRow(query, email, password)

	var id int
	var xxx string
	var xxx1 string
	var xxx2 string
	var xxx3 string
	err := row.Scan(&id, &xxx, &xxx1, &xxx2, &xxx3)
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid email or password. Please try again."})
		return
	}
	a := osswitch.GetOS(c.GetHeader("User-Agent"))
	sd := osswitch.ChoiceSwitch(a)
	c.JSON(200, gin.H{
		"status":      200,
		"redirect":    fmt.Sprintf("/%s/app?m=%s&&page=0", sd, xxx2),
		"linkprofile": xxx2,
	})
}
