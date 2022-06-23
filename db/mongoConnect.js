const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://idankzm:idankzm2468@cluster0.purdk.mongodb.net/Express_1?retryWrites=true&w=majority');
    console.log("mongo Connect")
}

module.exports = mongoose;