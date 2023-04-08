//CARGAR FECHA Y HORA

//const odontologoSelect= document.getElementById("odontologo-select");
const hora= document.getElementById("hora");
const turnoBtn= document.getElementById("turnoBtn");

//ELEGIR FECHA

fecha.addEventListener('change', ()=>{
    
  
  let fechaValor = fecha.value;  
  localStorage.setItem("fechaStorage", fechaValor);
  fechaStorage = localStorage.getItem("fechaStorage");
  console.log(fechaStorage);
  hora.disabled= false;

});

//ELEGIR HORA

hora.addEventListener('change', ()=>{
    
  
    let horaValor = hora.value;  
    localStorage.setItem("horaStorage", horaValor);
    horaStorage = localStorage.getItem("horaStorage");
    console.log(horaStorage);
    turnoBtn.disabled= false;
  
  });