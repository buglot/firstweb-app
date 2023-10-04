#include <ESP32Servo.h>
#include <WiFi.h>
#include <HTTPClient.h>
#define CODEKEY "cMn1PuVJ"
String code = CODEKEY;
const char* ssid = "C518_2.4G";
const char* password = "4E9D8900";
String Openoff="";
String ChangeOpenoff="";
Servo myServo;
String urlAPI = "http://192.168.1.36:1235/";  
long timeset=0;
long timeset_3=0;
void Servo(){
  if(Openoff!=ChangeOpenoff){
    ChangeOpenoff=Openoff;
    if(!Openoff.compareTo("1")){
      myServo.write(90);
      delay(1000);
    }else if(!Openoff.compareTo("0")){
      myServo.write(180);
      delay(1000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid,password);
  //connect wifi
  while(WiFi.status()!=WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.printf("Connect Wifi %s\n",ssid);
  ChangeOpenoff=Openoff;
  //Servo ขา 13
  myServo.attach(13);
  myServo.write(180);
  delay(1000);
  
 
}
void GetWeb(String urSubq){
  HTTPClient http;
  http.begin(urlAPI+urSubq);
  int httpResponseCode = http.GET();
  if (httpResponseCode > 0) {
    Openoff = http.getString();
  } else {
    Serial.print("HTTP GET Error: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
void loop() {
  if(millis()-timeset>500){
    timeset=millis();
    Servo();
    
  }
  if(millis()-timeset_3>1000){
    timeset_3=millis();
    GetWeb("Hardwarcheck?key="+code);
  }
  

}
