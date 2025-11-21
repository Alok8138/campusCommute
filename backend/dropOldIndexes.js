const mongoose = require("mongoose");
require("dotenv").config();

async function dropOldIndexes() {
  try {
    console.log("Attempting to connect with URI:", process.env.MONGO_URI ? "✓ URI found" : "✗ URI not found");
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const collection = db.collection("buspasses");

    // Get all indexes
    const indexes = await collection.listIndexes().toArray();
    console.log("\nCurrent indexes:", indexes.map(i => i.name));

    // Drop the problematic index if it exists
    try {
      await collection.dropIndex("srNo_1");
      console.log("✓ Dropped srNo_1 index");
    } catch (err) {
      console.log("⚠ srNo_1 index doesn't exist or already dropped");
    }

    // Drop regNo_1 index if it exists
    try {
      await collection.dropIndex("regNo_1");
      console.log("✓ Dropped regNo_1 index");
    } catch (err) {
      console.log("⚠ regNo_1 index doesn't exist or already dropped");
    }

    // List indexes again
    const newIndexes = await collection.listIndexes().toArray();
    console.log("\nIndexes after cleanup:", newIndexes.map(i => i.name));

    console.log("\n✓ Indexes cleaned up successfully!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("✗ Error dropping indexes:", error.message);
    process.exit(1);
  }
}

dropOldIndexes();
