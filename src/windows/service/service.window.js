titleEl = document.getElementById("left-input-title");
nameEl = document.getElementById("name");
descriptionEl = document.getElementById("description");
priceEl = document.getElementById("price");
durationEl = document.getElementById("duration");
servicesEl = document.getElementById("services");
employeesEl = document.getElementById("employees")
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
    checkEmployees(service.employees);
    toggleMode("edition");
}

function renderEmployees(employees){
    for(employee of employees){
        employeeOptionEl = document.createElement("input");
        employeeOptionEl.setAttribute("value", employee._id);
        employeeOptionEl.setAttribute("type", "checkbox");
        employeeOptionEl.setAttribute("name", employee.name);
        employeeOptionEl.setAttribute("checked", true);
        if(employees.length === 1)
            employeeOptionEl.setAttribute("disabled", true);

        employeeLabelEl = document.createElement("label");
        employeeLabelEl.setAttribute("for", employee.name);
        employeeLabelEl.appendChild(document.createTextNode(employee.name));
        employeesEl.appendChild(employeeOptionEl);
        employeesEl.appendChild(employeeLabelEl);
    }
}

function getSelectedEmployees(){
    var selectedEmployees = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (checkbox of checkboxes) {
        selectedEmployees.push(checkbox.value);
    }
    return selectedEmployees;
}

function checkEmployees(employees){
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    for (checkbox of checkboxes) {
        checkbox.checked = employees.includes(checkbox.value);
    }
}

function toggleMode(mode){
    if(mode === "edition"){
        titleEl.innerHTML = "Editar serviço"
        registerBtn.innerHTML = "SALVAR";
        cancelBtn.removeAttribute("class");
        deleteBtn.removeAttribute("class");
    }
    if(mode === "creation"){
        titleEl.innerHTML = "Novo serviço"
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

function isValidForm(){
    return (
        nameEl.value && durationEl.value && priceEl.value &&
        !isNaN(parseFloat(priceEl.value)) && !isNaN(parseFloat(durationEl.value))
    );
}

function showToast(message){
    messageEl.innerHTML = message;
    setTimeout(_ => messageEl.innerHTML = "", 2500)
}

selectedService = null;

registerBtn.onclick = () => {
    try{
        if(!isValidForm()) {
            showToast("Dados faltando ou inválidos");
            return;
        }
        const serviceData = {
            name: nameEl.value,
            duration: parseFloat(durationEl.value),
            price: parseFloat(priceEl.value),
            description: descriptionEl.value,
            employees: getSelectedEmployees()
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
    getEmployees(employees => renderEmployees(employees))
}
catch(ex){
    messageEl.innerHTML = "Erro";
}