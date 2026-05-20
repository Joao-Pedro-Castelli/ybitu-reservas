// project components
import BarraProgresso from "../components/BarraProgresso";
import { type ResumoData, type stateOp } from "../types.ts";
// external libraries
import React, { useEffect, useRef, useState } from "react";
import { Pencil, Trash } from "lucide-react";

// imrt styles
import "../styles/Pagamento.scss";

// a popup that opens when modalState is true and locks the webpage
function PopUp(props: { modalState: boolean, children?: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.modalState == true) {
      modalRef.current?.showModal();
      return;
    }
    modalRef.current?.close();
  });
  
  return(
    <>
      <dialog ref={modalRef} className="popup">
        {props.children}
      </dialog>
    </>
  )
}

// delFn (delete function) actually just opens the popup to confirm that this item will be deleted
function ReservaResumo(props: { data: ResumoData, delFn: stateOp<{open: boolean, id: string}> }) {

  const reservaList = props.data.items.map(
    (item, i) => {
      const key = props.data.key + "-it" + i.toString();
      return (
        <li key={key}>{item}</li>
      );
    }
  );
   
  return (
    <div className="opcao-reserva">
      <div className="reserva-titulo">
        <h3>{props.data.title}</h3>
        <div className="flex gap-1">
          <Pencil className="mouse-reaction" />
          <Trash className="mouse-reaction" onClick={() => props.delFn({open: true, id: props.data.key})} />
        </div>
      </div>

      <div className="flex flex-col items-left">
        <p className="reserva-data">Data: {props.data.date_in} &#x2192; {props.data.date_out}</p>
        <p>Items:</p>
        <ul className="reserva-quarto">
          {reservaList}
        </ul>
      </div>
    </div>
  )
}

// the data of the reservas. when implemented, we will take them from the other pages
const resumoInitial: ResumoData[] = [
  {
    key: "aaaa-id1",
    title: "Grupo 1",
    date_in: "26/08/2026",
    date_out: "29/08/2026",
    items: ["1 quarto casal", "1 quarto quádruplo"]
  },
  {
    key: "resumo-id2",
    title: "Grupo 2",
    date_in: "26/09/2026",
    date_out: "29/09/2026",
    items: ["1 quarto triplo"]
  }
];

export default function Pagamento() {
  // state for the list of reservas
  const [resumoList, setResumoList] = useState(resumoInitial);
  // whether the popup for confirmation of deletion should be open
  // and what item called it
  const [popConfirm, setPopConfirm] = useState({ open: false, id: ""});

  // when the user clicks the trash button, remove the element from the list
  const deleteResumo = (isDel: boolean) => {
    if (isDel) {
      setResumoList(resumoList.filter((resumo) => resumo.key != popConfirm.id));
    }
    setPopConfirm({open: false, id: ""});
  };

  return (
  <>  
    <BarraProgresso step={2} />

    <main>
      <section>
        <h2>Como concluir a reserva</h2>
        <p>
          Ao lado, é possível ver a quantidade e as opções de quarto adicionados ao carrinho. Foram realizadas
          2 reservas, totalizando 6 quartos.
        </p>
        <p>
          Caso deseje editar suas escolhas, clique no ícone do
          lápis para voltar à primeira etapa. Caso deseje excluir
          alguma reserva, clique no ícone de lixeira.
        </p>
        <p>
          Para concluir a sua reserva, clique no botão "Concluir
          reserva", que irá direcioná-lo para um de nossos
          atendentes no WhatsApp.
        </p>
        <p>Caso queira adicionar mais quartos clique no botão abaixo:</p>

        <a href="Quartos" id="maisquartos" className="mouse-reaction">Adicionar mais quartos</a>
      </section>

      <aside>
        <div className="mt-6 lg:mt-8">
          <img className="w-[88px] lg:w-[96px]" src="src/assets/pagamento/carrinho.png" alt="Desenho de um carrinho de supermercado" />
        </div>
        <div>
          <h2>MEU CARRINHO</h2>
        </div>
        <div id="pagamento-lista">
          {resumoList.map((resumo) =>
            <ReservaResumo key={resumo.key} data={resumo} delFn={setPopConfirm}/>)
          }
        </div>
        <a id="pagamento-botao" className="mouse-reaction" href="/feedback">CONCLUIR RESERVA</a>
      </aside>

      <PopUp modalState={popConfirm.open}>
        <div className="pop-confirm">
          <h2>Você realmente deseja deletar esta reserva?</h2>
          <button className="mouse-reaction" onClick={() => deleteResumo(true)}>Deletar</button>
          <button className="mouse-reaction" onClick={() => deleteResumo(false)}>Não deletar</button>
        </div>
      </PopUp>
    </main>
  </ >
  );
}
