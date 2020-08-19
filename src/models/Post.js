const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(connection) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.STRING,
        readTime: DataTypes.STRING,
        article: DataTypes.STRING,
      },
      {
        sequelize: connection,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
    });
  }
}

module.exports = Post;
