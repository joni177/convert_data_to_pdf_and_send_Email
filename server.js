//  require('dotenv').config();
//  const pdfMake = require('pdfmake')
// const nodemailer = require('nodemailer')
//  const fs = require('fs')
//  const path = require('path')
//  const utils = require('util')
//  const puppeteer = require('puppeteer')
//  const hb = require('handlebars')
//  const readFile = utils.promisify(fs.readFile)
 const db= require("./DbConnection.js");
// NOTE -- CHANGE YOUR PASSWORD AND EMAIL ADDRESS IN .env File

// async function getTemplateHtml() {
//     console.log("Loading template file in memory")

// try {
//     const htmlFilePath = path.resolve("./samplehtml.html"); // Enter the path of your HTML file here
//     return await readFile(htmlFilePath, 'utf8');
// } 
// catch (err) {
//     return Promise.reject("Could not load html template");
// }
// }

// // Create a new PDF document definition
// generatePdfFromDB = () => {
// const docDefinition = {
//   content: [],
// };

// async function generatePdf() {
//     let data = {};
//     getTemplateHtml().then(async (res) => {
//     // Now we have the html code of our template in res object
//     // you can check by logging it on console
//     console.log(res)
//     console.log("HandelBars in Action !! Stay Calm")
//     const template = hb.compile(res, { strict: true });
//     // we have compile our code with handlebars
//     const result = template(data);
//     const html = result;
//     // we are using headless mode
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage()
//     // We set the page content as the generated html by handlebars
//     await page.setContent(html)
//     // We use pdf function to generate the pdf in the same folder as this file.
//     await page.pdf({ path: 'converted.pdf', format: 'A4' })
//     await browser.close();
//     console.log("PDF Generated")
//     }).catch(err => {
//     console.error(err)
// });
// }

//  // Convert the queried data to PDF content
//     result.forEach((item) => {
//       docDefinition.content.push({ text: JSON.stringify(item) });
//     });

// //     // Generate the PDF document
//     const pdfWriter = pdfMake.createPdfKitDocument(docDefinition);
//     pdfWriter.pipe(fs.createWriteStream('output.pdf'));
//     pdfWriter.end();

//     console.log('PDF generated successfully');  
//  generatePdfFromDB();

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });

// let mailOptions = {
//     from: 'jonatan0585090512@gmail.com', 
//     to: 'workyon2001@gmail.com',
//     subject: 'Nodemailer - Test',
//     cc: 'rs.mahra4546@gmail.com',
//     bcc: 'rs.mahra4546@gmail.com',
//     text: 'HEY, I AM JUST SENDING THIS MESSAGE TO TEST MY API',
//     attachments : [
//         {
//             filename : 'converted.PDF' , path: './output.pdf'
//         }
//     ]
// };

// transporter.sendMail(mailOptions, (err, data) => {
//     if (err) {
//         return console.log('Error occurs', err);
//     }
//     else
//     return console.log('Email sent!!!');
    
// });}
