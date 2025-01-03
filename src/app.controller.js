
 import userController from'./modules/user/user.controller.js';
import authController from './modules/auth/auth.controller.js';
import messageController from './modules/messages/messages.controller.js';
import { connectDB } from './DB/connection.js';
import { globalErrorHandling } from './utils/error/error.handling.js';
import cors from "cors";



const bootstrap = (app, express) => {
  app.use(cors());
  // DB CONNECTION
  connectDB();
//--------------------
  //_____________middle ware___________________
  app.use(express.json());//convert buffer json data
  //___________app routing_____________________
  app.get("/", (req, res, next) => res.status(200).json({ message: "Hello in my New Folder Structure express ES6" }));
  //_____________sup express routing____________
  app.use("/auth", authController);
  app.use('/users', userController);
  app.use("/message", messageController);
  //____________global error handling middleware_________________
  app.use(globalErrorHandling);
  //______________________________________________
  app.all("*", (req, res, next) => {
    return res.status(404).json({ message: "page not found" });
  });
  //________________________________________________
};

export default bootstrap




