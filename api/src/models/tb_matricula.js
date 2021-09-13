import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tb_matricula extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_matricula: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nm_aluno: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    nr_chamada: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nm_curso: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    nm_turma: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_matricula',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_matricula" },
        ]
      },
    ]
  });
  return tb_matricula;
  }
}
