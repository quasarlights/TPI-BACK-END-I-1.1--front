/////////////////////UPDATE PACIENTE/////////////////

const pacienteUpdateForm = document.getElementById("paciente-update-form")
const updatePacienteBTN = document.getElementById("updatePacienteBTN")
const sendIdBTN = document.getElementById("send-id")
const giveIdForm= document.getElementById("give-id-form")
const sendUploadBtn= document.getElementById("send-upload-btn")
const modificarBtn= document.getElementById("modificar-btn")

let pacienteIdData= {
        
  "nombre": "",
  "apellido": "",
  "dni": "",
  "fechaIngreso": "",
  "domicilio": {
      
      "calle": "",
      "numero": "",
      "localidad": "",
      "provincia": "",
      "paciente": null
  },
  "turnos": []
}

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
              console.log(paciente);
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
  document.getElementById("id-up").value = pacienteIdData.id;
  document.getElementById("nombre-up").value = pacienteIdData.nombre;
  document.getElementById("apellido-up").value = pacienteIdData.apellido;
  document.getElementById("dni-up").value = pacienteIdData.dni;
  document.getElementById("fechaIngreso-up").value = pacienteIdData.fechaIngreso;
  document.getElementById("calle-up").value = pacienteIdData.domicilio.calle;
  document.getElementById("numero-up").value = pacienteIdData.domicilio.numero;
  document.getElementById("localidad-up").value = pacienteIdData.domicilio.localidad;
  document.getElementById("provincia-up").value = pacienteIdData.domicilio.provincia;
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
modificarBtn.addEventListener('click', (e) => {
  e.preventDefault();

  formData = new FormData(pacienteUpdateForm);
  console.log(formData);

  for (const [key, value] of formData.entries()) {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      pacienteIdData[parentKey][childKey] = value;
    } else {
      pacienteIdData[key] = value;
    }
  }

  console.log(pacienteIdData);

  fetch('http://localhost:8080/pacientes', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pacienteIdData),
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
});

/*
modificarBtn.addEventListener('click', (e)=>{
  e.preventDefault();
    
  formData= new FormData(pacienteUpdateForm)
  console.log(formData);

  const data = {
    domicilio: {},
  };

  for (const [key, value] of formData.entries()) {
    // Si el key contiene un punto, significa que es un campo anidado
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      data[parentKey][childKey] = value;
    } else {
      data[key] = value;
    }
  }
  console.log(data);
  fetch('http://localhost:8080/pacientes',{
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response=> response.json)
.then(console.log(response))
  
})
*/