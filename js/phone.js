// function loadPhone(){
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//         .then(res => res.json())
//         .then(data => console.log(data))
// }

const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data
    displayPhones(phones);
}

const displayPhones = (phones) => {

    const phoneContainer = document.getElementById('phone-container')

    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-100';
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="text-4xl">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <h2 class="text-4xl">$999</h2>
                <div class="card-actions">
                    <button class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
}




loadPhone();