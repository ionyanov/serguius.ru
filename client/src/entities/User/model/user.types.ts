export interface IChangePassword {
    email: string;
    newPassword: string;
    oldPassword: string;
}

export interface IUser {
    id: number;
    email: string;
}


export interface IAdminUser extends IUser {
    created: Date;
    updated: Date;
    password: string;
    lockcount: number;
    lockflg: boolean;
    lastlogin: Date;
}


export interface IUserSchema {
    authData?: IUser;
    isInit: boolean;
}
