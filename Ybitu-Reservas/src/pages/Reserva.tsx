import BarraProgresso from "../components/BarraProgresso.tsx";
import { Outlet, useLocation } from "react-router";

export default function ReservaRoutePage() {
  let location = useLocation();

  let curStep = location.pathname.split("/").at(2);
  if (curStep == undefined) {
    console.log(curStep);
    curStep = "Data";
  }

  curStep = decodeURIComponent(curStep);
  
  return(
    <>
      <BarraProgresso step={curStep} />
      <Outlet />
    </>
  );
};
