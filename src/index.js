listEl = document.getElementById('list-form');
monthlyRevenueEl = document.getElementById('monthly-revenue');
dailyRevenueEl = document.getElementById('daily-revenue');
appointments = []

function formatDatetime(datetime){
    var date = new Date(datetime);
    let time = datetime.split("T")[1].replace(":00.000Z", "");
    if(datetime.split("T")[0] == new Date().toISOString().split("T")[0])
        return `Hoje - ${time}`
    let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;;
    let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();
    return `${day}/${month}/${year} - ${time}`
}

function renderRevenues(revenues){
    const {dailyRevenue, monthlyRevenue} = revenues;
    dailyRevenueEl.innerHTML += dailyRevenue.toFixed(2).replace('.', ',');
    monthlyRevenueEl.innerHTML += monthlyRevenue.toFixed(2).replace('.', ',');
}

function endAppointment(id){
    updateAppointment(id, "ended", () => renderAppointments());
}

function renderAppointments(){
    listEl.innerHTML = '<li class="remove"></li>';
    appointments.forEach(repo => {
        
        let leftDivEl = document.createElement('div');

        let nameEl = document.createElement('strong');
        nameEl.appendChild(document.createTextNode(formatDatetime(repo.schedule)));

        let customerEl = document.createElement('p');
        customerEl.appendChild(document.createTextNode(repo.customerData.name));

        let serviceEl = document.createElement('p');
        serviceEl.appendChild(document.createTextNode(repo.serviceData.name));

        let linkEl = document.createElement('button');
        linkEl.setAttribute('id', 'end-session');
        linkEl.onclick = () => endAppointment(repo._id);
        linkEl.appendChild(document.createTextNode('Finalizar'));

        leftDivEl.appendChild(nameEl);
        leftDivEl.appendChild(customerEl);
        leftDivEl.appendChild(serviceEl);

        let listItemEl = document.createElement('li');
        listItemEl.appendChild(leftDivEl);
        listItemEl.appendChild(linkEl);

        listEl.appendChild(listItemEl);
    });
}

try{
    getCurrentRevenue(revenues => renderRevenues(revenues));
    getAppointments(_ => renderAppointments())
    setInterval(_ => getAppointments(_ => renderAppointments()), 8000);
} catch(ex){
    document.querySelector("h1").innerHTML = "Erro";
}