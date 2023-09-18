import {gql} from '@apollo/client';

export const SIGNUP = gql`   
    mutation Mutation($name: String!, $password: String!, $email: String!) {
        createUser(name: $name, password: $password, email: $email) {
            id
            name
            email
        }
    }
`;