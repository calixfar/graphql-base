import {Person} from './db';
import { rejects } from 'assert';


export const resolvers = {

    Query: {

        getCustomPersons : (root, {input}) => {
            const gender = input.gender != undefined ? input.gender : new RegExp('[a-z]', 'i', 'g')
            
            return new Promise((resolve, rejects) => {
                Person.save((error)).find({gender}, (error, person) => {
                    if ( error ) rejects(error)
                    else resolve(person)
                })
            })
        },
        totalPersons : (root) => {
            return new Promise((resolve, rejects) => {
                Person.save((error)).countDocuments({}, (error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                })
            })
        }
    },
    Mutation : {

        insertPerson : (root, {input}) => {
            const newPerson = new Person({
                document : input.document,
                name : input.name,
                surname : input.surname,
                birthDate : input.birthDate,
                gender : input.gender,
                email : input.email,
                phone : input.phone,
                address : input.address,
                state : input.state,
                typeUser : input.typeUser
            });
            newPerson.id = newPerson._id;
            console.log(newPerson)
            return new Promise((resolve, rejects) => {
                newPerson.save((error) => {
                    if (error) rejects(error)
                    else resolve(newPerson)
                })
            })
        },

        updatePerson : (root, {input}) => {

            return new Promise((resolve, rejects) => {
                Person.findOneAndUpdate({_id : input.id}, input, {new : true}, (error, person) => {
                    if ( error ) rejects(error)
                    else resolve(person)
                })
            })
        },

        defusePerson : (root, {input}) => {
            return new Promise((resolve, rejects) => {
                Person.findOneAndUpdate({_id : input.id}, {state : !input.state}, {new : true}, (error, person) => {
                    if (error) rejects(error)
                    else resolve(person)
                })
            })
        }

    }
}