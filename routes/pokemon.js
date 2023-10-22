const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", async(req, res, next) => {
    const { name, second_name, first_last_name, second_last_name, phone_number, mail, direction, password } = req.body;
    
    if(name && second_name && first_last_name && second_last_name && phone_number && mail && direction && password ) {
        let query = "INSERT INTO employees (name, second_name, first_last_name, second_last_name, phone_number, email, direction, password)";
        query += ` VALUES('${name}', '${second_name}', '${first_last_name}', '${second_last_name}', ${phone_number}, '${mail}', '${direction}', '${password}')`;
    
        const rows = await db.query(query);
        console.log(rows);

        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Pokemon insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.delete("/:id([0-9]{1,3})", async(req, res, next) => {
    const query = `DELETE FROM employees WHERE id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Pokemon borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
});

pokemon.put("/:id([0-9]{1,3})", async(req, res, next) => {
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
    const pkmn = await db.query("SELECT * FROM employees");
    return res.status(200).json({code: 1, message: pkmn});
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 1 && id <= 800) {
        const pkmn = await db.query("SELECT * FROM employees WHERE id="+id+";");
        return res.status(200).json({code: 200, message: "Pokemon no encontrado"});
    }
    return res.status(404).send({code: 404, message: "Pokemon no encontrado"});
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM employees WHERE name='"+name+"';");
    if (pkmn.length > 0) { 
        return res.status(200).send(pkmn);
    } 
    return res.status(200).json({code: 404, message: "Pokemon no encontrado"});
});

module.exports = pokemon;