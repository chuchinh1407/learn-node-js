//lam viec voi validator

const Joi = require('@hapi/joi');

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body);
        if (validatorResult.error) {
            return res.status(400).json(validatorResul.error);
        } else {
            if (!req.value) req.value = {};
            if (!req.value['params']) req.value.params = {};
                req.value.body=validatorResult.value;
                next()
        }
    }
}
const validateParam = (schema, nameValidator) => {
    return (req, res, next) => {
        console.log('params....', req.params[nameValidator]);
        const validatorResul = schema.validate({
            param: req.params[nameValidator]
        })
        console.log('result', validatorResul)

        if (validatorResul.error) {
            return res.status(400).json(validatorResul.error);
        } else {
            if (!req.value) req.value = {};
            if (!req.value['params']) req.value.params = {};
            req.value.params[nameValidator] = req.params[nameValidator];
            next();
        }
    }
}

const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    userSchema:Joi.object().keys({
        firstName:Joi.string().min(2).required(),
        lastName:Joi.string().min(2).required(),
        email:Joi.string().email().required()
    })
}

module.exports = {
    validateParam,
    schemas,
    validateBody
};