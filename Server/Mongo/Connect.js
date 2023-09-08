import mongoose from 'mongoose';
import { Mongo_Connect } from '../API/Default.js';
import userModel from './Models/UserModel.js';

mongoose
    .connect(Mongo_Connect)
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.log(err);
    });
const user = new userModel({
    name: 'Mohammed Ahmed',
    email: 'Ma4539@fayoum.edu.eg',
    password: 'Fu123456&', // Make sure to provide a value for the password field
    phone: '01020737211',
    nationality: 'Egyptian',
    address: 'Fayoum-Matartares',
    role: 'Full Administrator',
    faculty: 'Computers & AI',
    age: '20',
    gender: 'Male',
    nationalID: '30303010102298',
    addBy:'Mohammed Ahmed Ramadan'
});

const find = await userModel.findOne({ nationalID: '30303010102298', email: 'Ma4539@fayoum.edu.eg' });

if (!find) {
    user.save();
}