export function Footer(){
    return <footer className="flex flex-col items-center w-[1440px]  gap-4 pt-8 mt-20 bg-[#1A1D1F]">
        <img src="/icons/footerLogo.svg" alt="Footer Logo"/>
        <div className="flex gap-8">
            <a href="/about" className="text-white text-[14px] hover:text-[#1C92E0] transition">Biz haqimizda</a>
            <a href="/cookie" className="text-white text-[14px] hover:text-[#1C92E0] transition">Cookie fayllari siyosati</a>
            <a href="/rules" className="text-white text-[14px] hover:text-[#1C92E0] transition">Foydalanish qoidalari</a>
            <a href="/cookie2" className="text-white text-[14px] hover:text-[#1C92E0] transition">Cookie fayllari siyosati</a>
        </div>
        <div className="flex gap-4">
            <a href="https://www.instagram.com/"><img src="/icons/instagram.svg" alt="instagram" className="w-5 h-5" /></a>
            <a href="https://web.telegram.org/"><img src="/icons/telegram.svg" alt="telegram" className="w-5 h-5" /></a>
            <a href="https://www.youtube.com/"><img src="/icons/youtube.svg" alt="youtube" className="w-5 h-5" /></a>
            <a href="https://www.twitter.com/"><img src="/icons/twitter.svg" alt="twitter" className="w-5 h-5" /></a>
            <a href="https://www.facebook.com/"> <img src="/icons/facebook.svg" alt="facebook" className="w-5 h-5" /></a>
        </div>
        <div className="w-full border-t border-white/10 mt-4 pt-4 pb-4">
            <div className="grid grid-cols-3 items-center px-6">
                <p className="text-white text-[16px] justify-self-start">
                    © UzChess. All rights reserved.
                </p>
                <img src="/icons/footer.svg" alt="footer" className="w-[33px] h-[18px] justify-self-center" />
                <a href="/rules" className="text-white text-[16px] justify-self-end">
                    Foydalanish qoidalari
                </a>
            </div>
        </div>
    </footer>
}