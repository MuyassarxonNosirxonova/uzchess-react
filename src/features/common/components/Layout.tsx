import type {ReactNode} from "react";
import {Header} from "./Header/Header.tsx";
import {Footer} from "./Footer/Footer.tsx";


export function Layout({children}: {children: ReactNode}){
  return <div className="flex flex-col bg-[#0F1113]">
    <Header />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
}