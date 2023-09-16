# Korn กรประตู
font-end/mobile + esp32 project 
## this project use 
- react
- react native
- golang
- mysql

## How to install
### mysql full version
Enter folder `databaseDesign Mysql` and 
run file `database design.mwb` EER Diagram Forward Engineer
### nodejs i use 18.17
Enter folder `my-app` (webapp) 
run `npm install`
for run `npm start`
### golang 
Enter folder `Api`  
for run Api `go run .`
### Arduino 
null
### Mobile
null

## Config for localhost
### Api 
you should enter folder `Api/database/mysql.go` 
In func `GetDB()` 
> dsn := "username:password@tcp(localhost:portmysql)/databasename"

simple

> dsn := "root:123456789@tcp(localhost:3306)/mydb"

### Web
you should enter folder `my-app/src/default/config.js`
> const myIPv4 = "192.168.1.45";

> const url_myAPI ="http://"+myIPv4+":1235";

> const myIP_REACT = myIPv4+":3000";

> export { myIPv4, url_myAPI, myIP_REACT };

### Arduino 
null
### Mobile
null



    