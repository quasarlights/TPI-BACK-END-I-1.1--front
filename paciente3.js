/////////////////////UPDATE PACIENTE/////////////////

const pacienteUpdateForm = document.getElementById("paciente-create-form")
const updatePacienteBTN = document.getElementById("updatePacienteBTN")

updatePacienteBTN.addEventListener('click', ()=>{
    pacienteUpdateForm.style.display= "block"
})


document.getElementById("enableForm").addEventListener("click", function() {
    const formElements = document.querySelectorAll("#myForm input");
    formElements.forEach(element => {
      element.removeAttribute("disabled");
    });
  });