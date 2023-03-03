

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools, 6))
}





const showData = (fullDataArray, num) => {
    const dataArray = fullDataArray.slice(0, num);
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    dataArray.forEach(data => {

        const dataDiv = document.createElement('div');

        dataDiv.classList.add('border');
        dataDiv.classList.add('rounded');
        dataDiv.classList.add('dataDiv-style');

        dataDiv.innerHTML = `
            <img src= ${data.image} class="img-fluid p-3 rounded image-height">
            <div class="p-3">
                 <h2>Features</h2>
                    <ol id=list-container-${data.id}>

                    </ol>  
                    <hr>
                    <h2>${data.name}</h2>
                    <p><i class="fa-regular fa-calendar-days me-2"></i>${data.published_in}</p>
                  
                    <button type="button" onclick="detailsModal(${data.id})" class="btn btn-danger p-1 my-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See details</button>
            </div>
        `;
        //testing

        dataContainer.appendChild(dataDiv);
    })
}


const detailsModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id <= 9 ? ('0' + id) : id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);


            const productDescription = document.getElementById('product-description');
            productDescription.innerText = `${data.data.description}`;

            const monthBasis = document.getElementById('month-basis');
            const monthPro = document.getElementById('month-pro');
            const enterprise = document.getElementById('enterprise');
            // pricing calculation
            {
                const pricing = data.data.pricing;

                if (pricing.length === 0) {
                    monthBasis.innerText = `Free of cost/Basis`;
                    monthPro.innerText = `Free of cost/Pro`;
                    enterprise.innerText = `Free of const/Enterprise`;
                }
                else {
                    monthBasis.innerText = `${pricing[0].price} ${pricing[0].plan}`;
                    monthPro.innerText = `${pricing[1].price} ${pricing[1].plan}`;
                    enterprise.innerText = `${pricing[2].price}/ ${pricing[2].plan}`;
                }
            }


            // calculation for features 
            {

                const features = [...[data.data.features]];
                let keysCount = Object.keys(features[0]);
                document.getElementById('features').innerText = ' ';
                if (keysCount.length === 0) {
                    const li = document.createElement('li');
                    li.innerText = "No data found";
                    document.getElementById('features').innerHTML = li;
                }
                else {
                    for (let i = 0; i < keysCount.length; i++) {
                        const li = document.createElement('li');
                        li.innerText = `${features[0][keysCount[i]].feature_name}`;
                        document.getElementById('features').appendChild(li);
                    }
                }
            }


            //calculation for integrations
            {
                const integrations = data.data.integrations;
                document.getElementById('integrations').innerText = ' ';
                if (integrations.length === 0) {
                    const li = document.createElement('li');
                    li.innerText = 'No data found';
                    document.getElementById('integrations').innerHTML = li;
                }
                else {
                    for (let i = 0; i < integrations.length; i++) {
                        const li = document.createElement('li');
                        li.innerText = `${integrations[i]}`;
                        document.getElementById('integrations').appendChild(li);
                    }
                }
            }

            const productImage = document.getElementById('product-image');
            //image management 
            {
                document.getElementById('product-image').innerHTML = ' ';
                if (data.data['image_link'][0].length > 0) {
                    const image = document.getElementById('product-image');
                    image.classList.add('img-fluid');
                    image.src = data.data['image_link'][0];
                }
            }
            const productQuestion = document.getElementById('product-question');
            const productAnswer = document.getElementById('product-answer');

            productQuestion.classList.add('text-center');
            productAnswer.classList.add('text-center');
            productQuestion.classList.add('mt-5');
            productAnswer.classList.add('p-3');
            productQuestion.classList.add('p-3');

            {
                const inputOutput = data.data['input_output_examples'];
                console.log(inputOutput);
                if (inputOutput.length === 0) {
                    productQuestion.innerText = "Data not found";
                    productAnswer.innerText = "Data not found";
                }
                else {
                    productQuestion.innerText = `${inputOutput[0]['input']}`;
                    productAnswer.innerText = `${inputOutput[0]['output']}`;
                }
            }

        })

}

let showMoreCounter = 0;
const showAll = () => {
    console.log('button clicked');

    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools, 12))

    showMoreCounter++;
    if(showMoreCounter!=0){
        document.getElementById('btn-show-more').classList.add('d-none');
    }
}






loadData();