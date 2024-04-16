#! user/env / bin / node
import chalk from "chalk"
import inquirer from "inquirer"

// currency converter API LINK:
let apiLink =
"https://v6.exchangerate-api.com/v6/587bbe7fbb401bfc7fea56fb/latest/PKR";

//  Fecthing Data:
 let fetchData = async (data:any) => {
 let fetchData = await fetch(data);
 let res =await fetchData.json();

 return res. conversion_rates;

 };

//  object convert in Arry
let data= await fetchData(apiLink);
let countries = Object.keys(data);
console.log(countries);

//  user input first country
let firstCountry = await inquirer.prompt([
    {

    type: "list",
    name: "currency",
    message: "please select the first country.",
     choices:  countries,
}
]);

//  first country ask  money from
let userMoney = await inquirer.prompt([

    {
        type: "number",
        name: "money",
        message: `please enter the amount ${chalk.yellow.bold(firstCountry.currency)}`

    }

]);

// second convert money to 
let secondCountry = await inquirer.prompt([
    {

    type: "list",
    name: "currency",
    message: "please select the second country.",
     choices:  countries,
}
]);

// conversion Rate
let convertMoney =
`https://v6.exchangerate-api.com/v6/587bbe7fbb401bfc7fea56fb/pair/${firstCountry.currency}/${secondCountry.currency}`;
console.log(convertMoney);

// fecthing data conversion rate:

let convertData = async (data:any) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rate;
};
let conversionRate = await convertData(convertMoney);


let convertedRate= userMoney.money * conversionRate
console.log(`your ${chalk.greenBright.bold(firstCountry.currency)} ${chalk.redBright.bold(userMoney.money)} in ${chalk.whiteBright.bold(secondCountry.currency)} is ${chalk.yellow.bold(convertedRate)}`);


