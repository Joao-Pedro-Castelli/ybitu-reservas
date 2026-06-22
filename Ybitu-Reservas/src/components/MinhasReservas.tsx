import { useEffect, useState } from "react";
import ActiveTable from "./ActiveTable";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

export default function MinhasReservas() {
    const { logout, userEmail } = useAuth()
    const [booking,setBooking] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const bookingHandler = async () => {
            if (userEmail != "") {
                const response = await fetch(`http://localhost:3000/user/booking`,{credentials:"include"});
                const data = await response.json()
                setBooking(data.booking);
            }
            else {
                logout();
                navigate("/login");
            }

        }
        bookingHandler();
    },[]);

    return (
        <div className="flex flex-col items-center justify-center" >
            <div className="text-[var(--cor-primaria)] text-5xl font-bold mb-8">Reservas Ativas</div>
            <ActiveTable listaReserva={booking} />
        </div>
    );
};
