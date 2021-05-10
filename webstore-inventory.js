// Makes a connection to db
conn = new Mongo();
db = conn.getDB("webstore");

// Creates catalog collection with schema validation 
db.createCollection(("catalog", {
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
}))

// Creates inventory collection
db.createCollection("inventory");

// Creates transations collection
db.createCollection("transactions");

// Output that the collections were created
print("Created collections.")

// Inserts sample data into catalog collection
db.catalog.insert({
    name: "Book 1",
    sku: 123
});


db = db.getSiblingDB('webstore');

// Prints all collections
print("Collections: ", db.getCollectionNames());

// Inserts test data to validate schema
print("Validating schema...")
print(db.catalog.insert( {name: "Test book", sku: 000} ));
