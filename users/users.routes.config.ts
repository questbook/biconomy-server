import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';

function getAddressFromTransaction(transaction: any){

}

function getUsernameFromOauth(ouath: any, provider: any){

}

function subsidize(req: express.Request, res: express.Response) {
    const address = getAddressFromTransaction(req.body.transaction);
    const username = getUsernameFromOauth(req.body.data.oauth, req.body.data.provider);
    // if (isValid(address) && isValid(username)) {
    //     return res.send(200)
    // }
    // return res.send(403)
}

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }
    configureRoutes(): express.Application {

        this.app.route("/check")
            .post((req: express.Request, res: express.Response) => {
                subsidize(req, res);
            })

        return this.app;
    }
}