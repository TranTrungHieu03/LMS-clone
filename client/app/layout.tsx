"use client"
import {Nunito} from "next/font/google"
import "./globals.css";
import {FC, ReactNode} from "react";
import {ThemeProvider} from "@/app/utils/theme-provider";
import {Toaster} from "react-hot-toast";
import {Providers} from "@/app/Provider";
import {SessionProvider} from "next-auth/react";
import {useLoadUserQuery} from "@/redux/features/api/apiSlice";
import Loader from "@/app/components/Loader/Loader";

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
        <Providers>
            <SessionProvider>
                <ThemeProvider attribute={"class"} defaultTheme={"system"}
                               enableSystem={true}>
                    <Custom>
                        {children}
                    </Custom>
                    <Toaster position={"top-center"} reverseOrder={false}/>
                </ThemeProvider>
            </SessionProvider>
        </Providers>
        </body>
        </html>
    );
}

const Custom: FC<{ children: ReactNode }> = ({children}) => {
    const {isLoading} = useLoadUserQuery({})
    return (
        <>
            {
                isLoading ? <Loader/> : <>{children}</>
            }
        </>
    )
}
