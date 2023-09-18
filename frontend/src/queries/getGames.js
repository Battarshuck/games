import {gql} from '@apollo/client';

export const GETGAMES = gql`   
    query Query($getGamesId: ID!) {
        getGames(id: $getGamesId) {
            name
            developer
            rate
        }
    }

`;