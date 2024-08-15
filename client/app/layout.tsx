import type {Metadata} from "next";
import {Nunito} from "next/font/google"
import "./globals.css";
import {ReactNode} from "react";
import {ThemeProvider} from "@/app/utils/theme-provider";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-Nunito"
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${nunito.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <ThemeProvider attribute={"class"} defaultTheme={"system"}
                       enableSystem={true}>{children}</ThemeProvider></body>
        </html>
    );
}
