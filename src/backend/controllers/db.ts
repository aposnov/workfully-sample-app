import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv'; 

dotenv.config();

//DB CONNECTION

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.POSTGRES_DB || 'workfullydev',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '31337bcn',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: 5432,
  logging: false
});

// USER

export interface UserAttributes {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export const User = sequelize.define<UserModel, UserAttributes>('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// USER TOKENS

export interface UserRepoTokensAttributes {
  token: string;
  email: string;
}

export interface UserRepoTokensModel extends Model<UserRepoTokensAttributes>, UserRepoTokensAttributes {}

export const UserRepoTokens = sequelize.define<UserRepoTokensModel, UserRepoTokensAttributes>('UserRepoTokens', {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
  });

UserRepoTokens.belongsTo(User, { foreignKey: 'email', targetKey: 'email' });