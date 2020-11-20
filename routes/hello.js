'use strict'
const express = require('express')
const router = express.Router()
var nn = require('./nntest')

router.get('/', (req, res, next) => {
    const {name = 'world'} = req.query
    res.send({hello: name})
})

router.get('/test', (req, res, next) => {
    const {name = 'world'} = req.query
    var output = 'hello ' + name
    var nntest = nn();
    output = {'nnReturn':nntest}
//    var net = nn()
//
//// this example shows how we could train it to approximate sin(x)
//// from a random set of input/output data.
//    net.train([
//        {input: [0.5248588903807104], output: [0.5010908941521808]},
//        {input: [0], output: [0]},
//        {input: [0.03929789311951026], output: [0.03928777911794752]},
//        {input: [0.07391509227454662], output: [0.07384780553540908]},
//        {input: [0.11062344848178328], output: [0.1103979598825075]},
//        {input: [0.14104655454866588], output: [0.14057935309092454]},
//        {input: [0.06176552915712819], output: [0.06172626426511784]},
//        {input: [0.23915000406559558], output: [0.2368769073277496]},
//        {input: [0.27090200221864513], output: [0.267600651550329]},
//        {input: [0.15760037200525404], output: [0.1569487719674096]},
//        {input: [0.19391102618537845], output: [0.19269808506017222]},
//        {input: [0.42272064974531537], output: [0.4102431360805792]},
//        {input: [0.5248469677288086], output: [0.5010805763172892]},
//        {input: [0.4685300185577944], output: [0.45157520770441445]},
//        {input: [0.6920387226855382], output: [0.6381082150316612]},
//        {input: [0.40666140150278807], output: [0.3955452139761714]},
//        {input: [0.011600911058485508], output: [0.011600650849602313]},
//        {input: [0.404806485096924], output: [0.39384089298297537]},
//        {input: [0.13447276877705008], output: [0.13406785820465852]},
//        {input: [0.22471809106646107], output: [0.222831550102815]}
//    ])
//
//// send it a new input to see its trained output
//    var output = net.send([0.5]) // => 0.48031129953896595
//    console.log(output)

    res.send(output)
})
module.exports = router