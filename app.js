const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.static(path.join(__dirname)));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const conexion = mysql.createConnection({
    host: "",
    port:   ,
    database: "",
    user: "",
    password: ""
});

conexion.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

app.post('/submit-form', (req, res) => {
    const {
        id,
        nombres,
        apellidos,
        fecha,
        genero,
        identificacion,
        telefono,
        correo,
        grado,
        nombre_colegio,
        nombre_apoderado,
        apellido_apoderado,
        dni_nuevo,
    } = req.body;

    const query = `INSERT INTO Contactos (id, nombres, apellidos, fecha, genero, identificacion, telefono, correo, grado, nombre_colegio, nombre_apoderado, apellido_apoderado, dni_nuevo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conexion.query(query, [
        id,
        nombres,
        apellidos,
        fecha,
        genero,
        identificacion,
        telefono,
        correo,
        grado,
        nombre_colegio,
        nombre_apoderado,
        apellido_apoderado,
        dni_nuevo,
    ], (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ' + err.stack);
            res.status(500).send('Ocurrió un error al procesar tu consulta.');
            return;
        }
        console.log('Datos insertados correctamente.');
        res.send('Datos insertados correctamente.');
    });
});

// Manejador de ruta para validar
app.post('/validar', (req, res) => {
    // Aquí puedes agregar la lógica de validación si es necesario
    // Este manejador de ruta se ejecutará cuando se realice una solicitud POST a /validar
});

/*calendario*/

app.get("/api/dates/:current", (req, res) => {
    var request = req.params.current;
    console.log(`Received request for date: ${request}`);

    const query = "SELECT NAMECAL, DESCCAL, DATE_FORMAT(DATECAL, '%d/%m/%Y') AS DATECAL FROM calendario WHERE DATECAL = ?";
    console.log(query);
    conexion.query(query, [request], function (err, rows, _fields) {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json(null);
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
