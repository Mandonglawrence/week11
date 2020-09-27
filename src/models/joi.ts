import joi from "joi";

export function joiVal(data:Record<string, unknown>) {
  const joiOrganizationSchema = joi.object({
    organization: joi.string().min(5).required(),
    ceo:joi.string().required(),
    products: joi.array().items(joi.string()).required(),
    marketValue: joi.number().required(),
    address: joi.string().required(),
    country: joi.string().required(),
    noOfEmployees: joi.number().required(),
    employees: joi.array().items(joi.string()).required(),
  });
  return joiOrganizationSchema.validate(data,{abortEarly:false})
  
}
