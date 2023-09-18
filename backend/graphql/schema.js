export const typeDefs = `#graphql

    type User {
        id: ID!
        name: String!
        password: String!
        email: String!
        games: [Game]

    }

    type Game {
        id: ID!
        name: String!
        description: String!
        releaseDate: String!
        developer: String!
        rate: String!
        User: [User]
    }

    type Query {
        users: [User]
        games: [Game]
        getGames(id: ID!): [Game]
    }

    type Mutation {
        login(email: String!, password: String!): User
        createUser(name: String!, password: String!, email: String!): User
        createGame(name: String!, description: String!, releaseDate: String!, developer: String!, rate: String!): Game
        addGame(id: ID!, gameId: ID!): User
        removeGame(id: ID!, gameId: ID!): User
    }

`;