import "../styles/Feedback.css";
import Footer from "../components/Footer.tsx"

export default function Feedback() {
    return (

        <>

            <div className="container ">
                <div className="flex items-center justify-center mt-4 "><img src="src/assets/logo.png" alt="Logo" height="67" width="75" /></div>
                <div className="mt-12 lg:mt-16 text-5xl flex items-center justify-center">Feedback</div>
                <div className="mt-6 lg:mt-12 lg:flex">
                    <div className="p-8 lg:max-w-1/2">
                        <p className="xl:text-lg">Conte para nós como foi passar esse tempo conosco! Seu comentário é muito importante para que possamos
                            aprimorar ainda mais nossos serviços!
                        </p>
                        <p className="xl:text-lg">Agradecemos pela confiança durante sua estadia, volte sempre!!</p>
                    </div>
                    <div className="bg-[#D9D9D9] p-8 rounded-md">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="">Nome:</label>
                                <input type="text" id="" className="bg-[#F5F0E6] py-3 px-3 border rounded" placeholder="Insira seu nome" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email">E-mail:</label>
                                <input type="email" id="email" className="bg-[#F5F0E6] py-3 px-3 border rounded" placeholder="Insira seu e-mail" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="comentario">Comentário:</label>
                                <textarea className="resize-y py-3 px-3 rounded bg-[#F5F0E6] min-h-[150px] xl:min-h-[200px] 2xl:min-h-[250px]" name="" id="comentario" placeholder="Deixe aqui sua mensagem..."></textarea>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="comentario">Adicione arquivos:</label>
                                <input className="border bg-gray-200 rounded file:border file:border-black file:bg-white file:font-bold file:py-1 file:px-2 file:rounded" type="file" accept="image/*" multiple />
                            </div>


                            <button className="bg-[#1F6F50] text-white p-3 rounded md:col-span-2">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </>


    );
}