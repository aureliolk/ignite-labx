import { ApolloProvider } from "@apollo/client";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import  Router from "./Router";
import { client } from './lib/apollo'

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider >
        <Layout>
          <Router />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App