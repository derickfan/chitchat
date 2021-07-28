import { Column, CreatedAt, Table } from "sequelize-typescript";
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "sequelize";
import { UUIDV4 } from "sequelize";

interface UserAttributes {
  id: string,
  username: string,
  email: string,
  password: string,
  profilePhotoUrl: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    email!: string;
    password!: string;
    id!: string;
    username!: string;
    profilePhotoUrl!: string;
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePhotoUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: "User"
  });
  return User;
}