import * as dotenv from 'dotenv'
dotenv.config()
import app from './server'
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on localhost on port : ${port}`)
})