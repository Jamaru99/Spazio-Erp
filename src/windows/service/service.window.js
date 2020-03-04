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

function floatToDatetime(schedule){
    var decimal = schedule - Math.floor(schedule);
    var formattedDecimal = "";
    if(decimal == 0)
        formattedDecimal = "0";
    return `${Math.floor(schedule)}:${formattedDecimal}${decimal * 60}`
}

function timeToFloat(time) {

    var decimal_places = 2;
    var maximum_hours = 15;
    var int_format = time.match(/^\d+$/);
    var time_format = time.match(/([\d]*):([\d]+)/);
    var minute_string_format = time.toLowerCase().match(/([\d]+)m/);
    var hour_string_format = time.toLowerCase().match(/([\d]+)h/);

    if (time_format != null) {
        hours = parseInt(time_format[1]);
        minutes = parseFloat(time_format[2]/60);
        time = hours + minutes;
    } else if (minute_string_format != null || hour_string_format != null) {
        if (hour_string_format != null) {
            hours = parseInt(hour_string_format[1]);
        } else {
            hours = 0;
        }
        if (minute_string_format != null) {
            minutes = parseFloat(minute_string_format[1]/60);
        } else {
            minutes = 0;
        }
        time = hours + minutes;
    } else if (int_format != null) {
        time = parseInt(time);
        if (maximum_hours > 0 && time > maximum_hours) {
            time = (time/60).toFixed(decimal_places);
        }
    }

    time = parseFloat(time);

    return time;
}

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
    priceEl.value = priceEl.value.replace(".", ",");
    durationEl.value = floatToDatetime(service.duration);
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
            duration: timeToFloat(durationEl.value),
            price: parseFloat(priceEl.value.replace(",", ".")),
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