import productsRouter from "@modules/Products/routes/products.routes";
import sessionsRouter from "@modules/Users/routes/sessions.routes";
import usersRouter from "@modules/Users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
