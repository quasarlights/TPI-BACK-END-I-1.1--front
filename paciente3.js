/////////////////////UPDATE PACIENTE/////////////////

const pacienteUpdateForm = document.getElementById("paciente-create-form")
const updatePacienteBTN = document.getElementById("updatePacienteBTN")
const sendIdBTN = document.getElementById("send-id")
const giveIdForm= document.getElementById("give-id-form")
const sendUploadBtn= document.getElementById("send-upload-btn")

let pacienteIdData= {}

updatePacienteBTN.addEventListener('click', ()=>{
  giveIdForm.style.display= "block"
})


sendIdBTN.addEventListener('click', async (e)=>{
  e.preventDefault();
  let idPaciente= giveIdForm.id.value
  console.log(idPaciente);
  await Promise.all([traerPacientesPorID()])
  fechaToString()
  cargarValoresFormulario()
  pacienteUpdateForm.style.display= "block"
  giveIdForm.style.display= "none"
  console.log(pacienteIdData);

})



async function traerPacientesPorID() {
  let pacienteId= giveIdForm.id.value;
  // ...
  if (pacienteId) {
      try {
          const response = await fetch(`http://localhost:8080/pacientes/${pacienteId}`);

          if (response.ok) {
              const paciente = await response.json();
              pacienteIdData = paciente;
          } else {
              throw new Error('Error al obtener los datos del paciente.');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  } else {
      console.error('No se pudo encontrar el ID del paciente en el Local Storage.');
  }
} 

function cargarValoresFormulario() {
  document.getElementById("nombre").value = pacienteIdData.nombre;
  document.getElementById("apellido").value = pacienteIdData.apellido;
  document.getElementById("dni").value = pacienteIdData.dni;
  document.getElementById("fechaIngreso").value = pacienteIdData.fechaIngreso;
  document.getElementById("calle").value = pacienteIdData.domicilio.calle;
  document.getElementById("numero").value = pacienteIdData.domicilio.numero;
  document.getElementById("localidad").value = pacienteIdData.domicilio.localidad;
  document.getElementById("provincia").value = pacienteIdData.domicilio.provincia;
}

function fechaToString() {
  const fechaHora = pacienteIdData.fechaIngreso;

// Crear un objeto Date a partir de la cadena
const fechaObj = new Date(fechaHora);

// Convertir el objeto Date a una cadena en formato ISO y extraer la parte de la fecha
const fecha = fechaObj.toISOString().slice(0, 10);

pacienteIdData.fechaIngreso= fecha;
console.log(fecha); 
}