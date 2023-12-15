# Task -Use websockets to sync data in realtime NodeJS
SQL
WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection. 
The WebSocket protocol enables interaction between a web browser (or other client application) and a web server with lower overhead than half-duplex alternatives such as HTTP polling,
facilitating real-time data transfer from and to the server. This is made possible by providing a standardized way for the server to send content to the client without being first 
requested by the client, and allowing messages to be passed back and forth while keeping the connection open. In this way, a two-way ongoing conversation can take place between the
client and the server.

### Build a socket.io connection to update data in realtime for all the users interacting with the application. Build simple status box which allows user to add the status and in real time update it to feeds of everyone
1.	Create a MySQL database
2.	Install the dependencies: express, mysql and socket.io
3.	Setup the server.js file with all the dependencies
4.	Use ‘io.on’ to listen to events such as ‘connection’ 
5.	In the client.js file, use ‘socket.emit’ to emit commands which will be caught by the ‘io.on’ on the server.side
6.	Take help of the tutorial provided

React app is found in the client/client folder and the backend in the server folder.
