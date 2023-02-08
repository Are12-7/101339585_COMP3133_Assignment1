const Employee = require('./models/Employee');
const User = require('./models/User');
const { ApolloError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const resolvers = {

    Query: {
        getAllEmployees: async () => {
            const employees = await Employee.find()
            return employees
        },
        getEmployee: async (_, {id}) => {
            const employee = await Employee.findById(id)
            return employee
        },
        registerUser: async (_, { id }) => {
            const user = await User.findById(id)
            return user
        }

    },

    Mutation: {
        // Register user
        async registerUser(_, { registerInput: { username, email, password } }) {
            // See if user exists
            const userExits = await User.findOne({ email });

            if (userExits) {
                throw new ApolloError('User already registered!!', 'USER_ALREADY_EXISTS');
            }
            //Encrypting password
            var encryptedPassword = await bcrypt.hash(password, 10);

            // user model
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            // JWT
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "DONT_ADD_THIS_HERE",
                {
                    expiresIn: "1h"
                }
            );
            newUser.token = token;
            // Save user
            const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc
            }

        },

        //Login User
        async loginUser(_, { loginInput: { email, password } }) {
            // See if user exists
            const user = await User.findOne({ email });
            //Checking passwords
            if (user && (await bcrypt.compare(password, user.password))) {
                //Create token JWT
                const token = jwt.sign(
                    { user_id: user._id, email },
                    "DONT_ADD_THIS_HERE",
                    {
                        expiresIn: "1h"
                    }
                );
                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }                
            } else {
                throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
            }
        },




        // Create employee
        createEmployee: async (_, args) => {
            const { firstName, lastName, email, gender, salary } = args.employee
            const newEmployee = new Employee({ firstName, lastName, email, gender, salary })
            await newEmployee.save()
            return newEmployee
        },
        // Update employee
        updateEmployee: async (_, { employee, id }) => {
            const employeeUpdated = await Employee.findByIdAndUpdate(id, {
                $set: employee
            }, { new: true })
            return employeeUpdated
            
        },
        // Delete employee
        deleteEmployee: async (_, { id }) => {
            await Employee.findByIdAndDelete(id);
            return "Employee deleted!";
        }

    }
};

module.exports ={resolvers}