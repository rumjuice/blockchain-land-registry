import { ReactElement } from "react";
import { Navigate, Route, RouteObject, Routes } from "react-router-dom";
import AssetRoutes from "./modules/Asset/Route";

function App(): ReactElement {
  const routes: RouteObject[] = [...AssetRoutes];

  return (
    <div className="flex flex-col items-center h-screen w-screen overflow-auto bg-slate-50 pb-4">
      <header className="w-full text-center py-4 text-2xl italic font-bold text-rose-900 border-b-rose-900 border-b-2">
        Blockchain Land Registration System
      </header>
      <section className="flex flex-col items-center lg:w-3/5 md:w-3/4 w-full">
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
