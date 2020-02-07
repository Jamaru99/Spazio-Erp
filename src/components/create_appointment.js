servicesEl = document.getElementById("services");
dateEl = document.getElementById("date");
previousDateBtn = document.getElementById("previous-date");
nextDateBtn = document.getElementById("next-date");
registerBtn = document.getElementById("register");
customerInput = document.getElementById("customer");
schedulesEl = document.getElementById("schedules");

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function formattedDate(date){
    return date.toISOString().split("T")[0]
}

function renderSchedules(schedules){
    schedulesEl.innerHTML = "";
    schedules.forEach(sched => {
        scheduleEl = document.createElement("li");
        scheduleEl.onclick = () => setSchedule(sched);
        scheduleEl.appendChild(document.createTextNode(sched));
        schedulesEl.appendChild(scheduleEl);
    });
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

services = [];
selectedDate = new Date();
selectedTime = "";
dateEl.innerHTML = formattedDate(selectedDate);

nextDateBtn.onclick = () => {
    previousDateBtn.disabled = false;
    selectedDate = selectedDate.addDays(1);
    dateEl.innerHTML = formattedDate(selectedDate);
    if(servicesEl.value != "") {
        schedulesEl.innerHTML = "...";
        getSchedules(
            servicesEl.value, 
            formattedDate(selectedDate), 
            schedules => renderSchedules(schedules)
        );
    }
}

previousDateBtn.onclick = () => {
    selectedDate = selectedDate.addDays(-1);
    dateEl.innerHTML = selectedDate.toISOString().split("T")[0];
    if(servicesEl.value != "") {
        schedulesEl.innerHTML = "...";
        getSchedules(
            servicesEl.value, 
            formattedDate(selectedDate), 
            schedules => renderSchedules(schedules)
        );
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
            schedule: `${formattedDate(selectedDate)}T${selectedTime}`
        };
        createAppointment(appointmentData, () => console.log("sad"))
    })
}

servicesEl.onchange = () => {
    schedulesEl.innerHTML = "...";
    getSchedules(
        servicesEl.value, 
        formattedDate(selectedDate), 
        schedules => renderSchedules(schedules)
    );
}

try{
    getServices(() => {
        servicesEl.innerHTML = "";
        for(service of services){
            serviceOptionEl = document.createElement("option");
            serviceOptionEl.setAttribute("value", service._id);
            serviceOptionEl.appendChild(document.createTextNode(service.name));
            servicesEl.appendChild(serviceOptionEl);
            
        }
        servicesEl.value = "";
    });
}
catch(ex){
    services.innerHTML = "<option>Erro</option>";
}


