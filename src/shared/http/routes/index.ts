import customersRouter from "@modules/Customers/routes/customer.routes";
import ordersRouter from "@modules/Orders/routes/orders.routes";
import productsRouter from "@modules/Products/routes/products.routes";
import passwordRouter from "@modules/Users/routes/password.routes";
import profileRouter from "@modules/Users/routes/profile.routes";
import sessionsRouter from "@modules/Users/routes/sessions.routes";
import usersRouter from "@modules/Users/routes/users.routes";

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
