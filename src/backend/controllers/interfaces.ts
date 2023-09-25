import { Model } from 'sequelize';

export interface UserAttributes {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes { }

export interface UserRepoTokensAttributes {
    token: string;
    email: string;
}

export interface UserRepoTokensModel extends Model<UserRepoTokensAttributes>, UserRepoTokensAttributes { }