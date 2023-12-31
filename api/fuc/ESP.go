package fuc

import (
	reportstate "myApi/reportState"

	"github.com/gin-gonic/gin"
)

func KeyHardwarcheck(c *gin.Context) {
	query := "select B.mykeystatus,B.countuse,B.countcloserdoor from mystate B,mykey A where A.preKey=? and B.key_idkey =A.idkey;"
	key := c.DefaultQuery("key", "")
	row := Db.QueryRow(query, key)
	var KeyState int
	var countuse int
	var countclose int
	err1 := row.Scan(&KeyState, &countuse, &countclose)
	if err1 != nil {
		c.JSON(500, gin.H{"error": "Error in server. Please try again."})
		return
	}
	c.JSON(200, KeyState)
}
func DowithDoorWeb(c *gin.Context) {
	idkey := c.PostForm("idkey")
	wDO := c.PostForm("c")
	who := c.PostForm("who")
	query := "UPDATE mystate SET mykeystatus = ? WHERE key_idkey= ?;"
	row := Db.QueryRow(query, wDO, idkey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"status": 500, "error": row.Err().Error()})
		return
	}
	if wDO == "1" {
		reportstate.SendReportS(idkey, who, "Open Door")
		c.JSON(200, gin.H{"status": 200, "st": 1})
		return
	}
	reportstate.SendReportS(idkey, who, "Close Door")
	c.JSON(200, gin.H{"status": 200, "st": 0})
}
func Keycheck(c *gin.Context) {
	query := "select mykeystatus,countuse,countcloserdoor from mystate where key_idkey=?;"
	key := c.DefaultQuery("idkey", "")
	row := Db.QueryRow(query, key)
	var KeyState int
	var countuse int
	var countclose int
	err1 := row.Scan(&KeyState, &countuse, &countclose)
	if err1 != nil {
		c.JSON(500, gin.H{"error": "Error in server. Please try again."})
		return
	}
	c.JSON(200, KeyState)
}
func DowithDoorESP(c *gin.Context) {
	key := c.DefaultQuery("key", "")
	wDO := c.DefaultQuery("c", "")
	who := c.DefaultQuery("who", "")
	query := "UPDATE mystate SET mykeystatus = ? WHERE key_idkey= (select idkey from mykey where prekey=?);"
	row := Db.QueryRow(query, wDO, key)
	if row.Err() != nil {
		c.JSON(500, gin.H{"status": 500, "error": row.Err().Error()})
		return
	}
	if wDO == "1" {
		reportstate.SendReportESP(key, who, "Open Door")
		c.JSON(200, 1)
		return
	}
	reportstate.SendReportESP(key, who, "Close Door")
	c.JSON(200, 0)
}
