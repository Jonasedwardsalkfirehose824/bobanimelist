import { createBrowserRouter } from "react-router";
import { routes } from "./routes";

// Use environment variable to determine basename
const BASE_NAME = import.meta.env.VITE_BASE_NAME || '/';

const router = createBrowserRouter(routes, {
    basename: BASE_NAME
});

export default router;


