import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import ResponseHelper from "../library/ResponseHelper";

const login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (email == 'test@demo.com' && password == "12345") {
        return ResponseHelper.setResponseSuccess(res, { token: "12335568786" });
    } else {
        return ResponseHelper.setResponseServerError(res, { error: "login failed" });
    }
}

export default {
    login
}