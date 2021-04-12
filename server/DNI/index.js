// NO se debe exportar esta variable
const stolenDNI = ['666666666M']

module.exports = class DNI {
    /**
     * 
     * @param {string} titular Indica el titular del Dni
     * @param {string} numero  Código en formato 12345678A
     * @param {string} caducidad  Fecha de caducidad del DNI, en format año-mes-dia
     */
    constructor(titular, numero, caducidad) {
        this.titular = titular;
        this.numero = numero;
        this.caducidad = caducidad;
    }

    estaCaducado() {
        let hoyJs = new Date();
        let cauducidadJs = new Date(this.caducidad);

        return hoyJs > cauducidadJs;
    }

    calculaLetraDni(dni) {
        let pattern = /^\d*$/;

        let regexp = new RegExp(pattern);

        if (!regexp.test(dni)) {
            throw new Error("No me has pasado un número como parámetro!");
        }

        let cadena = "TRWAGMYFPDXBNJZSQVHLCKET";
        let posicion = dni % 23;
        let letra = cadena.substring(posicion, posicion + 1)
        return letra;
    }

    esDniValido() {
        let dni = this.numero;
        let pattern = /^[0-9]{8}[-]?[A-Z]$/;

        let regexp = new RegExp(pattern);

        let letraDni = this.calculaLetraDni(dni.slice(0, 8));
        let ultimaLetraDniPasado = dni.slice(-1);

        return (regexp.test(dni) && (letraDni == ultimaLetraDniPasado));
    }

    esDniCriminal() {
        return stolenDNI.some(dni => {
            return dni == this.numero
        })
    }
}
