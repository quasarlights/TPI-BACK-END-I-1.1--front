//CARGAR PACIENTES

window.addEventListener('load', traerPacientes())

const pacienteSelect= document.getElementById("paciente-select");
const odontologoSelect= document.getElementById("odontologo-select");


function traerPacientes() {
    fetch('http://localhost:8080/pacientes')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error al obtener los datos');
    }
  })
  .then((data) => {
    cargarOpcionesPacientes(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


// Función para cargar las opciones en el select
function cargarOpcionesPacientes(datos) {

  datos.forEach((objeto) => {
    const option = document.createElement('option');
    option.value = objeto.id; // Utiliza el ID del objeto como valor de la opción
    option.textContent = objeto.nombre + ' ' + objeto.apellido; // Utiliza el nombre y apellido como texto de la opción
    pacienteSelect.appendChild(option);
    //console.log(objeto);
    
  });
}

//ELEGIR PACIENTE

pacienteSelect.addEventListener('change', ()=>{
  
  let pacienteId = pacienteSelect.value;  
  localStorage.setItem("pacienteStorage", pacienteId);
  pacienteStorage = localStorage.getItem("pacienteStorage");
  console.log(pacienteStorage);
  odontologoSelect.disabled= false;

});

///////////////////////////////////////////////////
