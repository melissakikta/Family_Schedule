import "antd/dist/reset.css"; // Ensures the latest version styles are applied
import "./App.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
//import Ant Design's Layout component
import { Layout } from 'antd'; // Import Ant Design's Layout components

import {ConfigProvider } from 'antd';

import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/NavBar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
  },
};
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//theme configuaration for the app
const themeConfig = {
  token: {
    fontFamily: "'Abril Fatface', impact, serif"
  },
  components: {
    Typography: {
      titleFontSize: 24,
      fontFamily: "'Lato', sans-serif"},
  },
};

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <ApolloProvider client={client}>
        <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--tertiary)" }}>
          <Layout.Header style={{ textAlign: "center", padding: "0px 0" }}>
            <Header />
          </Layout.Header>

            <Navbar />

          <Layout.Content style={{ flex: "1", padding: "20px", maxWidth: "100%", margin: "auto" }}>
            <Outlet />
          </Layout.Content>

          <Layout.Footer style={{ justifyContent: "center", marginTop: "25px", padding: "0px" }}>
            <Footer />
          </Layout.Footer>
        </Layout>
      </ApolloProvider>
    </ConfigProvider>
  );
}

export default App;
