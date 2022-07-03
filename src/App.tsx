import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./contexts/AuthContext";
import  {Routerx} from "./Router";
import { client } from './lib/apollo'
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider >
          <Layout>
             <Routerx />
          </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App