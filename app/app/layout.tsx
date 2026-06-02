import './globals.css'

export const metadata = {
  title: 'Vigileon Codebase',
  description: 'Learning to code, simplified.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
