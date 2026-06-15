import ActiveTable from "./ActiveTable";

export default function MinhasReservas() {
    return (
        <div className="flex flex-col items-center justify-center" >
            <div className="text-[var(--cor-primaria)] text-5xl font-bold mb-8">Reservas Ativas</div>
            <ActiveTable listaReserva={[]} />
        </div>
    );
};
