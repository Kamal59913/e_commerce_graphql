import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from 'cookies-next';

const createApolloClient = () => {
  const PORT = process.env.NEXT_PUBLIC_SERVER_URL || 8080;
  const httpLink = createHttpLink({
    uri: `http://localhost:${PORT}/graphql`, // Replace with your GraphQL endpoint
  });

  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = getCookie('AccessToken');
    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink), // Chain authLink and httpLink
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
