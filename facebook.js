const baseUrl = 'https://randomuser.me/api/';
const baseUrlPeople = '?results=100';
const activityUrl = 'http://www.boredapi.com/api/activity/';

// mainFunction
let people;
let person;
const personsFirstNameLastName = document.getElementById('personsFirstLastName')
const personsAge = document.getElementById('personsAge')
const personsCountry = document.getElementById('personsCountry')
const personsCity = document.getElementById('personsCity')
const personsPicture = document.getElementById('personsPicture')


//mainPeopleActivitys
let activityData;
const activityElement = document.getElementById('activityElement');


//search
const searchInput = document.getElementById('searchInput')
const peopleSearchElement = document.getElementById('peopleSearchElement');

// activitys JOIN PEOPLE
const activitysPeopleElement = document.getElementById('activitysPeopleElement');
let activitysPeopleElement2 = document.getElementById('activitysPeopleElement2');

console.log(searchInput)
searchInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredChars = people.filter(chars => {
        return chars.name.first.toLowerCase().includes(searchString) || chars.name.last.toLowerCase().includes(searchString);
    })
    console.log(filteredChars)

    if (searchInput.value) {
        peopleSearchElement.innerHTML = filteredChars.map((filteredChar) => {
            return `
            <div class="row-2 d-flex">
                <img src="${filteredChar.picture.large}">
                <p class="card-text m-auto">${filteredChar.name.first} ${filteredChar.name.last}</p>
            </div>
            `
        })
    } else {
        peopleSearchElement.innerHTML = '';
    }
})


function mainFunction() {
    fetch(baseUrl + baseUrlPeople)
        .then(response => response.json())
        .then(data => {
            people = data.results;
            person = people[0];
            console.log(people)

            multiplyCards(person);
            nameFunction();
        })
}

function nameFunction() {
    personsFirstNameLastName.innerHTML = person.name.first + ' ' + person.name.last;
    personsAge.innerHTML = 'age: ' + person.dob.age;
    personsCountry.innerHTML = 'country: ' + person.location.country;
    personsCity.innerHTML = 'city: ' + person.location.city;
    personsPicture.src = person.picture.large
}

function peoplesActivitys() {
    fetch(activityUrl)
        .then(response => response.json())
        .then(data => {
            mainActivity = data
            console.log(data)
            activitysPeopleElement.innerHTML = `
    <div class="bg-warning d-flex">
        <img src=${person.picture.large}>
        <div>
        ${person.name.first} ${person.name.last}
        </div> 
        <div class="fs-2">
        ${mainActivity.type}
        </div>
    </div>
    `
        })
    peopleWhoJoinActivity()
}

mainFunction(people)

function multiplyCards(index) {
    for (let i = 1; i <= 6; i++) {
        if (i < 7) {

            fetch(activityUrl)
                .then(response => response.json())
                .then(data => {
                    activityData = data
                    console.log(activityData)
                    personsActivityName.innerHTML += `
            <div class="col-4">
                <div class="card" style="width: 18rem;">
                    <img src="${people[i].picture.large}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${people[i].name.first} ${people[i].name.last}</h5>
                        <p class="card-text">${activityData.activity}</p>
                        <p class="card-text">${activityData.type}</p>
                        <p class="card-text">${activityData.participants}</p>
                    </div>
                </div>
            </div>
                `
                })
        }
    }
}

function peopleWhoJoinActivity() {
    activitysPeopleElement2.innerHTML = '';
    let i = 0
    let interval = setInterval(() => {
        let dude = people[Math.floor(Math.random() * 100 + 1)];
        console.log(dude)
        activitysPeopleElement2.innerHTML += `
        <div class="bg-warning d-flex">
        <img src=${dude.picture.large}>
        <div>
        ${dude.name.first} ${dude.name.last}
        </div> 
    </div>
    `
        i++
        if (i == 5) clearInterval(interval);
    }, 1000)
}

function chatRoomFunction() {

}