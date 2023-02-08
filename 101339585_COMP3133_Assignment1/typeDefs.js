const { gql } = require('apollo-server-express')

const typeDefs = gql`


    type User{
        username: String
        email: String
        password: String
        token: String
    }

    type Employee {
        id: ID
        firstName: String
        lastName: String
        email: String
        gender: String
        salary: Float
    }

    type Query{
        getAllEmployees: [Employee]
        getEmployee(id:ID!): Employee
        registerUser(id: ID!): User
    }

    input RegisterInput{
        username: String
        email: String
        password: String
    }

    input LoginInput{
        email: String
        password: String
    }

    input EmployeeInput{
        firstName: String
        lastName: String
        email: String
        gender: String
        salary: Float
    }

    type Mutation{
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        createEmployee(employee: EmployeeInput!): Employee
        updateEmployee(id:ID!, employee: EmployeeInput): Employee
        deleteEmployee(id:ID!): String
    }
`

module.exports = {typeDefs}