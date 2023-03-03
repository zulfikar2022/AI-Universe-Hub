

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools))
}





const showData = (dataArray) => {
    const dataContainer = document.getElementById('data-container');
    console.log(dataArray);

    dataArray.forEach(data => {

        const dataDiv = document.createElement('div');

        dataDiv.classList.add('border');
        dataDiv.classList.add('rounded');
        dataDiv.classList.add('dataDiv-style');

        dataDiv.innerHTML = `
            <img src= ${data.image} class="img-fluid p-3 rounded">
            <div class="p-3">
                 <h2>Features</h2>
                    <ol id=list-container-${data.id}>

                    </ol>
                    
            </div>

        `;

        console.log(dataDiv);
        console.log(document.getElementById('list-container-01'));
        console.log(`list-container-${data.id}`);

        for (let i = 0; i < data.features.length; i++) {

            const li = document.createElement('li');
            li.innerText = `${data.features[i]}`;
            console.log(li);
        }
        dataContainer.appendChild(dataDiv);
    })
}








loadData();