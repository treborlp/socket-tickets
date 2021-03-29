const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        //TODO: Notificar que hay un ticket pendiente de notificar
    })

    socket.emit("ultimo-ticket", ticketControl.ultimo)

}



module.exports = {
    socketController
}