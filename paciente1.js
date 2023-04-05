/////////////////CREATE PACIENTE///////////////
const createPacienteBTN = document.getElementById("createPacienteBTN")
//const readPacienteBTN = document.getElementById("readPacienteBTN")
//const updatePacienteBTN = document.getElementById("updatePacienteBTN")
const deletePacienteBTN = document.getElementById("deletePacienteBTN")
const pacienteForm = document.getElementById("paciente-create-form")

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

    pacienteData.nombre = document.getElementById('nombre').value;
    pacienteData.apellido = document.getElementById('apellido').value;
    pacienteData.dni = document.getElementById('dni').value;
    //pacienteData.fechaIngreso = ;
    pacienteData.domicilio.calle = document.getElementById('calle').value;
    pacienteData.domicilio.numero = document.getElementById('numero').value;
    pacienteData.domicilio.localidad = document.getElementById('localidad').value;
    pacienteData.domicilio.provincia = document.getElementById('provincia').value;

    // Llamar a la función setNullsValues para agregar más datos
    setFechaYHora()
    //setNullsValues()
    console.log(pacienteData);
    cleanObject()
    console.log(cleanObject());
    crearPaciente() 
    
})

function cleanObject(){
    
    let cleanedData = {
            nombre: pacienteData.nombre,
            apellido: pacienteData.apellido,
            dni: pacienteData.dni,
            fechaIngreso: pacienteData.fechaIngreso,
            domicilio: {
                calle: pacienteData.domicilio.calle,
                numero: pacienteData.domicilio.numero,
                localidad: pacienteData.domicilio.localidad,
                provincia: pacienteData.domicilio.provincia
            }
        };
        return cleanedData;
  }  
  
    //const datos= new FormData(pacienteData)
    //console.log(datos);
    function crearPaciente(){
    let cleanedData = cleanObject();

    fetch('http://localhost:8080/pacientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cleanedData)
    })
    .then(response=> response.json())
    .then(response=>{
        console.log(response);
        alert("Paciente Creado: "+ response.nombre+" "+response.apellido)
    })
    .catch(error=>{
        console.error(error);
    })
}

function setNullsValues(){
    try{pacienteData.domicilio.paciente= "null";}
    catch{console.log("paciente null");}
    
    //pacienteData.turnos= [];
    
}

//CARGAR FECHA Y HORA

//const odontologoSelect= document.getElementById("odontologo-select");
const hora= '00:00';
//const turnoBtn= document.getElementById("turnoBtn");
const fechaIngreso = document.getElementById('fechaIngreso')
//ELEGIR FECHA

fechaIngreso.addEventListener('change', ()=>{
    
  
  let fechaValor = fechaIngreso.value;  
  localStorage.setItem("fechaStorage", fechaValor);
  fechaStorage = localStorage.getItem("fechaStorage");
  console.log(fechaStorage);
 

});

//ELEGIR HORA

  function setFechaYHora(){
    const fechaStorage = localStorage.getItem("fechaStorage");
    
    
    if (fechaStorage && hora) {
        // Combina la fecha y hora en una sola cadena
        const fechaHoraString = `${fechaStorage}T${hora}:00.000Z`;
    
        // Crea un objeto Date a partir de la cadena combinada y conviértelo al formato ISO
        const fechaHora = new Date(fechaHoraString).toISOString();
        pacienteData.fechaIngreso= fechaHoraString;
        //console.log(turnoData);
        //console.log("Fecha y hora combinadas:", fechaHora);
    
        // Envía la fecha y hora al back-end (aquí puedes agregar el código para enviar la fecha y hora al servidor)
    } else {
        console.error("No se pudo obtener la fecha y/o hora del Local Storage.");
    }
    
    }

   