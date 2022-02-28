
const getSearchValue = () => {

    const getSearchText = document.getElementById('search-txt').value;
    document.getElementById('search-txt').value = '';

    const phoneUrl = `https://openapi.programming-hero.com/api/phones?search=${getSearchText}`;
    fetch(phoneUrl)
        .then(response => response.json())
        .then(data => loadData(data))

};
getSearchValue();


const loadData = (data) => {
    const lists = data.data;
    const first20Data = lists.slice(0, 20);
    if (data.status === false) {
        document.getElementById('error').innerText = 'Opps Sorry! No Phone Found';
    }

    else {
        document.getElementById('error').innerText = '';
        // console.log(lists);
        const phonesDivison = document.getElementById('phones-div');
        phonesDivison.innerText = '';
        first20Data.forEach(element => {
            const div = document.createElement('div');
            div.classList.add('col-lg-4');
            div.classList.add('col-12');
            div.innerHTML = `
                
                    <img src="${element.image}" class="img-fluid" alt="" srcset="">
                    <h4>Name : ${element.phone_name}</h4>
                    <p>Brand Name : ${element.brand}</p>
                    <button onclick="moreDetails('${element.slug}')" class="btn btn-outline-dark"> Scout </button>
                
            `;
            phonesDivison.appendChild(div);
        });
    };
};

const moreDetails = (itemId) => {
    const idUrl = `https://openapi.programming-hero.com/api/phone/${itemId}`;
    fetch(idUrl)
        .then(response => response.json())
        .then(data => console.log(data))
};








