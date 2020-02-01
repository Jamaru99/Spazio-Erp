
listEl = document.getElementById('list-form');
// btnShowAppointmentModal = document.getElementById('show-appointment-modal');
// appointmentModal = document.getElementById('appointment-modal');
// btnShowAppointmentModal.onclick = () => {
//     appointmentModal.style.display = "block";
// }
appointments = []

function renderAppointments(){
    listEl.innerHTML = '<li class="remove"></li>';
    appointments.forEach(repo => {
        
        let nameEl = document.createElement('strong');
        nameEl.appendChild(document.createTextNode(repo.schedule.split("T")[1].replace(".000Z", "")));

        let descriptionEl = document.createElement('p');
        descriptionEl.appendChild(document.createTextNode(repo.customerData.name));

        let linkEl = document.createElement('a');
        linkEl.setAttribute('href', repo.html_url);
        linkEl.setAttribute('target', '_blank');
        linkEl.appendChild(document.createTextNode('Finalizar'));

        let listItemEl = document.createElement('li');
        listItemEl.appendChild(nameEl);
        listItemEl.appendChild(descriptionEl);
        listItemEl.appendChild(linkEl);

        listEl.appendChild(listItemEl);
    });
}

try{

    getAppointments(_ => renderAppointments());
    
    
} catch(ex){
    
    document.querySelector("h1").innerHTML = "Erro";
}