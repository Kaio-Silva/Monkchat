import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tb_chat from  "./tb_chat.js";
import _tb_matricula from  "./tb_matricula.js";
import _tb_produto from  "./tb_produto.js";
import _tb_sala from  "./tb_sala.js";
import _tb_usuario from  "./tb_usuario.js";

export default function initModels(sequelize) {
  var tb_chat = _tb_chat.init(sequelize, DataTypes);
  var tb_matricula = _tb_matricula.init(sequelize, DataTypes);
  var tb_produto = _tb_produto.init(sequelize, DataTypes);
  var tb_sala = _tb_sala.init(sequelize, DataTypes);
  var tb_usuario = _tb_usuario.init(sequelize, DataTypes);


  return {
    tb_chat,
    tb_matricula,
    tb_produto,
    tb_sala,
    tb_usuario,
  };
}
