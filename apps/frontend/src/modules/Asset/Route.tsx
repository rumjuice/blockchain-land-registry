import { RouteObject } from "react-router-dom";
import List from "./views";

const TransactionRoutes: RouteObject[] = [
  {
    path: "/",
    element: <List />,
  },
];
export default TransactionRoutes;
