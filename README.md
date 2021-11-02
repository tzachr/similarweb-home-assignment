# Similarweb home assignment

## Summery

Similarweb home assignment provides an Youtube videos playlist, shared across clients.


## Description

Each client that connects to this app get a playlist of Youtube videos which him and all other connected clients can edit. All clients can add, and reorder the playlist.
If a video is done playing it will be removed from playlist.
All playlists for all clients are SYNCED.


## Development

To run this app locally, for development:
1. cd into "server" folder and run `npm run start`. this default port is 3034. you can visit http://localhost:3034.
2. cd into "app" folder and run `yarn start`. this default port is 3000. you can visit http://localhost:3000.

To set a different port number please create a `.env` file with a "PORT" property. 


### Tests

To run server's tests cd into "server" folder and run `npm run test`.
To run client's tests cd into "app" folder and run `yarn test`.


## Interacting with the UI

Enter a valid Youtube vide url in the input box and press "Enter"/ click "Add" button.
The video will start playing in the player to the right.
You can add more and more videos as you like. 
As the the video finishes playing, it will be removed from the playlist.
You can drag-n-drop a video in the list and change its playing order in the playlist.


## Scaling

For scaling, I would of course recommend increasing the amount of resources we are giving the application.
Giving the application more CPU will allow the process to serve more clients. 
This solution, of course has a limitation for how many more clients it can serve.

Therefore we need to scale the application using some kind of cluster. Cluster makes setting up child processes sharing server ports in an easy and convenient way.

Implementation wise we can use `cluster module` with:
```
import cluster from 'cluster';
```
and fork workers 
```
const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
```
This will create child processes that all share server ports.

More over to address the problem that in a cluster environment clients will only be able to share the playlist in their own server process. To solve this we can use `socket.io-redis` adaptor which uses Redis as a message broker to pass messages between each process.
The setup will look like this:
```
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('socket.io-redis');
io.adapter(redis({ host: process.env.REDIS_ENDPOINT, port: 6379 }));
```
This creates a network that allows containers to talk to each other by using their hostnames.


## Side notes

For implementing reorder of the playlist i used code found online with some adjustments of my own. its includes the files: app/src/hooks/useMeasurePosition.js and app/src/hooks/usePositionReorder.js.
