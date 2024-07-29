import express from "express"
import {PORT} from "./config.js"

const app = express()

app.get("/", (req,res) => {
    console.log(req)
    return res.status(200).json({"message": "welcome"})
});

app.listen(PORT, () => {
    console.log("listening to port 5000");
    console.log("START")
})