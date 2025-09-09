import Link from "next/link";
import { ReactNode } from "react";


export default function Layout({children} : {children : ReactNode}) {


    return (
        <>
        <h1>
            <Link href={'/chat/message'}>link</Link>
        </h1>
        {children}  
        </>
    )

}