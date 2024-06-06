const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, "static")));

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: "localhost", // Cambia esto si tu MySQL no está en el mismo servidor
  user: "root", // Tu usuario de MySQL
  password: "root", // Tu contraseña de MySQL
  database: "Escuela", // El nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err.stack);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});


// Ruta para manejar la solicitud POST del formulario
app.post("/validar", (req, res) => {
  const {
    nombres,
    apellidos,
    fecha_nacimiento,
    genero,
    documento_Identidad_student,
    telefono,
    correo,
    postular,
    Colegio__Anterior,
    tutor_nombre,
    tutor_apellido,
    tutor__numero_identificacion

  } = req.body;

  const query = `INSERT INTO pre_Registro 
                 (nombres, apellidos, fecha_Nacimiento, genero, documento_Identidad_student, telefono, correo, postular, Colegio__Anterior, tutor_nombre, tutor_apellido, tutor__numero_identificacion) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [nombres, apellidos, fecha_nacimiento, genero, documento_Identidad_student, telefono, correo, postular, Colegio__Anterior, tutor_nombre, tutor_apellido, tutor__numero_identificacion];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error al insertar datos en la base de datos:", err.stack);
      res.status(500).send("Error al insertar datos en la base de datos");
      return;
    }
    res.send("Datos insertados correctamente");
  });
});

// Ruta para obtener los datos de la tabla pre_Registro
app.get("/datos", (req, res) => {
  const query = "SELECT * FROM pre_Registro";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los datos de la base de datos:", err.stack);
      res.status(500).send("Error al obtener los datos de la base de datos");
      return;
    }
    res.json(results);
  });
});


// Ruta para obtener los datos de la base de datos
app.get("/pre_Registro", (req, res) => {
  // Consulta para obtener todos los registros de la tabla 'students'
  const query = "SELECT * FROM pre_Registro";
  

  // Ejecutar la consulta
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener datos de la base de datos:", err.stack);
      res.status(500).send("Error al obtener datos de la base de datos");
      return;
    }
    // Enviar los resultados como respuesta JSON
    res.json(results);
  });
});





// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});