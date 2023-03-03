

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools, 12))
}





const showData = (fullDataArray, num) => {
    const dataArray = fullDataArray.slice(0, num);
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';
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
                    <hr>
                    <h2>${data.name}</h2>
                    <p><i class="fa-regular fa-calendar-days me-2"></i>${data.published_in}</p>
                    <p onclick="detailsModal(${data.id})" class = "btn-danger btn p-1 my-1">See details</p>
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
            const modal = `
            <div class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
    
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                                <div class="card">
                                    <div class="card-body">
                                        <h4>${data.data.description}</h4>
                                        <div class="d-flex">
                                            <div>${data.data.pricing[0]!=='undefined' ? data.data.pricing[0]:'Free of cost '}/Basic</div>
                                            <div>${data.data.pricing[1]!=='undefined' ? data.data.pricing[0]:'Free of cost '}/Pro</div>
                                            <div>${data.data.pricing[1]!=='undefined' ? data.data.pricing[0]:'Free of cost '}/Enterprise</div>
                                        </div>
                                        <div class="d-flex">
                                            <div>
                                                <h4>Features</h4>
                                                <p>
                                                    ${data.data.features['1']['feature_name']}
                                                    ${data.data.features['2']['feature_name']}
                                                    ${data.data.features['3']['feature_name']}
                                                </p>
                                            </div>
                                            <div>
                                                <h4>Integration</h4>
                                                <p>
                                                    ${data.data.integrations[0]!== undefined ?data.data.integrations[0]:''}
                                                    ${data.data.integrations[1]!== undefined ?data.data.integrations[1]:''}
                                                    ${data.data.integrations[2]!== undefined ?data.data.integrations[2]:''}
                                                    ${data.data.integrations[2]!== undefined ?data.data.integrations[3]:''}
                                                </p>
                                            </div>
    
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                       <img src="${data.data.image_link[0]}" alt="">
                                       <h1>${data.data.}</h1>
                                       <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
            `
        })



}








loadData();