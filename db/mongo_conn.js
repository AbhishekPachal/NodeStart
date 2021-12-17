var MongoClient = require('mongodb').MongoClient


module.exports = (async function() {
  const client = await MongoClient.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
  });
 
  const db = client.db(process.env.MONGODB_NAME);
  return { client, db };
})();
