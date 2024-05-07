const express = require('express');
const dbConnection = require("./config/db");
const cors = require("cors");

// Se crea el servidor 
const app = express();


// Se habilita el cors 
app.use(cors());

// Se habilita express json
app.use(express.json({ extended: true }));

// Se configuran las rutas del proyecto 
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));

// Se configura el puerto
const port = process.env.PORT || 5000;

// Se conecta a la DB 
dbConnection();

// app.get('*', (req, res) => {
//     res.sendFile(`index.html`, { root: www });
// });

// Se configura el sevidor 
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
