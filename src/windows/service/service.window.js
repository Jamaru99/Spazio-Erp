nameEl = document.getElementById("name");
descriptionEl = document.getElementById("description");
priceEl = document.getElementById("price");
durationEl = document.getElementById("duration");
servicesEl = document.getElementById("services");
registerBtn = document.getElementById("register");
cancelBtn = document.getElementById("cancel");
deleteBtn = document.getElementById("delete");
messageEl = document.getElementById("message");

function renderServices(services){
    servicesEl.innerHTML = "";
    services.forEach(service => {
        serviceEl = document.createElement("li");
        serviceEl.onclick = () => selectService(service);
        serviceEl.appendChild(document.createTextNode(service.name));
        //icon = document.createElement("i");
        //icon.setAttribute("class", "fas fa-edit");
        //serviceEl.appendChild(icon);
        servicesEl.appendChild(serviceEl);
    });
}

function selectService(service){
    let serviceEls = document.querySelectorAll("li");
    for(servEl of serviceEls){
        if(servEl.innerHTML === service.name)
            servEl.style.backgroundColor = "#88888888";
        else
            servEl.style.backgroundColor = "#88888821";
    }
    nameEl.value = service.name;
    descriptionEl.value = service.description || "";
    priceEl.value = service.price;
    durationEl.value = service.duration;
    selectedService = service._id;
    toggleMode("edition");
}

function toggleMode(mode){
    if(mode === "edition"){
        registerBtn.innerHTML = "SALVAR";
        cancelBtn.removeAttribute("class");
        deleteBtn.removeAttribute("class");

    }
    if(mode === "creation"){
        registerBtn.innerHTML = "CADASTRAR";
        cancelBtn.setAttribute("class", "invisible");
        deleteBtn.setAttribute("class", "invisible");
        cleanForm();
        selectedService = null;
    }
}

function cleanForm(){
    let serviceEls = document.querySelectorAll("li");
    for(servEl of serviceEls)
        servEl.style.backgroundColor = "#88888821";
    nameEl.value = "";
    descriptionEl.value = "";
    durationEl.value = "";
    priceEl.value = "";
}

function populateEmployees(employees){
    for(employee of employees){
        employeeOptionEl = document.createElement("option");
        employeeOptionEl.setAttribute("value", employee._id);
        employeeOptionEl.appendChild(document.createTextNode(employee.name));
        employeesEl.appendChild(employeeOptionEl);
    }
}

function showToast(message){
    messageEl.innerHTML = message;
    setTimeout(_ => messageEl.innerHTML = "", 3000)
}

selectedService = null;

registerBtn.onclick = () => {
    try{
        const serviceData = {
            name: nameEl.value,
            duration: parseFloat(durationEl.value),
            price: parseFloat(priceEl.value),
            description: descriptionEl.value
        }
        if(selectedService) {
            updateService(selectedService, serviceData, () => {
                showToast("Serviço atualizado!")
                getServices(services => renderServices(services));
                toggleMode("creation");
            })
        } else {
            createService(serviceData, () => {
                showToast("Serviço cadastrado!");
                getServices(services => renderServices(services));
                cleanForm();
            })
        }
    }
    catch(err){
        messageEl.innerHTML = "Erro";
    }
}

cancelBtn.onclick = () => {
    toggleMode("creation");
}

deleteBtn.onclick = () => {
    deleteService(selectedService, () => {
        getServices(services => renderServices(services));
    });
    toggleMode("creation");
}

try{
    getServices(services => renderServices(services));
}
catch(ex){
    messageEl.innerHTML = "Erro";
}