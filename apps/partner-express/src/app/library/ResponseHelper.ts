import { Response } from "express";

const setResponseServerError = (res: Response, error: any):Response => {
    return res.status(500).json(error);
}

const setResponseSuccess = (res: Response, result: any):Response => {
    return res.status(200).json(result);
}

const setResponseNoFound = (res: Response, message: any):Response => {
   return res.status(404).json(message);
}

export default {
    setResponseServerError,
    setResponseSuccess,
    setResponseNoFound
}