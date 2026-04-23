const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function fixIndex() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        const db = mongoose.connection.db;
        const collections = await db.listCollections({ name: 'users' }).toArray();
        
        if (collections.length > 0) {
            console.log('Dropping username index...');
            try {
                await db.collection('users').dropIndex('username_1');
                console.log('Index username_1 dropped successfully');
            } catch (e) {
                console.log('Index username_1 not found or already dropped');
            }
        }
        
        await mongoose.disconnect();
        console.log('Disconnected');
    } catch (err) {
        console.error('Error:', err);
    }
}

fixIndex();
