package fuc

import (
	"myApi/database"

	"github.com/gin-gonic/gin"
)

func ChangeName(c *gin.Context) {
	db, err := database.GetDB()
	if err != nil {
		c.JSON(500, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()
	query := "UPDATE accounts_has_key SET nickname = ? WHERE accounts_id = ? and key_idkey = ?"
	idac := c.DefaultQuery("idaccount", "")
	idkey := c.DefaultQuery("idkey", "")
	name := c.DefaultQuery("name", "")
	row := db.QueryRow(query, name, idac, idkey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": "Error in server. Please try again."})
		return
	}
	c.JSON(200, gin.H{"status": 200, "data": "Nick Name has changed. Please refresh web site"})
}
func Disconect_Key(c *gin.Context) {
	db, err := database.GetDB()
	if err != nil {
		c.JSON(500, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()
	idac := c.DefaultQuery("idaccount", "")
	idkey := c.DefaultQuery("idkey", "")
	query := "DELETE FROM accounts_has_key WHERE accounts_id = ?  and key_idkey = ?"
	row := db.QueryRow(query, idac, idkey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": "Error in server. Please try again."})
		return
	}
	c.JSON(200, gin.H{"status": 200})
}
