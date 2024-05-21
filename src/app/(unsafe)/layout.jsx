import { PrimeReactProvider } from "primereact/api"

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
  }
  
  export default function UnsafeLayout({ children }) {
    return (
      <html lang="es" suppressHydrationWarning>
      <head></head>
      <body>
        <PrimeReactProvider>
          {children}
        </PrimeReactProvider>
      </body>
    </html>
    )
  }
  