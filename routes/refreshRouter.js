import express from "express";

import {refresh} from "../controllers/refreshController.js"

const Router = express.Router();

Router.get('/',refresh);



export {Router};