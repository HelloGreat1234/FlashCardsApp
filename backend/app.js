

const express = require('express')

const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const adminRotuer = require('./routes/admin')
const userRotuer = require('./routes/user')

app.use('/api/admin',adminRotuer);
app.use('/api/user',userRotuer);

const port = process.env.PORT || 3000;

app.get('/test',(req,res)=>{
  res.send("hello buddy")
})

app.listen(port,()=>{
  console.log("Server running on port ",port)
})