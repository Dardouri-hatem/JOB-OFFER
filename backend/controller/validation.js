// Validation
const Joi= require('@hapi/joi')


function ValidationRegister(data){
    const schema = Joi.object({ name: Joi.string() .min(6) .required(),
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() });
        return schema.validate(data)
}
function ValidationLogin(data){
    const schema = Joi.object({
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() });
        
        return  schema.validate(data)
   

}
function ValidationUpdate(data){
    const schema = Joi.object({ name: Joi.string() .min(6) .required(),
        email: Joi.string() .min(6) .required() .email()});
        return schema.validate(data)
}
function ValidationPassword(data){
    const schema = Joi.object({ password: Joi.string() .min(6) .required(),
        repeatPassword : Joi.string() .min(6) .required()});

        return schema.validate(data)
}
module.exports={
    ValidationRegister,
    ValidationLogin,
    ValidationUpdate,
    ValidationPassword,
}
