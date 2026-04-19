import dotenv from "dotenv";
dotenv.config({ path: './.env' })
import app from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`SERVER running at PORT: ${PORT}`)
        )
    })
    .catch((err) => console.log("MONGODB connection failed!!!! ", err)
    )



























/*
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR ", error);
            throw error

        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);

        })

    } catch (error) {
        console.log("ERROR: ", error);
        throw error;

    }
})()
*/