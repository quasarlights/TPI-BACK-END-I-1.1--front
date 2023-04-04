let divTurno= document.getElementById("turno");


turnoBtn.addEventListener('click', async (e)=>{
    e.preventDefault;    
    
    setFechaYHora();
    await Promise.all([traerPacientesPorID(), traerOdontologoPorID()]);
    //traerOdontologoPorID();
    //traerPacientesPorID();
    setNullsValues();

    //cargarDataAlDiv();
    crearTurno();

    console.log(turnoData);
})

let turnoData = {
    paciente: "",
    odontologo: "",
    date: ""
};

async function traerPacientesPorID() {
    let pacienteId = localStorage.getItem('pacienteStorage');
    // ...
    if (pacienteId) {
        try {
            const response = await fetch(`http://localhost:8080/pacientes/${pacienteId}`);

            if (response.ok) {
                const paciente = await response.json();
                turnoData.paciente = paciente;
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

/*
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
                //console.log('Datos del paciente:', paciente);
                turnoData.paciente= paciente;
               // console.log(turnoData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        console.error('No se pudo encontrar el ID del paciente en el Local Storage.');
    }
}
*/

async function traerOdontologoPorID() {
    let odontologoId = localStorage.getItem('odontologoStorage');
    // ...
    if (odontologoId) {
        try {
            const response = await fetch(`http://localhost:8080/odontologos/${odontologoId}`);

            if (response.ok) {
                const odontologo = await response.json();
                turnoData.odontologo = odontologo;
            } else {
                throw new Error('Error al obtener los datos del odontólogo.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.error('No se pudo encontrar el ID del odontólogo en el Local Storage.');
    }
}


/*
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
                //console.log('Datos del odontologo:', odontologo);
                turnoData.odontologo= odontologo;
                //console.log(turnoData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        console.error('No se pudo encontrar el ID del paciente en el Local Storage.');
    }
}
*/

function setFechaYHora(){
const fechaStorage = localStorage.getItem("fechaStorage");
const horaStorage = localStorage.getItem("horaStorage");

if (fechaStorage && horaStorage) {
    // Combina la fecha y hora en una sola cadena
    const fechaHoraString = `${fechaStorage}T${horaStorage}:00.000Z`;

    // Crea un objeto Date a partir de la cadena combinada y conviértelo al formato ISO
    const fechaHora = new Date(fechaHoraString).toISOString();
    turnoData.date= fechaHoraString;
    //console.log(turnoData);
    //console.log("Fecha y hora combinadas:", fechaHora);

    // Envía la fecha y hora al back-end (aquí puedes agregar el código para enviar la fecha y hora al servidor)
} else {
    console.error("No se pudo obtener la fecha y/o hora del Local Storage.");
}

}








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
                cargarDataAlDiv(data);
            })
            .catch(error => {
                console.error('Error creando turno:', error);
            });
        }

        function cargarDataAlDiv(data) {
            const turnoInfo = `
                <h3>Turno Confirmado:</h3>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        
            divTurno.innerHTML = turnoInfo;
        }
        
        function setNullsValues(){
            try{turnoData.paciente.domicilio.paciente= "null";}
            catch{console.log("paciente null");}
            
            turnoData.paciente.turnos= [];
            turnoData.odontologo.turnos= [];
        }



        /*
        JSON OK

        {
    "paciente": {
        "id": 1,
        "nombre": "mick",
        "apellido": "jagger",
        "dni": "1234",
        "fechaIngreso": "2023-01-01T00:00:00.000+00:00",
        "domicilio": {
            "id": 1,
            "calle": "smile",
            "numero": "22",
            "localidad": "london",
            "provincia": "london",
            "paciente": null
        },
        "turnos": []
    },
    "odontologo":{
        "id": 1,
        "nombre": "john",
        "apellido": "lennon",
        "matricula": 123,
        "turnos": []
    },
    "date": "2023-04-01T17:00:00.000-03:00"
}
        */ /*
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