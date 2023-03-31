window.addEventListener('load', traerPacientes())

pacienteSelect= document.getElementById("paciente-select");
odontologoSelect= document.getElementById("odontologo-select") 

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
    cargarOpciones(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


// Función para cargar las opciones en el select
function cargarOpciones(datos) {
    const pacienteSelect= document.getElementById("paciente-select");

  datos.forEach((objeto) => {
    const option = document.createElement('option');
    option.value = objeto.id; // Utiliza el ID del objeto como valor de la opción
    option.textContent = objeto.nombre + ' ' + objeto.apellido; // Utiliza el nombre y apellido como texto de la opción
    pacienteSelect.appendChild(option);
  });
}
