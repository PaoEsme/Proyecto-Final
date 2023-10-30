const express = require('express');
const pokemon = express.Router();
const db = require('/config/database');

pokemon.post("/", async(req, res, next) => {
    const { name, second_name, first_last_name, second_last_name, phone_number, mail, direction, password } = req.body;
    
    if(name && second_name && first_last_name && second_last_name && phone_number && mail && direction && password ) {
        let query = "INSERT INTO employees (name, second_name, first_last_name, second_last_name, phone_number, email, direction, password)";
        query += ` VALUES('${name}', '${second_name}', '${first_last_name}', '${second_last_name}', ${phone_number}, '${mail}', '${direction}', '${password}')`;
    
        const rows = await db.query(query);
        console.log(rows);

        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Usuario insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.delete("/", async(req, res, next) => {
    function init() {
        document.querySelector('.btn-secundary1').addEventListener('click', function() {
            window.location.href = "eliminar.html"
        });
    }
    const query = `DELETE FROM employees WHERE id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

pokemon.put("/", async(req, res, next) => {
    function init() {
        document.querySelector('.btn-primary2').addEventListener('click', function() {
            window.location.href = "modificar.html"
        });
    }
    const { name, second_name, first_last_name, second_last_name, phone_number, mail, direction, password } = req.body;

    if(name && second_name && first_last_name && second_last_name && phone_number && mail && direction && password ) {
        let query = `UPDATE employees SET name='${name}', second_name='${second_name}', first_last_name='${first_last_name}', second_last_name='${second_last_name}',`;
        query += ` phone_number=${phone_number}, mail='${mail}', direction='${direction}', password='${password}' WHERE id=${req.params.id};`;
    
        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Pokemon actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.get("/", async (req, res, next) => {
    function init() {
        document.querySelector('.btn-secundary2').addEventListener('click', function() {
            window.location.href = "buscar.html"
        });
    }
    const query = `GET FROM employees WHERE id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        const pkmn = await db.query("SELECT * FROM employees");
        return res.status(200).json({code: 1, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

module.exports = pokemon;