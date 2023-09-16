package main

import (
	"database/sql"
	"fmt"
	"myApi/database"
	a "myApi/keyencry"
)

var mysql *sql.DB

func main() {
	var err error
	var input int = 1
	mysql, err = database.GetDB()
	if err != nil {
		return
	}
	for (input <= 2) && (input > 0) {
		fmt.Print("-----menu-----\n")
		fmt.Print("1.gen key\n")
		fmt.Print("2.add key\n")
		fmt.Print("other exit\n")
		fmt.Print(">> ")
		fmt.Scanf("%d ", &input)
		choice(input)
	}
	fmt.Println("Exited!!!")

}
func choice(e int) {
	switch e {
	case 1:
		do1("")
	case 2:
		do1(do2())
	}
}

func do1(key string) {
	if key == "" {
		key = a.GenKey(6, false)
	}
	ck := mysql.QueryRow("select preKey from mykey where preKey = ?", key)
	if ck.Err() != nil {
		fmt.Println("Error INSERT INTO DATABASE")
		return
	}
	var ckx string
	ck.Scan(&ckx)
	if ckx == key {
		fmt.Printf("this '%s' is already try again!!\n", key)
	}
	dodb(key)
}
func do2() string {
	fmt.Println("### add key ###")
	s := ""
	fmt.Scanln(&s)
	return s
}
func dodb(key string) {
	s := mysql.QueryRow("INSERT INTO mykey (preKey) VALUES (?)", key)
	if s.Err() != nil {
		fmt.Println("Error INSERT INTO DATABASE")
		return
	}
	a := mysql.QueryRow("select idkey from mykey where preKey = ?", key)
	if a.Err() != nil {
		fmt.Println("Error DATABASE")
		return
	}
	var id int
	a.Scan(&id)
	w := mysql.QueryRow("INSERT INTO mystate (countuse, countcloserdoor, key_idkey, mykeystatus) VALUES (0, 0, ?, 0)", id)
	if w.Err() != nil {
		fmt.Println("Error DATABASE")
		return
	}
	fmt.Println("data add key :", key)
	fmt.Println("already!!")
}
