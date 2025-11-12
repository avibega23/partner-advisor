import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Provider";
import { ThemeProvider } from "next-themes";

const monserat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={` ${monserat.className} font-display antialiased`}
      >
        <Providers>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
