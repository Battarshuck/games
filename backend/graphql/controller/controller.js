import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const controller = {
    users: async () => {
        return await prisma.user.findMany({
            include: {
                games: true
            }
        })
    },
    games: async () => {
        return await prisma.game.findMany()
    },
    login: async (email, password) => {
        return await prisma.user.findUnique({
            where: {
                email: email,
                password: password
            }
        })
    },
    getGames: async (id) => {
        //it returns a json object {games: [games]}
        //so we need to return the array of games only, that's why we use .games()
        return await prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                games: true
            }
        }).games()
    },
    createUser: async (name, password, email) => {
        return await prisma.user.create({
            data: {
                name: name,
                password: password,
                email: email
            }
        })
    },
    createGame: async (name, description, releaseDate, developer, rate) => {
        try{
            return await prisma.game.create({
                data: {
                    name: name,
                    description: description,
                    releaseDate: releaseDate,
                    developer: developer,
                    rate: rate
                }
            })
        }
        catch(error) {
            return null
        }
        
    },
    addGame: async (id, gameId) => {
        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                games: {
                    connect: {
                        id: gameId
                    }
                }
            },
            include: { 
                games: true
            }
        })
    },
    removeGame: async (id, gameId) => {
        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                games: {
                    disconnect: {
                        id: gameId
                    }
                }
            },
            include: {
                games: true
            }
        })
    }
}

