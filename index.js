const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const { sessionMiddleware, flashMiddleware, setLocalsMiddleware } = require("./middlewares/middleware");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));

// Middleware'leri burada kullanıyoruz
app.use(sessionMiddleware);
app.use(flashMiddleware);
app.use(setLocalsMiddleware);

app.use(userRoutes);

app.listen(3000, () => {
   console.log("Listening on port 3000"); 
});
