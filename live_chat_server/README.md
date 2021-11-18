## npm

- npm init -y
  -npm i --save cors nodemon express socket.io
  - cors : socket(localhost:5500)와 client (localhost:3000)와 통신하기 위해서 필요
  - socket.io : socket 을 사용하기 위해서

## package.json에 추가 ( nodemon 을 이용하기 위해)

"scripts": { >> "start": "nodemon index.js",  
"test": "echo \"Error: no test specified\" && exit 1"
},
