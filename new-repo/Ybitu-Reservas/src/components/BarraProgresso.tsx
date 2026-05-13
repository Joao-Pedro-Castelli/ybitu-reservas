import type { JSX } from "react";

import "../styles/BarraProgresso.scss"

// if you change the number of steps, change etapa_position if statement
export default function BarraProgresso(prop: {step: 0 | 1 | 2 }) {
  type status = "done" | "on-going" | "not-yet"
  const steps_list: string[] = ["Data", "Quartos", "Pagamento"];
  
  const steps_divs: JSX.Element[] = steps_list.map((step_name, i) => {
    let etapa_status: status = "done";
    if (i == prop.step) {
      etapa_status = "on-going";
    }
    if (i > prop.step) {
      etapa_status = "not-yet";
    }

    let etapa_position: "first" | "middle" |  "last" = "middle";
    if (i == 0) {
      etapa_position = "first";
    }
    if (i == 2) {
      etapa_position = "last";
    }

    return (
      <div key={step_name} className={`etapa ${etapa_status} ${etapa_position}`} style={{zIndex: -i}}>
        <h2>{step_name}</h2>
      </div>)
  });

    
  return (
    <div className="reserva-header">
      <h1>Reserva em andamento</h1>
      <div id="progresso">
        <button id="etapas-prev" onClick={() => {window.location.href=steps_list[prop.step - 1]}}></button>

        <article id="barra" className="d-none d-lg-flex">
          {steps_divs}
        </article>

        <article id="mini" className="d-lg-none">
          <h2>{steps_list[prop.step]}</h2>
        </article>

        <button id="etapas-next" onClick={() => {window.location.href=steps_list[prop.step + 1]}}></button>
      </div>
    </div>
  )
}

