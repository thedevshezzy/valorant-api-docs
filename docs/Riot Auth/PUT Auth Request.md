# PUT Auth Request

Perform authorization request to get token  
Requires cookies from the [Auth Cookies](POST%20Auth%20Cookies.md) stage. The token can be found in the `uri` property.  


Method: `PUT`  
URL: `https://auth.riotgames.com/api/v1/authorization`  
Headers:
 - `Content-Type`: `application/json`

Body:  
```
{
    "type": "auth",
    "username": "{username}",
    "password": "{password}",
    "remember": true,
    "language": "en_US"
}
```
Variables:
 - `{username}`: The player username / email for signing in
 - `{password}`: The player password for signing in

