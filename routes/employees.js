var express = require("express");
var router = express.Router();

let employees = [
    {id: 1, firstName:"Juan", lastName:"Dela Cruz", age: 24,gender: "male", jobTitle: "Manager"},
    {id: 2, firstName:"Anna", lastName:"Salvador", age: 21, gender: "female", jobTitle: "Junior Dev"},
    {id: 3, firstName:"Mark", lastName:"Bautista", age: 28, gender: "male", jobTitle: "Senior Fullstack Dev"},
    {id: 4, firstName:"Micheal", lastName:"Garcia", age: 31, gender: "male", jobTitle: "CEO"},
    {id: 5, firstName:"Anna", lastName:"Salvador", age: 21, gender: "female", jobTitle: "Junior Dev"},
    {id: 6, firstName:"Mark", lastName:"Bautista", age: 28, gender: "male", jobTitle: "Senior Fullstack Dev"},
    {id: 7, firstName:"Micheal", lastName:"Garcia", age: 31, gender: "male", jobTitle: "CEO"},
];

router.get("/", (req, res, next) => {
    res.send(employees);
});

router.get("/count/all", (req, res) => {
    res.status(200).send({total: employees.length});
});

router.get("/:id", (req,res) => {
    const { id } = req.params;
    let emp = employees.find((item) => item.id === Number(id));
    res.status(200).send(emp ?? "Record not found!");
});

router.get("/name/:keyword",(req,res)=>{
const { keyword } = req.params;
let list = employees.filter((item) => 
(item.firstName.toLowerCase().includes(keyword) || item.lastName.toLowerCase().includes(keyword)))
res.status(200).send(list.length > 0 ? list : keyword + "is not found!");
});

router.post('/:id', (req, res)=>{
    let emp = {
        id: employees.length + 1,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        code:req.body.code,
        age:req.body.age,
        gender:req.body.gender,
        jobTitle:req.body.jobTitle,
    }
    employees.push(emp);
    res.status(200).send(emp);

});

router.put('/:id', (req, res) =>{
    let id = req.params;

    let emp = employees.find((item) => item.id === Number(req.body.id));

    emp.firstName = req.body.firstName;
    emp.lastName = req.body.lastName;
    emp.code = req.body.code;
    emp.age = req.body.age;
    emp.gender = req.body.gender;
    emp.jobTitle = req.body.jobTitle;

    res.status(200).send(emp);

});

router.delete('/:id', (req, res) =>{
    employees = employees.filter((item) => item.id !== Number(req.body.id));
    res.status(200).send({message: "Record " + req.body.id + " has been deleted."});

});

module.exports = router;