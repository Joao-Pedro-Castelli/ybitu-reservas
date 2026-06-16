import { createContext, useContext, useState, ReactNode } from "react"

type AuthContextType = {
    isLoggedIn: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem("loggedIn") === "true"
    )

    function login() {
        localStorage.setItem("loggedIn", "true")
        setIsLoggedIn(true)
    }

    function logout() {
        localStorage.removeItem("loggedIn")
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider")
    return ctx
}