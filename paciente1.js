const createPacienteBTN = document.getElementById("createPacienteBTN")
const readPacienteBTN = document.getElementById("readPacienteBTN")
const updatePacienteBTN = document.getElementById("updatePacienteBTN")
const deletePacienteBTN = document.getElementById("deletePacienteBTN")
const pacienteForm = document.getElementById("paciente-form")

createPacienteBTN.addEventListener('click', function(){
  createPacienteBTN.disabled = true
  readPacienteBTN.hidden = true 
  updatePacienteBTN.hidden = true
  deletePacienteBTN.hidden = true
  pacienteForm.style.display= 'block'

})

let pacienteData=  {
        
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


function setPacienteData(){
    
}

pacienteForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    crearPaciente()
    
})

function crearPaciente(){
    const datos= new FormData(pacienteForm)
    console.log(datos);

    fetch('http://localhost:8080/pacientes', {
        method: 'POST',
        body: datos
    })
    .then(response=> response.json())
    .then(response=>{
        console.log(response);
        alert("Paciente Creado: "+ response)
    })
    .catch(error=>{
        console.error(error);
    })
}