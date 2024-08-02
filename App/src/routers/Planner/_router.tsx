import Index from "./Index/_index";
import { loader as indexLoader } from "./Index/_loader";
import NewPlanner from "./New/_index";
import { loader as newLoader } from "./New/_loader";

const PlannerRouter = {
  path: "planner",
  children: [
    {
      path: "",
      element: <Index />,
      loader: indexLoader,
    },
    {
      path: "new",
      element: <NewPlanner />,
      loader: newLoader,
    },
  ],
};
export default PlannerRouter;
