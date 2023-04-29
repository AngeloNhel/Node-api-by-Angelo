var express = require("express");
var router = express.Router();

const invoiceItems = [{id: 1, description: "Mouse", Qty: 3, unitPrice: 200}, 
                      {id: 2, description: "Keyboard", Qty: 3, unitPrice: 400},
                      {id: 3, description: "Monitor", Qty: 6, unitPrice: 5400},
                      {id: 4,description: "CPU Tower Case", Qty: 3, unitPrice: 1200},
                      {id: 5,description: "Headset", Qty: 3, unitPrice: 500},
                      {id: 6,description: "UPS", Qty: 1, unitPrice: 4000},];


router.get("/",(req, res, next) => {
    res.send(invoiceItems);
});

router.get("/count/all",(req, res) => {
    res.status(200).send({total: invoiceItems.length});
});

router.get("/:id",(req, res) => {
    const { id } = req.params;
    let student = invoiceItems.find((item) =>{
        return item.id === Number(id);
    })
    // res.status(200).send(student ? student : "record not found");
    res.status(200).send(student ?? "record not found");
});

router.get("/name/:keyword",(req, res) => {
    const { keyword } = req.params;
    let list = invoiceItems.filter((item) =>
    (item.description.toLocaleLowerCase().includes(keyword) || item.unitPrice === Number(keyword)));
    res.status(200).send(list.length > 0 ? list : keyword + "is not found");
});

module.exports = router;