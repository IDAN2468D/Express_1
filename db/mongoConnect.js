const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/Express_1');
    console.log("mongo Connect")
}

module.exports = mongoose;