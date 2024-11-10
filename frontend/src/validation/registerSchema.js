import { date, number, object, string, } from 'yup';

export let userSchema = object({
  firstName: string().required("Enter Your First Name"),
  email: string().email("Enter a valid email").required("Enter Your Email"),
  pass: string().required("Create a Password"),
  secretPass: string().required("Create a Password"),

});
export let loginSchema = object({
  email: string().email("Enter a valid email").required("Enter Your Email"),
  pass: string().required("Create a Password"),

});



