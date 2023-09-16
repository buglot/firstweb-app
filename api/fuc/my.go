package fuc

import (
	"database/sql"
	keyencry "myApi/keyEncry"

	"github.com/gin-gonic/gin"
)

var (
	Db *sql.DB
)

func ChangeName(c *gin.Context) {
	query := "UPDATE accounts_has_key SET nickname = ? WHERE accounts_id = ? and key_idkey = ?"
	idac := c.DefaultQuery("idaccount", "")
	idkey := c.DefaultQuery("idkey", "")
	name := c.DefaultQuery("name", "")
	row := Db.QueryRow(query, name, idac, idkey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": "Error in server. Please try again."})
		return
	}
	c.JSON(200, gin.H{"status": 200, "data": "Nick Name has changed. Please refresh web site"})
}
func Disconect_Key(c *gin.Context) {
	idac := c.DefaultQuery("idaccount", "")
	idkey := c.DefaultQuery("idkey", "")
	query := "DELETE FROM accounts_has_key WHERE accounts_id = ?  and key_idkey = ?"
	row := Db.QueryRow(query, idac, idkey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": "Error in server. Please try again."})
		return
	}
	c.JSON(200, gin.H{"status": 200})
}
func HostKeyshareing(c *gin.Context) {
	idkey := c.DefaultQuery("idkey", "")
	selectw := c.DefaultQuery("w", "")
	keygen := keyencry.GenKey(5, false)
	if selectw == "1" {
		query := "UPDATE mykey SET shareKey = ? WHERE idkey= ?"
		row := Db.QueryRow(query, keygen, idkey)
		if row.Err() != nil {
			c.JSON(500, gin.H{"error": "Internal server error"})
			return
		}
		c.JSON(200, gin.H{"status": 200, "data": keygen})
	}
	if selectw == "2" {
		query := "UPDATE mykey SET shareKey = NULL WHERE idkey= ?"
		row := Db.QueryRow(query, idkey)
		if row.Err() != nil {
			c.JSON(500, gin.H{"error": row.Err().Error()})
			return
		}
		c.JSON(200, gin.H{"status": 200, "data": keygen})

	}

}
func Listuser(c *gin.Context) {
	idkey := c.DefaultQuery("idkey", "")
	query := "select ak.accounts_id, ac.email from accounts_has_key ak,mykey k,accounts ac where ak.accounts_id != k.idhostkey and k.idkey = ? and k.idkey = ak.key_idkey and ac.id = ak.accounts_id"
	rows, err := Db.Query(query, idkey)
	if err != nil {
		c.JSON(406, gin.H{
			"data": 0,
		})
		return
	}
	defer rows.Close()
	dataList := make([]map[string]interface{}, 0)
	for rows.Next() {
		var idac int
		var email string
		err := rows.Scan(&idac, &email)
		if err != nil {
			c.JSON(500, gin.H{"error": "Internal server error"})
			return
		}
		rowData := map[string]interface{}{
			"idac":  idac,
			"email": email,
		}
		dataList = append(dataList, rowData)
	}
	c.JSON(200, dataList)
}

func TranferHost(c *gin.Context) {
	idkey := c.DefaultQuery("idkey", "")
	idac := c.DefaultQuery("idac", "")
	query := "UPDATE mykey SET idhostkey = ? WHERE (idkey = ?);"
	rows, err := Db.Query(query, idac, idkey)
	if err != nil {
		c.JSON(406, gin.H{
			"error": 0,
		})
		return
	}
	defer rows.Close()
	c.JSON(200, gin.H{"status": 200, "data": "You did tranfered host success!"})
}
