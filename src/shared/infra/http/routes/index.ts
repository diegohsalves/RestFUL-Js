import customersRouter from "@modules/Customers/infra/http/routes/customer.routes";
import ordersRouter from "@modules/Orders/infra/http/routes/orders.routes";
import productsRouter from "@modules/Products/infra/http/routes/products.routes";
import passwordRouter from "@modules/Users/infra/http/routes/password.routes";
import profileRouter from "@modules/Users/infra/http/routes/profile.routes";
import sessionsRouter from "@modules/Users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/Users/infra/http/routes/users.routes";

import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
