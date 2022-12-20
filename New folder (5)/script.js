const tableBody = document.querySelector("table tbody");
const popup = document.querySelector(".popup");
const popupBody = document.querySelector(".popup-body");


fetch("https://restcountries.com/v2/all").then((data) => data.json()).then((object) => {
    datatable(object)

    function datatable(data) {
        console.log(data)
        let table = document.getElementById("myTable")
        for (let i = 0; i <= data.length; i++) {
            const country = data[i];
            const currancy = country?.currencies ? handlearray(country.currencies) : null
            const lat = country.latlng ? (country.latlng[0] ? country.latlng[0] : 0) : '';
            const long = country.latlng ? (country.latlng[1] ? country.latlng[1] : 1) : '';

            let row = `<tr>
                           <td>${i + 1}</td>
                            <td>${country?.name}</td>
                            <td>${country?.capital}</td>
                            <td>${country?.population || "-"}</td>
                            <td><img src="${country?.flags.png}"></td>
                            <td>${currancy}</td>
                           
                          
                            <td>
                                <button class="details" 
                                onclick="togglePopup('${country?.name}','${country?.capital}', '${country?.flags.png}', '${country?.population}','${currancy}', '${lat}', '${long}')">  
                                    More details
                                </button>
                            </td>
                        
                               </tr>`

            table.innerHTML += row;

        }
    }
})

function handlearray(data) {
    // alert('2')
    if (data.length > 0) {
        let lang = "-";
        data.forEach((item, index) => {
            lang = item.symbol
        })
        return lang
    } else {
        return "-"
    }
}

function searchfun() {
    // alert('1')
    const filter = document.getElementById("myInput").value.toLowerCase();
    const tr = tableBody.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            const txtValue = td.textContent;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};

function togglePopup(country, capital, flags, population, currency, lat, long) {
    // alert('3')
    popup.classList.toggle("active");

    document.getElementById("popupbody").innerHTML = `<p>Country: ${country}</p>
                         <p>Capital : ${capital}</p>
                         <p>Flags<br><br><img src=" ${flags}"</p>
                         <p>Population :  ${population}</p>
                         <p>Currency : ${currency}</p>
                         <p>Latitude : ${lat}</p>
                         <p>Longitude : ${long}</p>`
};








