import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { Router } from "./Router";

export const App = () => {
  return (
    <AuthProvider >
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App