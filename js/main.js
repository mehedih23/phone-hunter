const getSearchValue = () => {
    const getSearchText = document.getElementById('search-txt').value;
    document.getElementById('search-txt').value = '';
    const phoneUrl = `https://openapi.programming-hero.com/api/phones?search=${getSearchText}`;
    fetch(phoneUrl)
        .then(response => response.json())
        .then(data => console.log(data))
};