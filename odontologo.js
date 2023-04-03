//CARGAR ODONTOLOGOS

window.addEventListener('load', traerOdontologos())

//const odontologoSelect= document.getElementById("odontologo-select");
const fecha= document.getElementById("fecha");


function traerOdontologos() {
    fetch('http://localhost:8080/odontologos')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error al obtener los datos');
    }
  })
  .then((data) => {
    cargarOpcionesOdontologos(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


// Función para cargar las opciones en el select
function cargarOpcionesOdontologos(datos) {

  datos.forEach((objeto) => {
    const option = document.createElement('option');
    option.value = objeto.id; // Utiliza el ID del objeto como valor de la opción
    option.textContent = objeto.nombre + ' ' + objeto.apellido; // Utiliza el nombre y apellido como texto de la opción
    odontologoSelect.appendChild(option);
    //console.log(objeto);
    
  });
}

//ELEGIR ODONTOLOGO

odontologoSelect.addEventListener('change', ()=>{
  
  let odontologoId = odontologoSelect.value;  
  localStorage.setItem("odontologoStorage", odontologoId);
  odontologoStorage = localStorage.getItem("odontologoStorage");
  console.log(odontologoStorage);
  fecha.disabled= false;

});