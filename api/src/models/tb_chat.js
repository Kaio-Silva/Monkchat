import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tb_chat extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_chat: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_sala: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ds_mensagem: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dt_mensagem: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_chat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_chat" },
        ]
      },
      {
        name: "id_sala",
        using: "BTREE",
        fields: [
          { name: "id_sala" },
        ]
      },
      {
        name: "id_usuario",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
  return tb_chat;
  }
}
