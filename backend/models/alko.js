const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const getHinnasto = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected successfully to MongoDB database');

    const db = client.db(process.env.DB_NAME);

    const alko_hinnasto = await db.collection('hinnasto').find({}).toArray();

    client.close();
    return alko_hinnasto;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching journey details ');
  }
};

const incrementOrderAmount = async (id) => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected successfully to MongoDB database');

    const db = client.db(process.env.DB_NAME);

    const result = await db
      .collection('hinnasto')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { orderamount: 1 } },
        { returnOriginal: false }
      );

    client.close();
    return result.value;
  } catch (error) {
    console.log(error);
    throw new Error('Error incrementing order amount');
  }
};

module.exports = { getHinnasto, incrementOrderAmount };
