import ThemeRegistry from "@/theme/ThemeRegistry";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body suppressHydrationWarning={true}>
          {children}
          <ToastContainer />
        </body>
      </ThemeRegistry>
    </html>
  );
}
