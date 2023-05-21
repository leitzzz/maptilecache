const express = require('express');
const app = express();
const axios = require('axios').default;
const fs = require('fs');

const EXPRESS_SERVER_PORT = 80;
const MAPQUEST_KEY = ''; // use your own mapquest key here

app.get('/', (req, res) => {
   res.send("Hello, provide a valid URL!");
});

// demo request: 
// http://x.x.x.x/osm?z=7&x=28&y=55
// https://tile.openstreetmap.org/7/28/55.png
// you can use Laflet using this tile format:
// http://x.x.x.x/osm?z={z}&x={x}&y={z}
app.get("/osm", async (request, response) => {
   // if no exists locally, request the map tile remotely
   if (!fs.existsSync('./areas/osm/' + request.query.z + '_' + request.query.x + '_' + request.query.y + '.png')) {
      const arrayBuffer = await axios.get('https://tile.openstreetmap.org/' + request.query.z + '/' + request.query.x + '/' + request.query.y + '.png', {
         responseType: 'arraybuffer'
      });

      const buffer = Buffer.from(arrayBuffer.data, "base64");
      fs.writeFileSync('./areas/osm/' + request.query.z + '_' + request.query.x + '_' + request.query.y + '.png', buffer);
   }

   // return the map tile image
   response.sendFile(__dirname + '/areas/osm/' + request.query.z + '_' + request.query.x + '_' + request.query.y + '.png');
});


app.get("/mapquest", async (request, response) => {
   // if no exists locally, request the map tile remotely
   if (!fs.existsSync('./areas/mapquest/' + request.query.z + '_' + request.query.x + '_' + request.query.y + '.png')) {
      const arrayBuffer = await axios.get('https://api.mapbox.com/styles/v1/mapquest/ck62b47z90j2j1iqglrzyrhtg/tiles/256/' + request.query.z + '/' + request.query.x + '/' + request.query.y + '@2x?access_token=' + MAPQUEST_KEY, {
         responseType: 'arraybuffer'
      });

      const buffer = Buffer.from(arrayBuffer.data, "base64");
      fs.writeFileSync('./areas/mapquest/' + request.query.z + '_' + request.query.x + '_' + request.query.y + '.png', buffer);
   }

   // return the map tile image
   response.sendFile(__dirname + '/areas/mapquest/' + request.query.z + '_' + request.query.x + '_' + request.query.y + '.png');
});


app.listen(EXPRESS_SERVER_PORT);
