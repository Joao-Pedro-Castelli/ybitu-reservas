import { createContext, useContext, useState, ReactNode } from "react"

type AuthContextType = {
    isLoggedIn: boolean
    userEmail: string
    login: (email:string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem("loggedIn") === "true"
    )
    const [userEmail,setUserEmail] = useState(()=>{ return ""});

    function login(email:string) {
        localStorage.setItem("loggedIn", "true")
        setUserEmail(email)
        setIsLoggedIn(true)
    }

    function logout() {
        localStorage.removeItem("loggedIn")
        setIsLoggedIn(false)
        setUserEmail("")
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userEmail }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider")
    return ctx
}