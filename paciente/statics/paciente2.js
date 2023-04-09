///////////////////////////READ PACIENTES//////////////////////

let readPacienteBTN =document.getElementById("readPacienteBTN")

readPacienteBTN.addEventListener('click', ()=>{
    //
    traerPacientes() 
    hideUI()   
    //resetUI()
})
function hideUI() {
    readPacienteBTN.disabled = true
    createPacienteBTN.hidden = true 
    updatePacienteBTN.hidden = true
    deletePacienteBTN.hidden = true
    //pacienteForm.style.display= 'block'
}
  

function traerPacientes() {    

fetch('http://localhost:8080/pacientes')
    .then(response => response.json())
    .then(response => {
        // Crear un nuevo div
        const container = document.createElement('div');
        container.id = 'pacientes-container';

        // Iterar sobre los objetos en la respuesta
        response.forEach(paciente => {
            // Crear un elemento para mostrar la información del paciente
            const pacienteElement = document.createElement('div');
            pacienteElement.className = 'paciente';

            // Agregar información del paciente al elemento
            pacienteElement.innerHTML = `
                <p>ID: ${paciente.id}</p>
                <p>Nombre: ${paciente.nombre}</p>
                <p>Apellido: ${paciente.apellido}</p>
                <p>DNI: ${paciente.dni}</p>
                <p>**********************************************</p>
            `;

            // Agregar el elemento del paciente al div contenedor
            container.appendChild(pacienteElement);
        });

        // Agregar el div contenedor al DOM
        document.body.appendChild(container);
    })
    .catch(error => {
        console.error(error);
    });
}