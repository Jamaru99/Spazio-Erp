
nameEl = document.getElementById("name");
descriptionEl = document.getElementById("description");
priceEl = document.getElementById("price");
durationEl = document.getElementById("duration");
servicesEl = document.getElementById("services");
registerBtn = document.getElementById("register");

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

}

function populateEmployees(employees){
    for(employee of employees){
        employeeOptionEl = document.createElement("option");
        employeeOptionEl.setAttribute("value", employee._id);
        employeeOptionEl.appendChild(document.createTextNode(employee.name));
        employeesEl.appendChild(employeeOptionEl);
    }
}

registerBtn.onclick = () => {
    const customerData = {
        login: "erp",
        name: customerInput.value
    }
    createCustomer(customerData, customer => {
        const appointmentData = {
            customerId: customer._id,
            serviceId: servicesEl.value,
            employeeId: employeesEl.value,
            schedule: `${formattedDate(selectedDate)}T${selectedTime}`
        };
        createAppointment(appointmentData, () => messageEl.innerHTML = "Sessão agendada!")
    })
}

try{
    
    getServices(services => renderServices(services));
}
catch(ex){
    services.innerHTML = "<option>Erro</option>";
}