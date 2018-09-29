

# new web app <br/>

### **post request with route '/user'**  
in this receive json object with formate  

```
{
    username: amal123, // [string] [alphanumeric] from 5 to 10 chars 
    email: amal@gmail.com //  
    age: 50 // [number] between 10 to 150
    password:Amal123 //[string] [alphanumeric] no spaces upper\lower case
}
```
### **get request with route '/user/:id'**  
```
{
    id parameter:user id in database

}
```

### **get request with route '/access'**  
```
{
   sign token in header in key 'auth'

}
```
 