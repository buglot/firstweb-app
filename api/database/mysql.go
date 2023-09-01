package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func GetDB() (*sql.DB, error) {
	dsn := "root:Yongkeat12+@tcp(localhost:3306)/mydb" // แก้ไขเป็นข้อมูลจริง
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}
