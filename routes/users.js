const express = require("express");
const router = express.Router();
const db = require("../data/db");

// Kayıt formu sayfasını göster
router.get("/register", (req, res) => {
    res.render("register");  // register.ejs dosyasını render eder
});

// Ürün detayları
router.get("/products/:id", async function(req, res) {
    try {
        const [product] = await db.execute("SELECT * FROM products WHERE id=?", [req.params.id]);
        if (!product.length) {
            return res.status(404).render("404");
        }
        res.render("products-details", { urun: product[0] });
    } catch (err) {
        console.log(err);
    }
});

// Aktif ürünler
router.get("/products", async function(req, res) {
    try {
        const [products] = await db.execute("SELECT * FROM products WHERE isActive=1");
        res.render("products", { urunler: products });
    } catch (err) {
        console.log(err);
    }
});

// Ana sayfa
router.get("/", async function(req, res) {
    try {
        const [products] = await db.execute("SELECT * FROM products WHERE isHome=1 AND isActive=1");
        res.render("index", { urunler: products, });
    } catch (err) {
        console.log(err);
    }
});

// Kayıt ol (register) route'u
router.post("/register", async (req, res) => {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
        return res.status(400).send("Tüm alanlar zorunludur.");
    }

    try {
        await db.execute(
            "INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)",
            [name, surname, email, password]
        );
        req.flash("success", "Kayıt başarıyla tamamlandı!");  // Flash mesaj ekleniyor
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("Bir hata oluştu.");
    }
});

// 404 handler
router.use((req, res) => {
    res.status(404).render("404");
});

module.exports = router;
