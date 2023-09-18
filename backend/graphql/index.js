import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from '@prisma/client'
import { typeDefs } from "./schema.js";
import { service } from "./service/service.js";


const prisma = new PrismaClient()
const PORT= 4000;

const resolvers = {
    Query: {
        users(parent, args){
            return service.users()
        },
        games(parent, args){
            return service.games()
        },
        getGames(parent, args){
            return service.getGames(args.id)
        }
    },
    Mutation: {
        createUser(parent, args){
            return service.createUser(args.name, args.password, args.email)
        },
        createGame(parent, args){
            return service.createGame(args.name, args.description, args.releaseDate, args.developer, args.rate)
        },
        addGame(parent, args){
            return service.addGame(args.id, args.gameId)
        },
        removeGame(parent, args){
            return service.removeGame(args.id, args.gameId)
        },
        login(parent, args){
            return service.login(args.email, args.password)
        },
    }
}



//setup server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: {port: PORT},
});

console.log(`🚀 Server ready at ${url}`);