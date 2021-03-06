'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "title is required"
        },
        notNull: {
          msg: "title is required"
        }
      },
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "description is required"
        },
        notNull: {
          msg: "description is required"
        }
      },
      allowNull: false
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
    Course.belongsTo(models.User, {
      as: "user",
      foreignKey: {
        fieldName: "userId",
        allowNull: false
      }
    })
  };
  return Course;
};