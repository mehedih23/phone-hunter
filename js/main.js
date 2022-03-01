const commonDisplay = (id, block) => { 
    if (block == true) {
        return document.getElementById(id).style.display = 'block';
    }
    else{
        return document.getElementById(id).style.display = 'none';
    }
}
const commonEmptyText = (id) => { 
    return document.getElementById(id).innerText = '';
 }

 
// Get Value from api //
const getSearchValue = () => {
    const getSearchText = document.getElementById('search-txt').value;
    document.getElementById('search-txt').value = '';
    
    if (getSearchText == "") {
        document.getElementById('error').innerText = 'Please Enter A Text';
        
        commonEmptyText('phones-div');
        commonDisplay('more-items', false);
        
        
    } else {

        const phoneUrl = `https://openapi.programming-hero.com/api/phones?search=${getSearchText}`;
        fetch(phoneUrl)
        .then(response => response.json())
        .then(data => loadData(data))

        commonEmptyText('error');
        commonDisplay('spinner', true);
    }

};



// Show Data On Display //
const loadData = (data) => {
    
    const lists = data.data;
    const first20Data = lists.slice(0, 20);
    if (data.status === false) {
        document.getElementById('error').innerText = 'Opps Sorry! No Phone Found';
        commonDisplay('spinner', false);
        commonEmptyText('phones-div');
        commonDisplay('more-items', false);
        
    } else {
        commonEmptyText('error');
        const phonesDivison = document.getElementById('phones-div');
        phonesDivison.innerText = '';
        commonDisplay('spinner', false);
        first20Data.forEach(element => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 border-0">
                    <img src="${element.image}" width="250px" class="img-fluid" alt="" srcset="">
                        <div class="card-body">
                            <h4>Name : ${element.phone_name}</h4>
                            <p>Brand Name : ${element.brand}</p>
                        </div>
                        <div class="card-footer border-0">
                            <button onclick="moreDetails('${element.slug}')" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#phone-details"> Scout </button>
                        </div>
                    </div>
                </div>  
            `;
            phonesDivison.appendChild(div);
        });
        commonDisplay('more-items', true);
    };
};


// Get Single Phone Id //
const moreDetails = (itemId) => {
    const idUrl = `https://openapi.programming-hero.com/api/phone/${itemId}`;
    fetch(idUrl)
        .then(response => response.json())
        .then(data => details(data.data))
};


// Get Single Phone Details //
const details = (data) => {
    const sensors = data.mainFeatures.sensors;
    const date = (data.releaseDate) ? data.releaseDate : "No Date Found";

    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <img class="rounded-3" src="${data.image}" alt="" srcset="">
        <h6 class="mt-2 text-white">
            <span class="text-warning">Name : </span>${data.name}
        </h6>
        <p class="text-white">
            <span class="text-warning">Display Size :</span> ${data.mainFeatures.displaySize}
        </p>
        <p class="all-data text-white">
            <span class="text-warning">Release Date :</span> ${date}
        </p>
        <p class="all-data text-white">
            <span class="text-warning">ChipSet :</span> ${data.mainFeatures.chipSet}
        </p>
        <p class="all-data text-white">
            <span class="text-warning">Storage :</span> ${data.mainFeatures.storage}
        </p>
        <p class="all-data text-white">
            <span class="text-warning">Memory :</span> ${data.mainFeatures.memory}
        </p>
        <p class="all-data text-white">
            <span class="text-warning">Sensors :</span> <br/>
            ${[...sensors]}
        </p >
    `;
    const p = document.createElement('p');
    if (data.others == undefined) {
        p.classList.add('all-data');
        p.classList.add('text-white');
        p.innerHTML = `
        <span class="text-warning">Others : </span>No Data Found`;
    }
    else{
        for (const [key, value] of Object.entries(data.others)) {
            p.classList.add('all-data');
            p.classList.add('text-white');
            p.innerHTML = `
            <span class="text-warning">Others :</span> <br />
            ${key}: ${value}
            `;
        };
    }
    modalBody.appendChild(div);
    modalBody.appendChild(p);
};




