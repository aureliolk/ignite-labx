import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./contexts/AuthContext";
import  {Router} from "./Router";
import { client } from './lib/apollo'
import { Layout } from "./components/Layout";

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