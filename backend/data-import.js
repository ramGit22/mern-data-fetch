const xlsx = require('xlsx');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Specify the folder path where the XLSX file is located
const folderPath = 'C:\\Users\\O\\Desktop\\saranen-assignment\\';

// Connection URL
const url = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

async function main() {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected successfully to MongoDB server');

    const db = client.db(dbName);
    const collections = await db
      .listCollections({ name: 'hinnasto' })
      .toArray();
    const bulkInsertOps = [];

    if (collections.length > 0) {
      console.log('Collection already exists, not inserting data');
    } else {
      // Read the XLSX file
      const fileName = 'alko-hinnasto.xlsx';
      const workbook = xlsx.readFile(folderPath + fileName);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);

      let counter = 0;
      const maxDocs = 1000;
      for (const row of data) {
        bulkInsertOps.push(row);
        counter++;
        if (counter >= maxDocs) {
          break;
        }
      }
    }

    if (bulkInsertOps.length > 0) {
      await db.collection('hinnasto').insertMany(bulkInsertOps);
      console.log('Data inserted into the collection');
    } else {
      console.log('No valid data to insert into the collection');
    }
    client.close();
  } catch (err) {
    console.log(err);
  }
}

main();
