import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./contexts/AuthContext";
import  Router from "./Router";
import { client } from './lib/apollo'

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider >
          <Router />
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App