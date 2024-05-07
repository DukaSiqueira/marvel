const users = require("./src/routes/user")
const { signUp } = require('./src/controllers/authenticate')
const { validateLogin } = require('./src/middlewares/validation')
const db = require('./src/db')
const requestLogger = require('./src/middlewares/log')
const cors = require('cors')

const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.use('/users', users)
app.use('/login', validateLogin, signUp)

// Sincroniza a aplicação com o DB (Converte os models em tabelas caso não existam)
db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})