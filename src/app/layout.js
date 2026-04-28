import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "RAJASTHAN GLORIOUS PRAYER MISSION (RGPM)",
  icons: { icon: "/images/samicon.jpg.png" },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet"/>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alkalami&display=swap" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
