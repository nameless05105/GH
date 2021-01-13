const Module = require('../models/module')

createModule = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Не заполенны данные',
        })
    }

    console.log(body);
    let comp = new Array;
    body.components.forEach(function(component) {
        let c = 0;
        for(let i = 0; i < component.count; i++){
            console.log('with number',{component: component.component, number: c});
            comp.push({component: component.component, number: c})
            c=c+1;
          }
      });

    const module = new Module({type: body.type, components: comp, values:[]})

    if (!module) {
        return res.status(400).json({ success: false, error: err })
    }

    module
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: module._id,
                message: 'Сreated',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Not created',
            })
        })
}

getModules = async (req, res) => {
    await Module.find({}, (err, modules) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!modules.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Modules not found' })
        }
        return res.status(200).json({ success: true, data: modules })
    }).catch(err => console.log(err))
}

module.exports = {
    createModule,
    getModules
}