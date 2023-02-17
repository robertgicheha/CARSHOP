import Joi from 'joi'






export const registration = Joi.object({
    userName:Joi.string().required().messages({
        'string.empty':' Please add a User Name'
    }),
    email:Joi.string().required().email().messages({
        'string.empty':' Please add an Email',
        'string.email':'Not a Valid Email'
    }),
    password:Joi.string().required().pattern(new
        RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')),
    address:Joi.string(),
    fullname:Joi.string(),
    phoneNo:Joi.string(),
    country:Joi.string(),
    isAdmin:Joi.string()
    
})

export const loginSchema= Joi.object({
    userName:Joi.string().required().messages({
        'string.empty':' Please add a User Name'
    }),
    password:Joi.string().required().pattern(new
        RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$'))
})

export const car = Joi.object({
    carId: Joi.string().required(), 
    model:Joi.string().required() , 
    bodyType: Joi.string().required() , 
    brand: Joi.string().required(),
    prices: Joi.number().required(),
    isDeleted: Joi.string(),
    pictureUrl: Joi.string()
     
})

export const cartSchema = Joi.object({
    cardID: Joi.string().required(),
  carBrand: Joi.string().required(),
  userId: Joi.string().required(),
  carId: Joi.string().required(),
  prices: Joi.number().required(),
  quantity: Joi.number().required()
})

