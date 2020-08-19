const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init(
      {
        avatar: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        firstSocialMediaUrl: DataTypes.STRING,
        secondSocialMediaUrl: DataTypes.STRING,
        thirdSocialMediaUrl: DataTypes.STRING,
      },
      {
        sequelize: connection,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
    });
  }
}
module.exports = User;
