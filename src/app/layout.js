import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'KeepMe - Expert Fragrance Manufacturers & Premium Glass Packaging',
  description: 'From initial concept to final fulfillment, KeepMe delivers above and beyond customer expectations in fragrance manufacturing and glass packaging.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
