var myChart;
function displayChart(amount, intrest_payable){
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Intrest', 'Principle Amount'],
            datasets: [{
                data: [intrest_payable, amount],
                backgroundColor: [
                    '#E21717',
                    '#22CB5C',
                ],
                borderWidth: 0,
            }],
        },
    });
}


function UpdateChart(amount, intrest_payable){
    myChart.data.datasets[0].data[0] = intrest_payable;
    myChart.data.datasets[0].data[1] = amount;
    myChart.update();
}

let btn = document.querySelector(".btn");


btn.addEventListener("click", ()=>{
    let amount = document.querySelector(".amount");
    let intrest_rate = document.querySelector(".interest");
    let tenure = document.querySelector(".tenure");
    if(falsy_values(amount,intrest_rate,tenure)){
        return;
    }
    let loan_emi = calculate_emi(amount, intrest_rate, tenure);
    let total_amount = calculate_total(loan_emi, tenure);
    let intrest_payable = calculate_interest_payable(total_amount, amount);
    Update(loan_emi, total_amount, intrest_payable);
    if(myChart){
        UpdateChart(parseFloat(amount.value), intrest_payable);
    }else{
        displayChart(parseFloat(amount.value), intrest_payable);
    }
})



const calculate_emi = (amount, intrest_rate, tenure)=>{
    intrest_rate = intrest_rate.value / 12 / 100;
    amount = parseFloat(amount.value);
    intrest_rate = parseFloat(intrest_rate);
    tenure = parseFloat(tenure.value);
    let emi = amount * intrest_rate * (Math.pow(1 + intrest_rate, tenure)/(Math.pow(1 + intrest_rate, tenure) - 1));
    return Math.round(emi);
}


const calculate_total = (loan_emi, tenure) =>{
    tenure = parseFloat(tenure.value);
    let TA = Math.round(tenure * loan_emi);
    return TA;
}


const calculate_interest_payable = (total_amount, amount)=>{
    amount = parseFloat(amount.value);
    let IP = Math.round(total_amount - amount);
    return IP;
}


const Update = (loan_emi, total_amount, intrest_payable)=>{
    let emi_screen = document.querySelector(".loan-emi");
    let int_screen = document.querySelector(".int-pay");
    let total_screen = document.querySelector(".total");
    emi_screen.innerText = loan_emi + " ₹";
    int_screen.innerText = intrest_payable + " ₹";
    total_screen.innerText = total_amount + " ₹";
}

btn.click();


function falsy_values(amount, intrest_rate, tenure){
    amount = parseFloat(amount.value);
    intrest_rate = parseFloat(intrest_rate);
    tenure = parseFloat(tenure.value);
    if(amount < 1 || intrest_rate < 1 || tenure < 1){
        return true;
    }
    return false;
}