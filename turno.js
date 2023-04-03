turnoBtn.addEventListener('click', (e)=>{
    e.preventDefault;    
    
    setFechaYHora();
    traerOdontologoPorID();
    traerPacientesPorID();
    //crearTurno();

    console.log(turnoData);
})

let turnoData = {
    paciente: "",
    odontologo: "",
    date: ""
};

function traerPacientesPorID() {
    
    let pacienteId = localStorage.getItem('pacienteStorage');

    // Comprueba si el ID del paciente existe en el Local Storage
    if (pacienteId) {
        // Realiza un fetch a la URL con el ID del paciente
        fetch(`http://localhost:8080/pacientes/${pacienteId}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener los datos del paciente.');
                }
            })
            .then((paciente) => {
                console.log('Datos del paciente:', paciente);
                turnoData.paciente= paciente;
                console.log(turnoData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        console.error('No se pudo encontrar el ID del paciente en el Local Storage.');
    }
}

function traerOdontologoPorID() {
    
    let odontologoId = localStorage.getItem('odontologoStorage');

    // Comprueba si el ID del paciente existe en el Local Storage
    if (odontologoId) {
        // Realiza un fetch a la URL con el ID del paciente
        fetch(`http://localhost:8080/odontologos/${odontologoId}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener los datos del odontologo.');
                }
            })
            .then((odontologo) => {
                console.log('Datos del odontologo:', odontologo);
                turnoData.odontologo= odontologo;
                console.log(turnoData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        console.error('No se pudo encontrar el ID del paciente en el Local Storage.');
    }
}

function setFechaYHora(){
const fechaStorage = localStorage.getItem("fechaStorage");
const horaStorage = localStorage.getItem("horaStorage");

if (fechaStorage && horaStorage) {
    // Combina la fecha y hora en una sola cadena
    const fechaHoraString = `${fechaStorage}T${horaStorage}:00.000Z`;

    // Crea un objeto Date a partir de la cadena combinada y conviértelo al formato ISO
    const fechaHora = new Date(fechaHoraString).toISOString();
    turnoData.date= fechaHoraString;
    console.log(turnoData);
    console.log("Fecha y hora combinadas:", fechaHora);

    // Envía la fecha y hora al back-end (aquí puedes agregar el código para enviar la fecha y hora al servidor)
} else {
    console.error("No se pudo obtener la fecha y/o hora del Local Storage.");
}

}




/*
{
    "paciente": {
        "id": ,
        "nombre": "",
        "apellido": "",
        "dni": "",
        "fechaIngreso": "",
        "domicilio": {
            "id": ,
            "calle": "",
            "numero": "",
            "localidad": "",
            "provincia": "",
            "paciente": null
        },
        "turnos": []
    },
    "odontologo":{
        "id": ,
        "nombre": "",
        "apellido": "",
        "matricula": ,
        "turnos": []
    },
    "date": ""
}
*/
/*
function seleccionarPaciente() {
    const pacienteSelect = document.getElementById('paciente');
    turnoData.paciente = pacienteSelect.value;

    // Habilitar el selector de odontólogo
    const odontologoSelect = document.getElementById('odontologo');
    odontologoSelect.disabled = false;
}
*/
// ... el resto del código sigue igual



        function crearTurno() {
            

            // Enviar datos al back-end
            fetch('http://localhost:8080/turnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(turnoData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Turno creado:', data);
            })
            .catch(error => {
                console.error('Error creando turno:', error);
            });
        }