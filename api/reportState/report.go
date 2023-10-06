package reportstate

import (
	"database/sql"
	"fmt"
	"time"
)

var Mysql *sql.DB

func SendReport(id int, who string, msg string) {
	query1 := "INSERT INTO history (mykey_idkey, historycol, time, report) VALUES (?, ?, ?, ?);"
	times := time.Now().Format("15:04:05")
	dataNow := time.Now().Format("2006-01-02")
	mix := fmt.Sprintf("%s %s", who, msg)
	row, err := Mysql.Query(query1, id, dataNow, times, mix)
	if err != nil {
		fmt.Println("Error - REPORT IN PUT TO Database")
	}
	row.Close()
}
func SendReportS(id string, who string, msg string) {
	query1 := "INSERT INTO history (mykey_idkey, historycol, time, report) VALUES (?, ?, ?,?);"
	times := time.Now().Format("15:04:05")
	dataNow := time.Now().Format("2006-01-02")
	mix := fmt.Sprintf("%s %s", who, msg)
	row, err := Mysql.Query(query1, id, dataNow, times, mix)
	if err != nil {
		fmt.Println("Error - REPORT IN PUT TO Database")
		fmt.Println(err.Error())
	}
	row.Close()
}

func SendReportESP(id string, who string, msg string) {
	fmt.Println(id)
	query1 := "INSERT INTO history (mykey_idkey, historycol, time, report) VALUES ((select idkey from mykey where prekey=?), ?, ?,?);"
	times := time.Now().Format("15:04:05")
	dataNow := time.Now().Format("2006-01-02")
	mix := fmt.Sprintf("%s %s", who, msg)
	row, err := Mysql.Query(query1, id, dataNow, times, mix)
	if err != nil {
		fmt.Println("Error - REPORT IN PUT TO Database")
		fmt.Println(err.Error())
	}
	row.Close()
}
