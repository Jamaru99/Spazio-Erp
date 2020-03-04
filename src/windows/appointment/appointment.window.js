servicesEl = document.getElementById("services");
employeesEl = document.getElementById("employees");
dateEl = document.getElementById("date");
previousDateBtn = document.getElementById("previous-date");
nextDateBtn = document.getElementById("next-date");
registerBtn = document.getElementById("register");
customerInput = document.getElementById("customer");
schedulesEl = document.getElementById("schedules");
messageEl = document.getElementById("message");

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function isoDate(date){
    return date.toISOString().split("T")[0];
}

function brazilDate(date){
    const noTimeDate = isoDate(date);
    const [year, month, day] = noTimeDate.split("-");
    return `${day}/${month}/${year}`;
}

function renderSchedules(schedules){
    schedulesEl.innerHTML = "";
    if(schedules.length === 0)
        schedulesEl.innerHTML = `Não há horários para ${servicesEl.options[servicesEl.selectedIndex].text}`
    schedules.forEach(sched => {
        scheduleEl = document.createElement("li");
        scheduleEl.onclick = () => setSchedule(sched);
        scheduleEl.appendChild(document.createTextNode(sched));
        schedulesEl.appendChild(scheduleEl);
    });
}

function populateServices(services){
    for(service of services){
        serviceOptionEl = document.createElement("option");
        serviceOptionEl.setAttribute("value", service._id);
        serviceOptionEl.appendChild(document.createTextNode(service.name));
        servicesEl.appendChild(serviceOptionEl);
    }
}

function populateEmployees(employees){
    for(employee of employees){
        employeeOptionEl = document.createElement("option");
        employeeOptionEl.setAttribute("value", employee._id);
        employeeOptionEl.appendChild(document.createTextNode(employee.name));
        employeesEl.appendChild(employeeOptionEl);
    }
}

function setSchedule(schedule){
    let scheduleEls = document.querySelectorAll("li");
    for(schedEl of scheduleEls){
        if(schedEl.innerHTML === schedule)
            schedEl.style.backgroundColor = "#88888888";
        else
            schedEl.style.backgroundColor = "#88888821";
    }
    selectedTime = schedule;
}

function isValidForm(){
    return (
        selectedTime && customerInput.value
    );
}

selectedDate = new Date();
selectedTime = "";
dateEl.innerHTML = brazilDate(selectedDate);

nextDateBtn.onclick = () => {
    previousDateBtn.disabled = false;
    selectedDate = selectedDate.addDays(1);
    dateEl.innerHTML = brazilDate(selectedDate);
    if(servicesEl.value != "") {
        schedulesEl.innerHTML = "...";
        getSchedules(
            servicesEl.value,
            employeesEl.value,
            isoDate(selectedDate), 
            schedules => renderSchedules(schedules)
        );
    }
}

previousDateBtn.onclick = () => {
    selectedDate = selectedDate.addDays(-1);
    dateEl.innerHTML = brazilDate(selectedDate);
    if(servicesEl.value != "") {
        schedulesEl.innerHTML = "...";
        getSchedules(
            servicesEl.value,
            employeesEl.value,
            isoDate(selectedDate), 
            schedules => renderSchedules(schedules)
        );
    }
}

registerBtn.onclick = () => {
    if(!isValidForm()) {
        messageEl.innerHTML = "Dados faltando"
        setTimeout(() => messageEl.innerHTML = "", 2500);
        return;
    }
    const customerData = {
        login: "erp",
        name: customerInput.value
    }
    createCustomer(customerData, customer => {
        const appointmentData = {
            customerId: customer._id,
            serviceId: servicesEl.value,
            employeeId: employeesEl.value,
            schedule: `${isoDate(selectedDate)}T${selectedTime}`
        };
        createAppointment(appointmentData, () => {
            messageEl.innerHTML = "Agendado!"
            setTimeout(() => document.location.reload(true), 2500);
        })
    })
}

servicesEl.onchange = () => {
    schedulesEl.innerHTML = "...";
    getSchedules(
        servicesEl.value,
        employeesEl.value,
        isoDate(selectedDate), 
        schedules => renderSchedules(schedules)
    );
}

employeesEl.onchange = () => {
    schedulesEl.innerHTML = "...";
    getSchedules(
        servicesEl.value,
        employeesEl.value,
        isoDate(selectedDate), 
        schedules => renderSchedules(schedules)
    );
}

try{
    getServices(services => {
        populateServices(services);
        getEmployees(employees => {
            populateEmployees(employees);
            getSchedules(
                servicesEl.value, 
                employeesEl.value,
                isoDate(selectedDate), 
                schedules => renderSchedules(schedules)
            );
        })
    });
}
catch(ex){
    services.innerHTML = "<option>Erro</option>";
}