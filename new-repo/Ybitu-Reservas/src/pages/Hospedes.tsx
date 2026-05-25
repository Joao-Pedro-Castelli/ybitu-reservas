import BarraProgresso from "../components/BarraProgresso";

import "../styles/Hospedes.scss";

export default function Hospedes() {
  return (
    <>
      <BarraProgresso step={2} />

      <h1>Preencha os dados dos hóspedes:</h1>
      <div id="hospede-div">
        <main className="hospede-dados">
          <h2>Responsável</h2>
          <div className="hospede-input">
            <p>Nome</p>
            <input type="text"/>
          </div>
        </main>
      </div>
    </>
  )
}
