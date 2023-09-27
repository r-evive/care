import { Connection } from 'mongoose';


declare global {
    var mongoose = {
        connection: any,
        promise: any
    }
}

export default {};