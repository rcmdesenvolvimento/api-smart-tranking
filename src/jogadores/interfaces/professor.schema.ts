/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProfessorSchema = new mongoose.Schema({
    nome: String,
    age: String,
}, {timestamps: true, collection: 'professor'})