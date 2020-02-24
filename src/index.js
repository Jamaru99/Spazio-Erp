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
    dailyRevenueEl.innerHTML = `Faturamento diário: R$ ${dailyRevenue.toFixed(2).replace('.', ',')}`;
    monthlyRevenueEl.innerHTML = `Faturamento mensal: R$ ${monthlyRevenue.toFixed(2).replace('.', ',')}`
}

function endAppointment(id){
    updateAppointment(id, "ended", () => renderAppointments());
    getCurrentRevenue(revenues => renderRevenues(revenues));
}

function cancelAppointment(id){
    updateAppointment(id, "canceled", () => renderAppointments());
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

        let rightDivEl = document.createElement('div');

        let endBtn = document.createElement('button');
        endBtn.setAttribute('id', 'end-session');
        endBtn.onclick = () => endAppointment(repo._id);
        endBtn.appendChild(document.createTextNode('Finalizar'));

        let cancelBtn = document.createElement('button');
        cancelBtn.setAttribute('id', 'cancel-session');
        cancelBtn.onclick = () => cancelAppointment(repo._id);
        cancelBtn.appendChild(document.createTextNode('Cancelar'));

        leftDivEl.appendChild(nameEl);
        leftDivEl.appendChild(customerEl);
        leftDivEl.appendChild(serviceEl);

        rightDivEl.appendChild(endBtn);
        rightDivEl.appendChild(cancelBtn);

        let listItemEl = document.createElement('li');
        listItemEl.appendChild(leftDivEl);
        listItemEl.appendChild(rightDivEl);

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