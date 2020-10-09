let response;

function data_return() {
    fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo").then(res => {
        res.json().then(data => {
            response = data;
        });
    });
}

data_return();

function runFilter(elValue) {
    let filter = response.results.filter(value => {
        let fullName = value.name.first + ' ' + value.name.last
        if (fullName.toLowerCase().match(elValue.toLowerCase())) {
            return value;
        }
    });

    buildResultDiv(filter);
}

function buildResultDiv(data) {
    let avgAge = 0;
    let count = 0;
    let maleCount = 0;
    let femaleCount = 0;
    let sumAge = 0;

    count = data.length;
    data.forEach(values => {
        if (values != null) {

            sumAge = (values.dob.age + sumAge);

            if (values.gender == 'male') {
                maleCount++;
            } else {
                femaleCount++;
            }
        }
    })

    avgAge = sumAge / count;

    document.getElementById('result').innerHTML = `avg = ${avgAge} <br> male = ${maleCount} <br> female = ${femaleCount} <br> soma = ${sumAge} <br> count = ${count}`
}