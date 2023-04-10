///////////////////////////READ TURNOS//////////////////////

let readTurnoBTN =document.getElementById("readTurnoBTN")

readTurnoBTN.addEventListener('click', ()=>{
    //
    traerTurnos() 
   // hideUI()   
    //resetUI()
})
function hideUI() {
    readTurnoBTN.disabled = true
    createTurnoBTN.hidden = true 
    updateTurnoBTN.hidden = true
    deleteTurnoBTN.hidden = true
    //pacienteForm.style.display= 'block'
}
  

function traerTurnos() {
    fetch('http://localhost:8080/turnos')
        .then(response => response.json())
        .then(turnos => {
            // Crear un nuevo div
            const container = document.createElement('div');
            container.id = 'turnos-container';

            // Iterar sobre los objetos en la respuesta
            turnos.forEach(turno => {
                // Crear un elemento para mostrar la información del turno
                const turnoElement = document.createElement('div');
                turnoElement.className = 'turno';

                // Agregar información del turno al elemento
                turnoElement.innerHTML = `
                    <p>ID: ${turno.id}</p>
                    <p>Paciente: ${turno.paciente.nombre} ${turno.paciente.apellido}</p>
                    <p>Odontólogo: ${turno.odontologo.nombre} ${turno.odontologo.apellido}</p>
                    <p>Fecha: ${turno.date}</p>
                `;

                // Agregar el elemento del turno al div contenedor
                container.appendChild(turnoElement);
            });

            // Agregar el div contenedor al DOM
            document.body.appendChild(container);
        })
        .catch(error => {
            console.error(error);
        });
}
