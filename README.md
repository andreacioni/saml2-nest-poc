## Build
```sh
npm run build
npm start
```

## Test

curl -X GET http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY2MjIxMzY2MSwiZXhwIjoxNjYyMjEzNzIxfQ.fGvYAF2Su8JUJehIhE20xThkc_Sn84g55Fst-BLqihI"

curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
