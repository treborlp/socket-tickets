const fs = require('fs');
const path = require('path');

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJSON() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init() {
        const { ultimo, hoy, tickets, ultimos4 } = require("../db/datos.json");
        if (this.hoy === hoy) {
            this.ultimo = ultimo;
            this.hoy = hoy;
            this.tickets = tickets;
            this.ultimos4 = ultimos4;
        } else {
            this.guardar();
        }
    }

    guardar() {
        const pathDb = path.join(__dirname, '../db', 'datos.json');
        fs.writeFileSync(pathDb, JSON.stringify(this.toJSON))

    }



}

module.exports = TicketControl;