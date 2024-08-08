import express from "express";
import {register,login,logout} from "../controllers/usersController.js";

const Router = express.Router();

Router.post('/register',register);

Router.post('/login',login);

Router.get('/logout',logout);

export {Router};
