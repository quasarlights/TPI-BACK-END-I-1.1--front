///////////////////////////READ ODONTOLOGO//////////////////////

const readOdontologoBTN =document.getElementById("readOdontologoBTN")

readOdontologoBTN.addEventListener('click', ()=>{
    //
    traerOdontologo() 
    hideUI()   
    //resetUI()
})
function hideUI() {
    readOdontologoBTN.disabled = true
    createOdontologoBTN.hidden = true 
    updateOdontologoBTN.hidden = true
    deleteOdontologoBTN.hidden = true
    
}
  

function traerOdontologo() {    

fetch('http://localhost:8080/odontologos')
    .then(response => response.json())
    .then(response => {
        // Crear un nuevo div
        const container = document.createElement('div');
        container.id = 'odontologo-container';

        // Iterar sobre los objetos en la respuesta
        response.forEach(odontologo => {
            // Crear un elemento para mostrar la información del paciente
            const odontologoElement = document.createElement('div');
            odontologoElement.className = 'odontologo';

            // Agregar información del paciente al elemento
            odontologoElement.innerHTML = `
                <p>ID: ${odontologo.id}</p>
                <p>Nombre: ${odontologo.nombre}</p>
                <p>Apellido: ${odontologo.apellido}</p>
                <p>Matricula: ${odontologo.matricula}</p>
                <p>**********************************************</p>
            `;

            // Agregar el elemento del paciente al div contenedor
            container.appendChild(odontologoElement);
        });

        // Agregar el div contenedor al DOM
        document.body.appendChild(container);
    })
    .catch(error => {
        console.error(error);
    });
}