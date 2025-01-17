import { PrimeReactProvider } from "primereact/api"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'
import { LayoutProvider } from '../../layout/context/layoutcontext';
export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
  }
  
  export default function UnsafeLayout({ children }) {
    return (
      <html
        lang='es'
        suppressHydrationWarning
      >
        <head></head>
        <body>
          <PrimeReactProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </PrimeReactProvider>
        </body>
      </html>
    );
  }
  