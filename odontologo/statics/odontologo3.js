/////////////////////UPDATE ODONTOLOGO/////////////////

const odontologoUpdateForm = document.getElementById("odontologo-update-form")
const updateOdontologoBTN = document.getElementById("updateOdontologoBTN")
const sendIdBTN = document.getElementById("send-id")
const giveIdForm= document.getElementById("give-id-form")
const sendUploadBtn= document.getElementById("send-upload-btn")
const modificarOdontologoBtn= document.getElementById("modificar-odontologo-btn")

let odontologoIdData= {        
  "nombre": "",
  "apellido": "",
  "maticula": "",
}

updateOdontologoBTN.addEventListener('click', ()=>{
  giveIdForm.style.display= "block"
  hideUI()
  
})

function hideUI() {
  updateOdontologoBTN.disabled = true
  createOdontologoBTN.hidden = true 
  readOdontologoBTN.hidden = true
  deleteOdontologoBTN.hidden = true
  //pacienteForm.style.display= 'block'
}

function resetUI() {
  updateOdontologoBTN.disabled = false;
  createOdontologoBTN.hidden = false;
  readOdontologoBTN.hidden = false;
  deleteOdontologoBTN.hidden = false;
  odontologoUpdateForm.style.display = 'none';
}


sendIdBTN.addEventListener('click', async (e)=>{
  e.preventDefault();
  let idOdontologo= giveIdForm.id.value
  console.log(idOdontologo);
  await Promise.all([traerOdontologoPorID()])
  
  cargarValoresFormulario()
  console.log(document.getElementById("matricula-up").value);
  odontologoUpdateForm.style.display= "block"
  giveIdForm.style.display= "none"
  console.log(odontologoIdData);

})



async function traerOdontologoPorID() {
  let odontologoId= giveIdForm.id.value;
  // ...
  if (odontologoId) {
      try {
          const response = await fetch(`http://localhost:8080/odontologos/${odontologoId}`);

          if (response.ok) {
              const odontologo = await response.json();
              console.log(odontologo);
              odontologoIdData = odontologo;
          } else {
              throw new Error('Error al obtener los datos del odontologo.');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  } else {
      console.error('No se pudo encontrar el ID del odontologo en el Local Storage.');
  }
} 

function cargarValoresFormulario() {
  document.getElementById("id-up").value = odontologoIdData.id;
  document.getElementById("nombre-up").value = odontologoIdData.nombre;
  document.getElementById("apellido-up").value = odontologoIdData.apellido;
  document.getElementById("matricula-up").value = odontologoIdData.matricula;
  
}


modificarOdontologoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  formData = new FormData(odontologoUpdateForm);
  console.log(formData);

  for (const [key, value] of formData.entries()) {
    
      odontologoIdData[key] = value;
    
  }

  console.log(odontologoIdData);

  fetch('http://localhost:8080/odontologos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(odontologoIdData),
  })
    .then((response) => response.json())
    .then((response) => {
      alert('Paciente '+response.nombre+' '+response.apellido+' actualizado!');
      resetUI(); // mover aquí la llamada a resetUI()
    });
    /*.then((response) => alert('Paciente '+response.nombre+' '+response.apellido+' actualizado!'));

    resetUI()*/
  });

