const {MongoClient} = require('mongodb');

async function connect() {
  // Connection URL
  const url = 'mongodb://localhost:27017/my_database'

  let db

  try {
    db = await MongoClient.connect(url)
    console.log('Connected')
  } catch (err) {
    // Handle error
    console.log("Could not connect to database, please try again.")
  }

  return db
}

// Creates catalog colleection with schema validation
async function createCollections() {
    db.createCollections("catalog", {
        validator: { $jsonSchema: {
            bsonType: "object",
            required: ["name, sku"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "Name is required"
                },
                sku: {
                    bsonType: "int",
                    description: "SKU is required"
                }
            }
        }}
    })
}

// Creates the inventory and transactions collections and polulates all of the collections
async function insertDocuments (db) {
    // Get the documents collection
    const catalog = db.collection('catalog')
    const inventory = db.collection('inventory')
    const transactions = db.collection('transactions')
  
    // Insert some documents
    const insertCatalog = await catalog.insertMany([
      {
        name: 'Book 1',
        sku: 123
      }, {
        name: 'Book 2',
        sku: 456
      }
    ])

    const insertInventory = await inventory.insertMany([
        {
          name: 'Book 1',
          sku: 123,
          amountInStock: 7,
          lastReceived: "4/30/21"
        }, {
          name: 'Book 2',
          sku: 456,
          amountInStock: 2,
          lastReceived: "3/23/21"
        }
      ])

    const insertTransactions = await transactions.insertMany([
      {
        transactionID: 1,
        name: 'Book 1',
        sku: 123,
        purchaseDate: "5/3/21",
        purchaseAmount: 1,
        transactionTotal: 50
      }, {
        transactionID: 2,
        name: 'Book 2',
        sku: 456,
        purchaseDate: "3/15/21",
        purchaseAmount: 1,
        transactionTotal: 100
      }
    ])
  
    return insertCatalog, insertTransactions, insertInventory
}