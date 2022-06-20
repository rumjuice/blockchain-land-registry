import { ReactElement } from "react";
import ReactModal from "react-modal";
import List from "./modules/Asset/views/List";

function App(): ReactElement {
  ReactModal.setAppElement("#root");

  return (
    <div className="flex flex-col items-center h-screen w-screen overflow-auto bg-slate-50 pb-4">
      <header className="w-full text-center py-4 text-2xl font-bold text-emerald-900 border-b-emerald-900 border-b-2">
        Blockchain Land Registration System
      </header>
      <section className="flex flex-col items-center lg:w-3/5 md:w-3/4 w-full h-full">
        <List />
      </section>
    </div>
  );
}

export default App;
