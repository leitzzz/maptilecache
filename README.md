Local map tile cache, tries to request the image map tile and storages locally. Tested on Ubuntu 22.04 LTS

Installation:

1. curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
2. bash /tmp/nodesource_setup.sh
3. apt update && apt install nodejs
4. mkdir /install/ && cd /install
5. git clone xxxxxxx
6. cd maptilecache
7. npm i
8. node server.js

If you want to make the script running permanently you must use some package like pm2.

Any suggestion make it!

