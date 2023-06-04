require("dotenv").config();
const pdfMake = require("pdfmake");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const utils = require("util");
const puppeteer = require("puppeteer");
const hb = require("handlebars");
const { Collection } = require("mongodb");
const readFile = utils.promisify(fs.readFile);
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://yon:212250369@cluster0.nise7w8.mongodb.net";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    const database = client.db("myData"); // Replace "mydatabase" with your actual database name
    const collection = database.collection("Users"); // Replace "mycollection" with your actual collection name

    // Make a query and fetch documents from the collection
    return collection.find({}).toArray();
  })
  .then(async (documents) => {
    console.log("Documents:", documents);
    let html = start(documents);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // We set the page content as the generated html by handlebars
    await page.setContent(html);
    // We use pdf function to generate the pdf in the same folder as this file.
    await page.pdf({ path: "converted.pdf", format: "A4" });
    await browser.close();
    console.log("PDF Generated");
    client.close();
    sendEmail();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const start = (Documents) => {
  let html = [];
Documents.forEach(Document => {
   html.push( `  
   <style>
   table, th, td {
     border: 1px solid black;
   }</style>
   <h1>דוח תקינות!</h1>
   <body>
    <table>
      <thead>
        <tr>
          <th>שם פרטי+משפחה </th>
          <th>מספר תעודת זהות</th>
          <th>טלפון </th>
          <th>תאריך מינוי</th>
          <th>תאריך סיום</th>
          <th>חתימה</th>
        </tr>
      </thead>
      <tbody>
      <tr>
  <td>${Document.name} </td> 
  <td>${Document.id} </td>
  <td>${Document.number} </td>
   <td>${Document.Start_Date} </td>
  <td>${Document.end_date} </td>
  <td>${Document.signature} </td>
  
  </tr>
  </table>`);
  });
  

  return html;
};

 // Generate the PDF document

console.log("PDF generated successfully");
const sendEmail = () => {

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

let mailOptions = {
  from: "jonatan0585090512@gmail.com",
  to: "workyon2001@gmail.com",
  subject: "דוח תקינות",
  cc: "rs.mahra4546@gmail.com",
  bcc: "rs.mahra4546@gmail.com",
  text: "תעודת תקינות מאושרת, על ידי מנהל עבודה.",
  attachments: [
    {
      filename: "converted.PDF",
      path: "./converted.pdf",
    },
  ],
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    return console.log("Error occurs", err);
  } else return console.log("Email sent!!!");
});
}
