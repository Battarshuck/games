import { controller } from '../controller/controller.js'

export const service = {
    users: async () => {
        return controller.users()
    },
    games: async () => {
        return controller.games()
    },
    login: async (email, password) => {
        return controller.login(email, password)
    },
    getGames: async (id) => {
        return controller.getGames(id)
    },
    createUser: async (name, password, email) => {
        return controller.createUser(name, password, email)
    },
    createGame: async (name, description, releaseDate, developer, rate) => {
        return controller.createGame(name, description, releaseDate, developer, rate)
    },
    addGame: async (id, gameId) => {
        return controller.addGame(id, gameId)
    },
    removeGame: async (id, gameId) => {
        return controller.removeGame(id, gameId)
    }
}
