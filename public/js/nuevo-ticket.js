//Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnEnviar = document.querySelector('button');

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnEnviar.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnEnviar.disabled = true;
});


socket.on('ultimo-ticket', (ticket) => {
    lblNuevoTicket.innerText = "Ticket " + ticket
})


btnEnviar.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket
    });

});