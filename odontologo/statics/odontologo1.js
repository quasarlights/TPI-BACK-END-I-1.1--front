/////////////////CREATE ODONTOLOGO///////////////
const createOdontologBTN = document.getElementById("createPacienteBTN")
//const readPacienteBTN = document.getElementById("readPacienteBTN")
//const updatePacienteBTN = document.getElementById("updatePacienteBTN")
const deletePacienteBTN = document.getElementById("deletePacienteBTN")
const createOdontologoForm = document.getElementById("odontologo-create-form")

createOdontologoBTN.addEventListener('click', function(){
  createOdontologoBTN.disabled = true
  readOdontologoBTN.hidden = true 
  updateOdontologoBTN.hidden = true
  deleteOdontologoBTN.hidden = true
  createOdontologoForm.style.display= 'block'


})



let odontologoData=  {        
        "nombre": "",
        "apellido": "",
        "matricula": ""        
    }




createOdontologoForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    odontologoData.nombre = document.getElementById('nombre').value;
    odontologoData.apellido = document.getElementById('apellido').value;
    odontologoData.matricula = document.getElementById('matricula').value;
    console.log(odontologoData);
    
    crearOdontologo() 
    
    
})


    function crearOdontologo() {
        
    
        fetch('http://localhost:8080/odontologos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(odontologoData)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            alert("Odontologo Creado: " + response.nombre + " " + response.apellido);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => { // Agrega el bloque finally()
            console.log("Before calling resetUI()");
            resetCreateOdontologUI();
            console.log("After calling resetUI()");
        });
    }
    


   function resetCreateOdontologUI() {
    console.log("resetUI() called"); // Agrega esta línea
    createOdontologoBTN.disabled = false;
    readOdontologoBTN.hidden = false;
    updateOdontologoBTN.hidden = false;
    deleteOdontologoBTN.hidden = false;
    createOdontologoForm.style.display = 'none';
  }
  