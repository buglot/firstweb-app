#include <ESP32Servo.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <Wire.h>
#include <MFRC522.h>
#define SS_PIN 5
#define RST_PIN 17
#define MCP23017 0x20

#define CODEKEY "cMn1PuVJ"

MFRC522 mfrc522(SS_PIN, RST_PIN);

String code = CODEKEY;
const char* ssid = "Baskungza";
const char* password = "vobq3309";

String Openoff = "";
String ChangeOpenoff = "";
Servo myServo;
String urlAPI = "http://192.168.1.33:1235";
long timeset = 0;
long timeset_1 = 0;
long timeset_3 = 0;
void Servo() {
  if (Openoff != ChangeOpenoff) {
    ChangeOpenoff = Openoff;
    if (!Openoff.compareTo("1")) {
      myServo.write(90);
      delay(1000);
    } else if (!Openoff.compareTo("0")) {
      myServo.write(180);
      delay(1000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  //connect wifi
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.printf("Connect Wifi %s\n", ssid);
  ChangeOpenoff = Openoff;
  //Servo ขา 13
  myServo.attach(13);
  myServo.write(180);
  delay(1000);

  SPI.begin();
  mfrc522.PCD_Init();

  Wire.begin();
  // IODIRA 0x00
  Wire.beginTransmission(MCP23017);
  Wire.write(0x00); // ตำแหน่งที่เก็บการตั้งค่าขา GPA7 
  Wire.write(0x80); // ค่าที่ใช้ตั้งค่า GPA7 เป็นอินพุต (1) 1000 0000
  Wire.endTransmission();
  delay(500);
}
void GetWeb(String urSubq) {
  HTTPClient http;
  http.begin(urlAPI + urSubq);
  int httpResponseCode = http.GET();
  if (httpResponseCode > 0) {
    Openoff = http.getString();
  } else {
    Serial.print("HTTP GET Error: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
void PostWeb(String urllink,String postdata){
  HTTPClient http;
  http.begin(urlAPI + urllink); 
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  int httpCode = http.POST(postdata);
  if (httpCode > 0) {
    String response = http.getString();
    Serial.println("HTTP Response: " + response);
  } else {
    Serial.println("HTTP POST request failed.");
  }
  http.end();
}
void PIR() {
  Wire.beginTransmission(MCP23017);
  Wire.write(0x12); // ตำแหน่งที่เก็บค่าขา GPA0-7
  Wire.endTransmission();

  Wire.requestFrom(MCP23017, 1);
  byte value = Wire.read();
  PostWeb("/espPIR","codeKey="+code+"&value="+String((value >> 7) & 1, BIN));
  // แสดงค่าที่อ่าน
  Serial.println("ค่าที่อ่านจาก GPA7: " + String((value ) & 10000000, BIN));
  Serial.println("ค่าที่อ่านจาก GPA7: " + String((value >> 7) & 1, BIN));
  
}
void RFID() {
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    if (!Openoff.compareTo("1")) {
      PostWeb("/espOpenClose","codeKey="+code+"&type=0");
    } else {
      PostWeb("/espOpenClose","codeKey="+code+"&type=1");
    }
    Serial.println(String(mfrc522.uid.uidByte[1],10));
    mfrc522.PICC_HaltA();
  }
}
void loop() {
  if (millis() - timeset > 500) {
    timeset = millis();
    Servo();
    RFID();
    
  }
  if (millis() - timeset_1 > 1000) {
    timeset_1 = millis();
    GetWeb("/espCheck?codeKey=" + code);
  }

  if (millis() - timeset_3 > 3000) {
    timeset_3 = millis();
    PIR();
  }
  if (Serial.available()) {
    String commend = Serial.readString();
    commend.trim();
    if (commend.charAt(0) == 'u') {
      commend.replace("u:", "");
      urlAPI = "http://" + commend;
    }
  }
}
