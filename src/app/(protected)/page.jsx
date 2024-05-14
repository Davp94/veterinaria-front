// import { PrimeReactProvider } from 'primereact/api';
import BasicDemo from "../../feature/demo.component";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
