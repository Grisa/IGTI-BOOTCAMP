import express from "express";
import { futimesSync, promises as fs, writeFile } from "fs";

const defaultEncode = "utf-8";

const app = express();
app.use(express.json())

/*
{
    "id": 2,
    "student": "Loiane Groner",
    "subject": "02 - Node",
    "type": "Fórum",
    "value": 5,
    "timestamp": "2020-05-19T18:21:24.964Z"
}
*/

app.get("/readJson", async (req, res) => {
    const gradeString = await fs.readFile("json/grades.json", defaultEncode);
    var gradeJson = JSON.parse(gradeString);

    res.send(gradeJson);
});

app.post("/add", async (req, res) => {
    let gradeString = await fs.readFile("json/grades.json", defaultEncode);
    let gradeJson = JSON.parse(gradeString);
    let data = req.body;
    try {
        let obj = {
            "id": gradeJson.nextId++,
            "student": data.student,
            "subject": data.subject,
            "type": data.type,
            "value": data.value,
            "timestamp": new Date()
        };

        gradeJson.grades.push(obj);

        fs.writeFile(`./json/grades.json`, JSON.stringify(gradeJson));
    } catch (err) {
        res.status(400).send({ error: err.message })
        res.end()
    }

    res.send("Sucesso no cadastro");
})

app.post("/edit", async (req, res) => {
    let gradeString = await fs.readFile("json/grades.json", defaultEncode);
    let gradeJson = JSON.parse(gradeString);
    let data = req.body;

    let search = gradeJson.grades.find(el => { if (el.id == data.id) return el })

    if (search) {
        if (data.student != null) search.student = data.student;
        if (data.subject != null) search.subject = data.subject;
        if (data.type != null) search.type = data.type;
        if (data.value != null) search.value = data.value;

        gradeJson.grades[search.id - 1] = search;

        fs.writeFile(`./json/grades.json`, JSON.stringify(gradeJson));
    } else {
        res.send("Nao existe o ID");
        res.end()
    }

    res.send("Sucesso no edit");
    res.end()
});

app.post("/delete", async (req, res) => {
    let gradeString = await fs.readFile("json/grades.json", defaultEncode);
    let gradeJson = JSON.parse(gradeString);
    let data = req.body;

    let search = gradeJson.grades.find(el => { if (el.id == data.id) return el })

    if (search) {
        gradeJson.grades.splice(search.id - 1, 1);
        fs.writeFile(`./json/grades.json`, JSON.stringify(gradeJson));
    } else {
        res.send("Nao existe o ID");
        res.end()
    }

    res.send("Sucesso no delete");
    res.end()
})

app.post("/search", async (req, res) => {
    let gradeString = await fs.readFile("json/grades.json", defaultEncode);
    let gradeJson = JSON.parse(gradeString);
    let data = req.body;

    let search = gradeJson.grades.find(el => { if (el.id == data.id) return el })

    if (search) {
        res.send(search);
    } else {
        res.send("Nao existe o ID");
    }
    res.end()
})

app.post("/sumGrades", async (req, res) => {

    let gradeString = await fs.readFile("json/grades.json", defaultEncode);
    let gradeJson = JSON.parse(gradeString);
    let data = req.body;

    let obj = gradeJson.grades.map(el => { if (el.student == data.student) return el })

    if (obj) {
        let gradeSum = 0;
        var x = await obj.forEach(async element => {
            if (!!element) {
                if (data.subject.toLowerCase() == element.subject.toLowerCase()) {
                    gradeSum = gradeSum + element.value;
                }
            }
        });
        res.send(`Soma da nota do aluno ${data.student}: ${gradeSum}`);
    } else {
        res.send("Nao existe o ID");
    }
    res.end()
})

app.listen(3000, () => { console.log("Sucesso") });