


#  Documentation
![dess](https://user-images.githubusercontent.com/122130140/233806518-4f0e6edb-af2e-4a70-82b0-7e6355b7009b.gif)


__How to install__
```cli
npm install --save desslib
```
__Implementation__
* after creating a node project
* run on cli
```bash 
npm init
``` 
to create your package.json
* You must have it before installing
# About Having a Server:
```text
Desslib already has in-built express server
```
# How to use :
```js
const {keepAlive ,init }= require ('desslib')
const PORT = 2023
//@KeepAlive express server,runs when bool is true
keepAlive(true,PORT,(err)=>{
if(err){
console.log(err)
return
}
});

//Main Function to simplify hundreds lines of code to fewer lines
const myAppstate ='appstate.json'

init(myAppstate,(err,listener)=>{
//check login errors
if(err){
console.log(err)
return
}
//Listen for event types
//NOTE 🔰:Read @schmarvery/facebook-chat-api docs for event types
listener.when('message',(err, message,api)=>{
//Listener errors
if(err){
console.log(err)
return
}
//my api class has only one method: reply('msg',threadID)
//Example to send messages
( { body ,senderID,threadID} = message)

if(body ==='i love desslib'){
api.reply('yes,it\'s simple and saves times',threadID)
      }
   })
});
```
