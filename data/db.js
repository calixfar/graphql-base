import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/dbBase', {userNewUrlParser : true});

mongoose.set('setFindAndModify', false);

const personSchema = new mongoose.Schema({
    document : String,
    name : String,
    surname : String,
    birthDate: String,
    gender : String,
    email : String,
    phone : String,
    address : String,
    state : Boolean,
    typeUser : String
})

const Person = mongoose.model('personas', personSchema)
export {Person};