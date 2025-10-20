'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Worker.init({
    Fullname: {
  type: DataTypes.STRING,
  allowNull: false
},

    Email: DataTypes.STRING,
    Residence: DataTypes.STRING,
    MaritalStatus: DataTypes.ENUM('married','single','divorced'),
    MonthlySalary: DataTypes.STRING,
    Age: DataTypes.STRING,
    YearsInResidence: DataTypes.STRING,
    Position: DataTypes.STRING,
    ContactInformation: DataTypes.STRING,
    workerId: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
    paymentMethod: DataTypes.STRING,
    paymentAmount: DataTypes.STRING,
    paymentNotes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Worker',
  });
  return Worker;
};