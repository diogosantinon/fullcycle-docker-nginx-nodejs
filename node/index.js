const express = require('express')
const { faker } = require('@faker-js/faker');
const app = express()
const port = 3000
const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)




app.get('/', (req,res) => {
    
    const randomName = faker.person.firstName(); // Gera um nome aleaotorio
    const sql = `INSERT INTO people(name) values('${randomName}')`
    connection.query(sql)
    
    const query = `SELECT name FROM people;`
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao consultar o banco de dados");
        }

        let html = `
            <html>
            <head>
                <title>People Table</title>
            </head>
            <body>
                <h1>Full Cycle Rocks!</h1>
                <table border="1">
                    <tr><th>Name</th></tr>`;
        
        results.forEach(row => {
            html += `<tr><td>${row.name}</td></tr>`;
        });

        html += `
                </table>
            </body>
            </html>
        `;
        res.send(html);
    });

})

app.listen(port, () => {
	console.log('Rodando na porta ' + port)
})