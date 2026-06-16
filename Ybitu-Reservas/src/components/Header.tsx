import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'
import seta from '../assets/seta_carrinho.svg'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { isLoggedIn, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate("/")
        setMenuOpen(false)
    }

    const animatedLink = "relative hover:cursor-pointer after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-green-800 after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 whitespace-nowrap"

    const publicLinks = [
        { to: "/", label: "Home" },
        { to: "/Pousada", label: "Pousada" },
        { to: "/Passeios", label: "Passeios" },
        { to: "/Contato", label: "Contato" },
    ];

    const authLinks = isLoggedIn
        ? [{ to: "/Perfil", label: "Perfil" }]
        : [{ to: "/Login", label: "Login" }, { to: "/Cadastro", label: "Cadastro" }]

    const allLinks = [...publicLinks, ...authLinks]

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 lg:px-8 py-4 bg-[var(--cor-background)] shadow-sm">

            <div className="shrink-0">
                <img src={logo} alt="Logo da Pousada Ybitu" />
            </div>

            {/* Nav Desktop */}
            <nav className="hidden lg:flex flex-1 justify-center gap-8 xl:gap-12 text-sm xl:text-md font-semibold px-4">
                {allLinks.map(({ to, label }) => (
                    <Link key={to} to={to} className={animatedLink}>
                        {label}
                    </Link>
                ))}
                {isLoggedIn && (
                    <button onClick={handleLogout} className={animatedLink + " text-red-600 after:bg-red-600"}>
                        Sair
                    </button>
                )}
            </nav>

            {/* Botão Carrinho Desktop */}
            <button className="hidden lg:flex shrink-0 flex-row items-center gap-3 hover:cursor-pointer bg-green-800 text-white font-bold py-3 px-5 xl:px-7 rounded-lg relative overflow-hidden group transition-colors duration-300 hover:bg-green-700">
                <div className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-[200%] transition-transform duration-500 ease-out z-0" />
                <span className="bg-amber-300 w-8 h-8 rounded-sm z-10 shrink-0 flex items-center justify-center">
                    <img src={seta} alt="Ícone do carrinho" className="w-5 h-5" />
                </span>
                <span className="relative z-10 text-sm xl:text-base whitespace-nowrap">VER CARRINHO</span>
            </button>

            {/* Botão Hamburguer */}
            <button
                className="lg:hidden text-black z-50 relative p-1"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Menu Mobile */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 w-full bg-black/90 flex flex-col items-start gap-5 px-6 py-6 lg:hidden z-50"
                    >
                        <button className="flex items-center gap-4 w-full bg-green-800 text-white font-bold py-3 px-5 rounded-lg mb-2">
                            <span className="bg-amber-300 w-8 h-8 rounded-sm shrink-0 flex items-center justify-center">
                                <img src={seta} alt="Ícone do carrinho" className="w-5 h-5" />
                            </span>
                            <span>VER CARRINHO</span>
                        </button>

                        {allLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="text-red-400 text-lg font-medium hover:text-red-300 transition-colors"
                            >
                                Sair
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}