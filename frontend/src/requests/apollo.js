import { 
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from
  } from '@apollo/client';
  
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            alert(`Graphql error ${message}`);
        });
    }
});

const link = from([
    errorLink,
    new HttpLink({ uri: 'http://localhost:4000' })
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
});

export default client;