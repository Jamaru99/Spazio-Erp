
listEl = document.getElementById('list-form');
btnShowAppointmentModal = document.getElementById('show-appointment-modal');
appointmentModal = document.getElementById('appointment-modal');
btnShowAppointmentModal.onclick = () => {
    appointmentModal.style.display = "block";
}
repositories = []

function renderAppointments(){
    listEl.innerHTML = '<li class="remove"></li>';
    repositories.forEach(repo => {
        
        let nameEl = document.createElement('strong');
        nameEl.appendChild(document.createTextNode(repo.schedule));

        let descriptionEl = document.createElement('p');
        descriptionEl.appendChild(document.createTextNode(repo.customerId));

        let linkEl = document.createElement('a');
        linkEl.setAttribute('href', repo.html_url);
        linkEl.setAttribute('target', '_blank');
        linkEl.appendChild(document.createTextNode('Acessar'));

        let listItemEl = document.createElement('li');
        listItemEl.appendChild(nameEl);
        listItemEl.appendChild(descriptionEl);
        listItemEl.appendChild(linkEl);

        listEl.appendChild(listItemEl);
    });
}

try{

    getRepos(_ => renderAppointments());
    
    
} catch(ex){
    
    document.querySelector("h1").innerHTML = "Erro";
}