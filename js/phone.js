// function loadPhone(){
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//         .then(res => res.json())
//         .then(data => console.log(data))
// }

const loadPhone = async (searchText, isShowAll) => {
    let res;
    if(searchText){
        console.log(searchText);
        res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    }
    else{
        res = await fetch(`https://openapi.programming-hero.com/api/phones?search=phone`);
    }
    const data = await res.json();
    const phones = data.data
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container carda before adding new cards
    phoneContainer.innerHTML =``;
    // display show all button if there are more than 9 phones
    const showAllConatainer = document.getElementById('show-all-conatainer');
    if(phones.length > 9 && !isShowAll){
        showAllConatainer.classList.remove('hidden');
    }
    else{
        showAllConatainer.classList.add('hidden');
    }

    // display only first 9 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0, 9);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-100';
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Phones" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="text-4xl">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <h2 class="text-4xl">$999</h2>
                <div class="card-actions">
                <button class="btn btn-accent" onclick="handleShowDetail('${phone.slug}')">Show details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}


// handle show details
const handleShowDetail = async (id) =>{
    // load individual phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <div class="flex justify-center items-center my-10">
            <img src="${phone.image}" alt="">
        </div>
        <h3 class="font-bold text-3xl">${phone.name}</h3>
        <p class="my-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="my-4"><span class="font-semibold">Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p class="my-4"><span class="font-semibold">Display size: </span>${phone?.mainFeatures?.displaySize}</p>
        <p class="my-4"><span class="font-semibold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
        <p class="my-4"><span class="font-semibold">Memory: </span>${phone?.mainFeatures?.memory}</p>
        <p class="my-4"><span class="font-semibold">Slug: </span>${phone?.slug}</p>
        <p class="my-4"><span class="font-semibold">Release date:</span>${phone?.releaseDate}</p>
        <p class="my-4"><span class="font-semibold">Brand: </span>${phone?.brand}</p>
        <p class="my-4"><span class="font-semibold">GPS: </span>${phone?.others?.GPS || 'N/A'}</p>

    `;

    // show the modal
    show_details_modal.showModal();
}



// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

const handleSearch2 = () =>{
    toggleLoadingSpinner(true);
    const searchField2 =document.getElementById('search-field2');
    const searchText2 = searchField2.value;
    console.log(searchText2);
    loadPhone(searchText2);
    
}

// loading spinner
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();