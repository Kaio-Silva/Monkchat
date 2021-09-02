import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tb_chat from  "./tb_chat.js";
import _tb_ponto_extra from  "./tb_ponto_extra.js";
import _tb_ponto_extra_tarde from  "./tb_ponto_extra_tarde.js";
import _tb_sala from  "./tb_sala.js";
import _tb_usuario from  "./tb_usuario.js";

export default function initModels(sequelize) {
  var tb_chat = _tb_chat.init(sequelize, DataTypes);
  var tb_ponto_extra = _tb_ponto_extra.init(sequelize, DataTypes);
  var tb_ponto_extra_tarde = _tb_ponto_extra_tarde.init(sequelize, DataTypes);
  var tb_sala = _tb_sala.init(sequelize, DataTypes);
  var tb_usuario = _tb_usuario.init(sequelize, DataTypes);

  tb_chat.belongsTo(tb_sala, { as: "tb_sala", foreignKey: "id_sala"});
  tb_sala.hasMany(tb_chat, { as: "tb_chats", foreignKey: "id_sala"});
  tb_chat.belongsTo(tb_usuario, { as: "tb_usuario", foreignKey: "id_usuario"});
  tb_usuario.hasMany(tb_chat, { as: "tb_chats", foreignKey: "id_usuario"});

  return {
    tb_chat,
    tb_ponto_extra,
    tb_ponto_extra_tarde,
    tb_sala,
    tb_usuario,
  };
}
