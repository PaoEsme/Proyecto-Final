const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/signin", async (req, res, next) => {
    const {user_password, user_first_name, user_second_name, user_last_name, user_second_last_name, user_phone, user_mail, user_direction} = req.body

    if (user_password && user_first_name && user_second_name && user_last_name && user_second_last_name && user_phone && user_mail && user_direction) {
        let query = "INSERT INTO user (user_password, user_first_name, user_second_name, user_last_name, user_second_last_name, user_phone, user_mail, user_direction)";
        query += `VALUES (${user_password} , '${user_first_name}', '${user_second_name}', '${user_last_name}', '${user_second_last_name}', ${user_phone}, '${user_mail}', '${user_direction}');`;
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Usuario registrado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.post("/login", async (req, res, next) => {
    const { user_mail, user_password } = req.body
    const query =` SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    if (user_mail && user_password) {
        if(rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id, 
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({code: 200, message: token });
        }
        else {
            return res.status(200).json({code: 401, message: "Ususrio y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.post("/agregar", async (req, res, next) => {
    const {user_password, user_first_name, user_second_name, user_last_name, user_second_last_name, user_phone, user_mail, user_direction} = req.body

    if (user_password && user_first_name && user_second_name && user_last_name && user_second_last_name && user_phone && user_mail && user_direction) {
        let query = "INSERT INTO user (user_password, user_first_name, user_second_name, user_last_name, user_second_last_name, user_phone, user_mail, user_direction)";
        query += `VALUES (${user_password} , '${user_first_name}', '${user_second_name}', '${user_last_name}', '${user_second_last_name}', ${user_phone}, '${user_mail}', '${user_direction}');`;
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Usuario registrado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.delete("/eliminar", async(req, res, next) => {
    const query = `DELETE FROM user WHERE id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

user.put("/modificar", async(req, res, next) => {
    const {user_password, user_first_name, user_second_name, user_last_name, user_second_last_name, user_phone, user_mail, user_direction} = req.body

    if (user_password && user_first_name && user_second_name && user_last_name && user_second_last_name && user_phone && user_mail && user_direction) {
        let query = `UPDATE user SET name='${user_first_name}', second_name='${user_second_name}', last_name='${user_last_name}', second_last_name='${user_second_last_name}',`;
        query += ` phone=${user_phone}, mail='${user_mail}', direction='${user_direction}', password='${user_password}' WHERE id=${req.params.id};`;
    
        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "  Usuario actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.get("/buscar", async (req, res, next) => {
    const query = `GET FROM user WHERE id=${req.params.id}`;
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows});
});

module.exports = user;