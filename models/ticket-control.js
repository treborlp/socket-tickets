const fs = require('fs');
const path = require('path');


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }
}

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

    siguiente() {
        this.ultimo += 1; //Add 1
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.guardar();

        return "Ticket " + ticket.numero; //Return last ticket
    }

    atenderTicket(escritorio) {
        //No tenemos tickets
        if (this.tickets.length === 0) {
            return null;
        }
        //Metodo que regresa el primer elemento y lo elimina al mismo tiempo
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        //Verifica que existen solo 4 elementos en el arreglo
        if (this.ultimos4.length > 4) {
            //Metodo que elimina el ultimo elemento (-1) y solo un elemento (1)
            this.ultimos4.splice(-1, 1);
        }

        this.guardar();

        return ticket;


    }



}

module.exports = TicketControl;