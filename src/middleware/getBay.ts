import { Request, Response, NextFunction } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { send500 } from '../helpers/responses';

export const getBay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	axios.get(`${config.base}/locations/${req.params.site}/aisles/${req.params.aisle}/bays/${req.params.bay}`).then((response: AxiosResponse) => {
		res.locals.bay = response.data.data;
		next();
	}).catch((error: Error & { response: { status: number } }) => {
		if (error.response.status === 404 || error.response.status === 400) res.sendStatus(404);
		else send500(res, error);
	});
};