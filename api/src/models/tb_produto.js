import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tb_produto extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_produto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nm_produto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ds_categoria: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vl_preco_de: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    vl_preco_por: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    vl_avaliacao: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ds_produto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    qtd_estoque: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    img_produto: {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    bt_ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dt_inclusao: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_produto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_produto" },
        ]
      },
    ]
  });
  return tb_produto;
  }
}
