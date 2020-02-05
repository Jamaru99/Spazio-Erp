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

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate).toISOString().split("T")[0]);
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
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
    console.log(schedule);
}

services = [];
nextDates = getDates(new Date(), new Date().addDays(7));
dateIndex = 0;
dateEl.innerHTML = nextDates[dateIndex];

nextDateBtn.onclick = () => {
    previousDateBtn.disabled = false;
    if(dateIndex > 6) {
        nextDateBtn.disabled = true;
        return;
    }
    dateIndex++;
    dateEl.innerHTML = nextDates[dateIndex];
    if(servicesEl.value != "") 
        getSchedules(
            servicesEl.value, 
            nextDates[dateIndex], 
            schedules => renderSchedules(schedules)
        );
}

previousDateBtn.onclick = () => {
    nextDateBtn.disabled = false;
    if(dateIndex <= 0) {
        previousDateBtn.disabled = true;
        return
    }
    dateIndex--;
    dateEl.innerHTML = nextDates[dateIndex];
    if(servicesEl.value != "") 
        getSchedules(
            servicesEl.value, 
            nextDates[dateIndex], 
            schedules => renderSchedules(schedules)
        );
}

registerBtn.onclick = () => {
    const customerData = {
        login: "erp",
        name: customerInput.value
    }
    createCustomer(customerData, customer => {
        console.log(customer);
    })
}

servicesEl.onchange = () => {
    getSchedules(
        servicesEl.value, 
        nextDates[dateIndex], 
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


