import app from "./app.js";
const PORT = process.env.PORT || 3000;
// set up the server PORT
app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`)
})