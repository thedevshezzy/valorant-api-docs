# GET TEXT_CHAT_RNet_FetchSession

Get the current session including player name and PUUID  


Method: `GET`  
URL: `https://127.0.0.1:{lockfile port}/chat/v1/session`  
Headers:
 - `Authorization`: `Basic {base64 encoded "riot:{lockfile password}"}`

Variables:
 - `{lockfile password}` and `{lockfile port}`: Read [Common Components - Lockfile Data](../common-components.md#lockfile-data)

