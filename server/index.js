const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const pool = require("./db");

app.use(express.json());
app.use(cors());

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Route for file upload
app.post("/upload", upload.single('photo'), async (req, res) => {
  try {
    const { username, address } = req.body;
    const photoPath = req.file ? req.file.path : null;

    // Insert data into PostgreSQL database
    const newData = await pool.query(
      "INSERT INTO signup (username, address, photo_path) VALUES ($1, $2, $3) RETURNING *",
      [username, address, photoPath]
    );

    res.json(newData.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
