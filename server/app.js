// aquí tu servidor
// Debe recibir peticiones al endpoint '/comprobarDNI'
// Devuelve un error 404 en cualquier otro caso
// El servidor debe procesar los parámetros de la QueryString. Mirad otros ejemplos de como hacerlo en ejercicios anteriores.

const http = require('http')
const querystring = require('querystring')

const DNI = require('./DNI')

http.createServer((req, res) => {
    console.log("Petición recibida " + req.url)
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
    };

    if (!req.url.includes('/comprobarDNI') || req.method != 'GET') {
        res.writeHead(404, headers)
        return res.end('404 Recurso no encontrado')
    }
    console.log('peticion recibida:' + req.url)

    // recupero DNI y caducidad de la QueryString
    let myQueryString = req.url.split('?')[1]
    const query = querystring.parse(myQueryString)

    console.log(query)

    //const esDniValido = new DNI("Test", '40538588A', '2022-12-12').esDniValido()
    // Creamos una nueva instancia de la clase DNI; la cual nos ofrece unos métodos para comprobar si el DNI es correcto y/o si está caducado 

    const nuevoDNI = new DNI("Test", query.dni, query.caducidad)

    const esNumeroValido = nuevoDNI.esDniValido()
    const estaDniCaducado = nuevoDNI.estaCaducado()
    const esDniCriminal = nuevoDNI.esDniCriminal()

    const esDniValido = esNumeroValido && !estaDniCaducado

    res.writeHead(200, headers)
    res.end(JSON.stringify({esDniValido: esDniValido, criminalBuscado: esDniCriminal}));
    return;
}).listen(3000)
