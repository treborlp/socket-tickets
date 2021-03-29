//Validacion de parametros
const searchParams = new URLSearchParams(window.location.search); //Busca los parametros del request

if (!searchParams.has('escritorio')) { //Si los parametros no tienen el "escritorio"
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio'); //Obtenemos el valor del escritorio

//Referencias HTML
const lblEscritorio = document.querySelector("h1"); //primer h1
const btnAtender = document.querySelector('button');

lblEscritorio.innerText = "Escritorio " + escritorio;

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});


// socket.on('ultimo-ticket', (ticket) => {
//     lblNuevoTicket.innerText = "Ticket " + ticket
// })


btnAtender.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket
    });

});