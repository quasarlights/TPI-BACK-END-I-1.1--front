/////////////////////DELTE PACIENTE/////////////////
const deleteSeccionBtn= document.getElementById('deletePacienteBTN')
const deleteIdForm= document.getElementById('give-id-form-delete')
const deleteForm= document.getElementById('paciente-delete-form')
const deleteBtn= document.getElementById('delete-btn')
const deleteIdBtn= document.getElementById('send-delete-id')
const deleteDivResponse= document.getElementById('delete-div-response')
const giveIdDelete= document.getElementById('give-id-delete')

deleteSeccionBtn.addEventListener('click', ()=>{
    deleteIdForm.style.display= "block"
    
})


deleteIdBtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    giveIdDelete.disabled = true;
    let idToDelete = giveIdDelete.value;
    localStorage.setItem('idToDelete', idToDelete);
    try {
      fetch(`http://localhost:8080/pacientes/${idToDelete}`)
        .then((response) => {
          const contentType = response.headers.get('Content-Type');
          if (response.ok && contentType && contentType.includes('application/json')) {
            return response.json();
          } else if (response.ok) {
            // Muestra un mensaje de alerta al usuario cuando el ID no se encuentra
            alert('El ID proporcionado no fue encontrado.');
            throw new Error(`Error en la respuesta del fetch: ${response.statusText}`);
          } else {
            throw new Error(`Error en la respuesta del fetch: ${response.statusText}`);
          }
        })
        .then((data) => {
          // Muestra la información del JSON en el div deleteDivResponse
          deleteDivResponse.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  
    deleteBtn.hidden = false;
  });
  


  deleteBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    
    try {
        const idToDelete = localStorage.getItem('idToDelete');
        fetch(`http://localhost:8080/pacientes/${idToDelete}`,
        {method: 'DELETE'})
        .then(response=> {
            if (response.ok) {
                return response.text()
            } else {
                throw new Error(`Error en la respuesta del fetch: ${response.statusText}`);
            }
        })
        .then(data=> {
            deleteDivResponse.innerHTML = data;
        })
    } catch (error) {
        console.error('Error: '+ error);
    }
  })



