servicesEl = document.getElementById("services");
dateEl = document.getElementById("date");
previousDateBtn = document.getElementById("previous-date");
nextDateBtn = document.getElementById("next-date");

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate).toISOString().split("T")[0]);
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
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
}

previousDateBtn.onclick = () => {
    nextDateBtn.disabled = false;
    if(dateIndex <= 0) {
        previousDateBtn.disabled = true;
        return
    }
    dateIndex--;
    dateEl.innerHTML = nextDates[dateIndex];
}

servicesEl.onchange = () => {
    getSchedules("5e2df07656d5b2222fa13bbd", "2020-05-23", res => dateEl.innerHTML = res[0]);
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
    });
}
catch(ex){
    services.innerHTML = "<option>Erro</option>";
}


