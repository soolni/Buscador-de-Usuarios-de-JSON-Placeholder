const DATA_URL = `https://jsonplaceholder.typicode.com/users`

const container = document.getElementById("personas")
const search = document.getElementById("buscador")
const info = document.getElementById("moreInfo")

let peopleArray = []
let searchedPeople = []
let clickedPerson = undefined
let id = undefined

function getIdInfo(id) {
    localStorage.setItem("ID", id);
    let personID = parseInt(localStorage.getItem("ID"))
    console.log("peopleArray")
    console.log(peopleArray)
    console.log("searchedPeople")
    console.log(searchedPeople)
    console.log("personID")
    console.log(personID)
    console.log(typeof(personID))

    clickedPerson = peopleArray.filter(user => user.id == personID)
    console.log("clickedPerson")
    console.log(clickedPerson)
}

function removeInfo(){
    while (info.firstChild) {
       info.removeChild(info.firstChild);
    }
}

function showInfo(){
    if (clickedPerson !=undefined) {
        info.classList.remove("d-none")
        info.innerHTML = 

            `
            <div class="col">
                <div class="card cardInfo">
                    <br>
                    <h3 class="fw-bold text-center text-uppercase nombrePersona">${clickedPerson[0].name}</h3>
                    <br>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <strong>INFO</strong>
                            </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>Username: </strong> ${clickedPerson[0].username}
                                    <br>
                                    <strong>Phone: </strong> ${clickedPerson[0].phone}
                                    <br>
                                    <strong>Website: </strong> ${clickedPerson[0].website}
                                 </div>
                            </div>
                        </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <strong>ADDRESS</strong>
                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>Street: </strong> ${clickedPerson[0].address.street}
                                <br>
                                <strong>Suite: </strong> ${clickedPerson[0].address.suite}
                                <br>
                                <strong>City: </strong> ${clickedPerson[0].address.city}
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <strong>WORK</strong>
                        </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>Company: </strong> "${clickedPerson[0].company.name}"
                                <br>
                                <p class="phrase">${clickedPerson[0].company.catchPhrase}</p>
                            </div>
                        </div>
                    </div>
                    <br>
                </div>
                <button onclick="removeInfo()" class="btn cerrar">Close</button>
            </div>
            `
    }
}

function getIdAndInfo(id) {
    getIdInfo(id);
    showInfo();
}

function showPeople(array){
    let contentToAppend = ""
    array.forEach(user => {

        contentToAppend +=`
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h4 class="fw-bold text-uppercase nombrePersona">${user.name}</h4><br>
                    <button type="button" class="btn saberMas" onclick="getIdAndInfo(${user.id})">
                            Saber más!
                    </button>
                </div>
            </div>
        </div>
        `
    })

container.innerHTML = contentToAppend

}

async function getData() {
    try {
        
        const response = await fetch(DATA_URL);
        peopleArray = await response.json();

        showPeople(peopleArray)
        getIdInfo(id)
       
        search.addEventListener("input", e => {
            
            const inputText = e.target.value.toUpperCase().trim();
            searchedPeople = peopleArray.filter(user => user.name.toUpperCase().includes(inputText))

            showPeople(searchedPeople)
            getIdInfo(id)

        })
    
    } catch(error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    getData()
})


