import { UserCircle2 } from "lucide-react";
export default function Profile() {
    return (
        <>
            <div className="" >
                <div className="flex justify-between items-center lg:justify-center lg:gap-80 xl:gap-100">
                    <div className="flex items-center justify-center ">
                        <UserCircle2 size={60}></UserCircle2>
                        <div className="ml-3 ">
                            <div className="text-xl">Donatello da Silva</div>
                            <div className="text-[12px]">donatellodasilva@gmail.com</div>
                        </div>

                    </div>
                    <button className="p-2 w-fit h-fit rounded bg-red-500 font-bold text-[var(--cor-background)] ">Apagar conta</button>
                </div>
            </div>
            <form className="grid grid-cols-2 max-w-fit gap-10  mx-auto" action="">
                <div className="user_form_div">
                    <label htmlFor="nome">Nome:</label>
                    <input className="user_form_option" type="text" id="nome" value={123456} />
                </div>
                <div className="user_form_div">
                    <label htmlFor="email">E-mail:</label>
                    <input className="user_form_option" type="email" id="email" value={123456} />
                </div>
                <div className="user_form_div">
                    <label htmlFor="senha">Senha:</label>
                    <input className="user_form_option" type="password" id="senha" value={123456} />
                </div>
            </form>

            <div className="mt-10 flex items-center justify-center">
                <button className=" p-2 btn_primary">Alterar Dados</button>

            </div>
        </>
    );
};
