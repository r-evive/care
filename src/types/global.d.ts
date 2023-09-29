import { UserType } from '@/models/Users';
import { Connection } from 'mongoose';
import { User } from 'next-auth';


declare global {
    var mongoose = {
        connection: any,
        promise: any
    }
}

export default {};