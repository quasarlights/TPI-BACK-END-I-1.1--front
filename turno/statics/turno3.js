/////////////////////UPDATE PACIENTE/////////////////

const turnoUpdateForm = document.getElementById("turno-update-form")
const updateTurnoBTN = document.getElementById("updateTurnoBTN")
const sendIdBTN = document.getElementById("send-id")
const giveIdForm= document.getElementById("give-id-form")
const sendUploadBtn= document.getElementById("send-upload-btn")
const modificarBtn= document.getElementById("modificar-btn")

let turnoIdData= {
        
  "nombre": "",
  "apellido": "",
  "date": "",
  "time": ""  
}

updateTurnoBTN.addEventListener('click', ()=>{
  giveIdForm.style.display= "block"
  hideUI()
  
})

function hideUI() {
  updateTurnoBTN.disabled = true
  createTurnoBTN.hidden = true 
  readTurnoBTN.hidden = true
  deleteTurnoBTN.hidden = true
  //pacienteForm.style.display= 'block'
}

function resetUI() {
  updateTurnoBTN.disabled = false;
  createTurnoBTN.hidden = false;
  readTurnoBTN.hidden = false;
  deleteTurnoBTN.hidden = false;
  turnoUpdateForm.style.display = 'none';
}


sendIdBTN.addEventListener('click', async (e)=>{
  e.preventDefault();
  let idTurno= giveIdForm.id.value
  console.log(idTurno);
  await Promise.all([traerTurnoPorID()])
  //traerTurnoPorID()
  fechaToString()
  cargarValoresFormulario()
  turnoUpdateForm.style.display= "block"
  giveIdForm.style.display= "none"
  console.log(turnoIdData);

})

/*
async function traerTurnoPorID() {
    let turnoId= giveIdForm.id.value;

    await fetch(`http://localhost:8080/turnos/${turnoId}`)
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
*/


async function traerTurnoPorID() {
    let turnoId = giveIdForm.id.value;
    // ...
    if (turnoId) {
      try {
        const response = await fetch(`http://localhost:8080/turnos/${turnoId}`);
  
        if (response.ok) {
          const turno = await response.json(); // Cambiar 'paciente' a 'turno'
          console.log(turno);
          turnoIdData = turno;
          console.log(turnoIdData);
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
  document.getElementById("id-up").value = turnoIdData.id;
  document.getElementById("nombre-up").value = turnoIdData.paciente.apellido+ ' ' + turnoIdData.paciente.nombre;
  document.getElementById("apellido-up").value = turnoIdData.odontologo.apellido + ' ' + turnoIdData.odontologo.nombre;
  document.getElementById("date-up").value = turnoIdData.date;
  document.getElementById("time-up").value = turnoIdData.time;

}

function fechaToString() {
    const fechaHora = turnoIdData.date;
  
    // Crear un objeto Date a partir de la cadena
    const fechaObj = new Date(Date.parse(fechaHora));
  
    if (!isNaN(fechaObj)) {
      // Convertir el objeto Date a una cadena en formato ISO
      const fechaISO = fechaObj.toISOString();
  
      // Extraer la parte de la fecha
      const fecha = fechaISO.slice(0, 10);
  
      // Extraer la parte de la hora (sin incluir los segundos y milisegundos)
      const hora = fechaISO.slice(11, 19);
  
      turnoIdData.date = fecha;
      turnoIdData.time = hora;
      console.log("Fecha:", fecha);
      console.log("Hora:", hora);
    } else {
      console.error("Error: Fecha no válida", fechaHora);
    }
  }
  
  


modificarBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(turnoIdData);
  console.log(unirFechaHora());
  
  formData = new FormData(turnoUpdateForm);
  console.log(formData);

  for (const [key, value] of formData.entries()) {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      turnoIdData[parentKey][childKey] = value;
    } else {
        turnoIdData[key] = value;
    }
  }
  turnoIdData.date=unirFechaHora();
  delete turnoIdData.time;
  console.log(turnoIdData);

  fetch('http://localhost:8080/turnos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(turnoIdData),
  })
    .then((response) => response.json())
    .then((response) => alert('Turno modificado!'));

    resetUI()
  });

  function unirFechaHora() {
    const fecha = document.getElementById('date-up').value;
    const hora = document.getElementById('time-up').value;
    
    const fechaHora = `${fecha}T${hora}.000Z`;
  
    return fechaHora;
  }
  

  