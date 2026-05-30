 


const selectcont = document.querySelectorAll(".select-container select")
const select1 = document.querySelector(".select1-select")
const select2 = document.querySelector(".select2-select")


for (const select of selectcont) {
    for (const currCode in countryList) {

        let newOption = document.createElement("option")
        newOption.innerText = currCode.toUpperCase();
        newOption.value = currCode;


        if (select.name === "from" && currCode === "usd") {
            newOption.selected = true;
        }

        else if (select.name === "to" && currCode === "inr") {
            newOption.selected = true;
        }

        select.append(newOption)


    }
    select.addEventListener("change", (evnt) => {
        updateflag(evnt.target)
    }
    )
}



const updateflag = (e) => {
    let currcode = e.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = e.parentElement.querySelector(".flag");
    img.src = newSrc;
}


const calculate = async () => {
    let amount = document.querySelector(".ammount");
    let amntval = amount.value;
    let fromcurr = select1.value;
    let tocurr = select2.value;
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr}.json`;

    let response = await fetch(url);
    let data = await response.json();

    let rate = data[fromcurr][tocurr]
    
    let finalexchangeval = amntval * rate

    let msgtext = `${amntval}${fromcurr.toUpperCase()} = ${finalexchangeval}${tocurr.toUpperCase()}`

    document.querySelector(".msg").innerText = msgtext

    if (amntval < 1 || amntval === "") {
        amtVal = 1;
        amount.value = "1";
    } 

}





document.querySelector(".btn").addEventListener("click",
    (evnt) => {
        evnt.preventDefault();
        calculate()
    }

)

window.addEventListener("load",
    (evnt) => {
        calculate()
    }

)



