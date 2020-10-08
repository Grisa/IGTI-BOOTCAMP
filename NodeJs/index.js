import { futimesSync, promises as fs, writeFile } from "fs";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

readAndWriteFiles()
//rl.question("Digite uma sigla: ", sigla => { returnUFCityCount(sigla); rl.close(); })
//getStateOrderCounterDesc();
getStateOrderCounterAsc();
//getStateOrderNameDesc();
//getStateOrderNameAsc();
//getLongestCityName()
//getSmallestCityName()

async function readAndWriteFiles() {
    const cityString = await fs.readFile("jsonTrabalho/Cidades.json", "utf-8");
    var cityJson = JSON.parse(cityString);

    const statesString = await fs.readFile("jsonTrabalho/Estados.json", "utf-8");
    var statesJson = JSON.parse(statesString);
    statesJson.forEach(element => {
        let obj = cityJson.filter(value => {
            if (element.ID == value.Estado) {
                return value;
            }
        });

        fs.writeFile("./jsonTrabalho/" + element.Sigla + ".json", JSON.stringify(obj));
    });
}

async function returnUFCityCount(UFName) {

    const stateString = await fs.readFile("./jsonTrabalho/" + UFName + ".json", "utf-8");
    var state = JSON.parse(stateString);

    return state.length;
}

async function getStateOrderCounterDesc() {
    const statesString = await fs.readFile("jsonTrabalho/Estados.json", "utf-8");
    let statesJson = JSON.parse(statesString);

    let response = await Promise.all(statesJson.map(async element => {
        return new Promise(async (res, rej) => {
            let count = await returnUFCityCount(element.Sigla);
            res({ UF: element.Sigla, ct: count })
        })
    }));

    console.log(response.sort((a, b) => b.ct - a.ct).slice(0, 5))
}

async function getStateOrderCounterAsc() {
    const statesString = await fs.readFile("jsonTrabalho/Estados.json", "utf-8");
    let statesJson = JSON.parse(statesString);

    let response = await Promise.all(statesJson.map(async element => {
        return new Promise(async (res, rej) => {
            let count = await returnUFCityCount(element.Sigla);
            res({ UF: element.Sigla, ct: count })
        })
    }));

    console.log(response.sort((a, b) => a.ct - b.ct).slice(0, 5))
}

async function returnUFCityNameDesc(UFName) {

    const stateString = await fs.readFile("./jsonTrabalho/" + UFName + ".json", "utf-8");
    let state = JSON.parse(stateString);

    return state.sort((a, b) => b.Nome.length - a.Nome.length)[0].Nome
}

async function returnUFCityNameAsc(UFName) {

    const stateString = await fs.readFile("./jsonTrabalho/" + UFName + ".json", "utf-8");
    let state = JSON.parse(stateString);

    return state.sort((a, b) => a.Nome.length - b.Nome.length)[0].Nome
}

async function getStateOrderNameDesc() {
    const statesString = await fs.readFile("jsonTrabalho/Estados.json", "utf-8");
    let statesJson = JSON.parse(statesString);

    let response = await Promise.all(statesJson.map(async element => {
        return new Promise(async (res, rej) => {
            let name = await returnUFCityNameDesc(element.Sigla);
            res({ UF: element.Sigla, name })
        })
    }));

    console.log(response.sort((a, b) => a.name.length - b.name.length).slice(0, 5))
}

async function getStateOrderNameAsc() {
    const statesString = await fs.readFile("jsonTrabalho/Estados.json", "utf-8");
    let statesJson = JSON.parse(statesString);

    let response = await Promise.all(statesJson.map(async element => {
        return new Promise(async (res, rej) => {
            let name = await returnUFCityNameAsc(element.Sigla);
            res({ UF: element.Sigla, name })
        })
    }));

    console.log(response.sort((a, b) => b.name.length - a.name.length).slice(0, 5))
}

async function getLongestCityName() {
    const statesString = await fs.readFile("jsonTrabalho/Estados.json", "utf-8");
    let statesJson = JSON.parse(statesString);

    let response = await Promise.all(statesJson.map(async element => {
        return new Promise(async (res, rej) => {
            let name = await returnUFCityNameDesc(element.Sigla);
            res({ UF: element.Sigla, name })
        })
    }));

    console.log(response.sort((a, b) => b.name.length - a.name.length)[0])
}

async function getSmallestCityName() {
    const statesString = await fs.readFile("jsonTrabalho/Estados.json", "utf-8");
    let statesJson = JSON.parse(statesString);

    let response = await Promise.all(statesJson.map(async element => {
        return new Promise(async (res, rej) => {
            let name = await returnUFCityNameAsc(element.Sigla);
            res({ UF: element.Sigla, name })
        })
    }));

    console.log(response.sort((a, b) => b.name.length - a.name.length))
}

/*

Criar um método que imprima no console a cidade de maior nome entre todos os
estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF"

async function writeJsonFiles() {
    try {
        const arrCarros = ["1", "2"]
        const obj = {
            carros: arrCarros
        }

        await fs.writeFile("teste.json", JSON.stringify(obj));
        const data = await fs.readFile("teste.json", "utf-8");
        console.log(JSON.parse(data));
    } catch (err) {
        console.log(err);
    }
}

writeJsonFiles();
*/




/*
fs.writeFile("teste.txt", "xxxxx", function (err) {
    if (err) {
        console.log(err)
    } else {
        fs.readFile("teste.txt", "utf-8", function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }
})
*/