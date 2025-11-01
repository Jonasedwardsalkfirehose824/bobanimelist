import { createBrowserRouter } from "react-router";
import { routes } from "./routes";

const BASE_PATH = '/bobanimelist/';

const router = createBrowserRouter(routes, {
    basename: BASE_PATH
});

export default router;


