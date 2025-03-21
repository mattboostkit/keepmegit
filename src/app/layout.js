import '../styles/globals.css';

export const metadata = {
  title: 'KeepMe - Expert Fragrance Manufacturers & Premium Glass Packaging',
  description: 'From initial concept to final fulfillment, KeepMe delivers above and beyond customer expectations in fragrance manufacturing and glass packaging.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          {/* Header will be implemented as a component */}
        </header>
        <main>{children}</main>
        <footer>
          {/* Footer will be implemented as a component */}
        </footer>
      </body>
    </html>
  )
}
