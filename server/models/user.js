require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Creates table users
   */
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    isInfluencer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    credit: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    photo: {
      type: DataTypes.STRING,
    },
    preference: {
      type: DataTypes.STRING,
    },
    allergy: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      /**
       * Before creating a user in the table, encrypts the password and generates a jwt
       */
      beforeCreate: async(user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
      }
    }
  });

  /**
   * Connects table users with table histories
   */
  User.associate = (models) => {
    User.hasMany(models.History, {
      foreignKey: 'userId',
      as: 'histories',
    });
  };
  return User;
};