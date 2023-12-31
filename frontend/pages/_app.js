// App.js
import '../styles/globals.css';
import '../styles/style.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import UserLogin from '../auth/userLogin';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <div className="container">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}
