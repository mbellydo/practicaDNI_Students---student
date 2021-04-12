// 1. Asociar un evento click a todas las filas de la tabla
// 2. Al hacer click en una fila, comprobad que sois capaces de mostrar por consola el DNI y la fecha de caducidad de la fila clicada
// 3. Hacer un fetch contra el servidor al endpoint '/comporbarDNI'; pasandole los parámetros de la QueryString adecuadamente. Teneis que ser capaces de construir una QueryString del estilo 'http://localhost:3000/comprobarDNI/?dni=123456789A&caducidad=2022-12-12

// ejemplo de fetch (incompleto)
/*
fetch(`http://127.0.0.1:3000/comprobarDNI`, {
    method: 'GET', // So, we can specify HTTP Methods here. Uh, interesting.
    mode: 'cors', // What is CORS?? https://developer.mozilla.org/es/docs/Web/HTTP/CORS 
})
.then(response => response.json())
.then(data => console.log(data))
.catch(err => {
    console.error(err)
})
*/

const rows = document.querySelectorAll('tr:not(:first-child)')
rows.forEach(row=> {
    row.addEventListener('click', (event)=>{
        const dni = event.currentTarget.children[1].textContent
        const caducidad = event.currentTarget.children[2].textContent
        checkRemoteDNI(dni, caducidad, (data) => {
            // implementar el pintado de la fila en función de si el dni es válido y no está caducado
            console.log(data)

            if (data.criminalBuscado) {
                row.style.backgroundColor = 'red'
            } else if (data.esDniValido) {
                row.style.backgroundColor = 'green'
            } else {
                row.style.backgroundColor = 'orange'
            }
        })
    })
})

function checkRemoteDNI(dni, caducidad, cb) {
    fetch('http://127.0.0.1:3000/comprobarDNI?' + new URLSearchParams({
        dni: dni,
        caducidad: caducidad
    }), {
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => console.log(data))
}
