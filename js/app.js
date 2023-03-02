

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => representData(data.data.tools))
}


const representData = (dataArray) => {

    const firstSixData = dataArray.slice(0, 6);
    showData(firstSixData);
}

const showData = (dataArray) => {
    const dataContainer = document.getElementById('data-container');

    
    dataArray.forEach(data => {

        const dataDiv = document.createElement('div');
        dataDiv.classList.add('col');
        dataDiv.classList.add('col-lg-4');
        // data.classList.add('');
        dataDiv.innerHTML = `
            <img src= ${data.image} class='img-fluid'>
        `;
        dataContainer.appendChild(dataDiv);
    })
}








loadData();