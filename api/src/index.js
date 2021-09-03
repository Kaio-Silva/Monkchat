import db from './db.js';
import express from 'express'
import cors from 'cors'
import crypto from 'crypto-js'

const app = express();
app.use(cors());
app.use(express.json());



app.post('/login', async (req, resp) =>{
    try{
        const login = req.body.login;
        const senha = req.body.senha;
        const cryptoSenha = crypto.SHA256(senha).toString(crypto.enc.Base64);

        let r = await db.tb_usuario.findOne(
            {
                where:{
                    ds_login: login,
                    ds_senha: cryptoSenha
                },
                raw: true
            })

        if(r == null)
            return resp.send({erro:'Credenciais invalidas!!'});

        delete r.ds_senha;    
        resp.send(r);
    } catch (e) {
        resp.send({ erro: "Erro post login!!" })
    }
});


app.post('/sala', async (req, resp) => {
    try {
        let salaParam = req.body;

        let s = await db.tb_sala.findOne({ where: { nm_sala: salaParam.nome } });
        if (s != null)
            return resp.send({ erro: 'Sala já existe!' });

        let r = await db.tb_sala.create({
            nm_sala: salaParam.nome,
            bt_ativo: salaParam.ativo
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Erro post sala!!'})
    }
})

app.get('/sala', async (req, resp) => {
    try {
        let salas = await db.tb_sala.findAll();
        resp.send(salas);
    } catch (e) {
        resp.send({ erro: 'Erro get sala!!'})
    }
})


app.post('/usuario', async (req, resp) => {
    try {
        let usuParam = req.body;

        let u = await db.tb_usuario.findOne({ where: { nm_usuario: usuParam.nome } });
        if (u != null)
            return resp.send({ erro: 'Usuário já existe!' });
        
        let r = await db.tb_usuario.create({
            nm_usuario: usuParam.nome,
            ds_login: usuParam.login,
            ds_senha: crypto.SHA256(usuParam.senha).toString(crypto.enc.Base64) 
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Erro post usuario!!'})
    }
})

app.get('/usuario', async (req, resp) => {
    try {
        let usuarios = await db.tb_usuario.findAll();
        resp.send(usuarios);
    } catch (e) {
        resp.send({ erro: 'Erro get usuario!!'})
    }
})

app.post('/chat', async (req, resp) => {
    try {
        let chat = req.body;

        let sala = await db.tb_sala.findOne({ where: { nm_sala: chat.sala.nome } });
        let usu = await db.tb_usuario.findOne({ where: { nm_usuario: chat.usuario.nome } })
    
        if (usu == null)
            return resp.send({ erro: 'Usuário não existe!' });
        
        if (sala == null)
            return resp.send({ erro: 'Sala não existe!' });
        
        if (!chat.mensagem || chat.mensagem.replace(/\n/g, '') == '')
            return resp.send({ erro: 'Mensagem é obrigatória!' });
        
        
        let mensagem = {
            id_sala: sala.id_sala,
            id_usuario: usu.id_usuario,
            ds_mensagem: chat.mensagem,
            dt_mensagem: new Date()
        }

        let r = await db.tb_chat.create(mensagem);
        resp.send(r);
        
    } catch (e) {
        resp.send('Erro post chat!!');
        console.log(e.toString());
    }
});


app.get('/chat/:sala', async (req, resp) => {
    try {
        let sala = await db.tb_sala.findOne({ where: { nm_sala: req.params.sala } });
        if (sala == null)
            return resp.send({ erro: 'Sala não existe!' });
        
        let mensagens = await
            db.tb_chat.findAll({
                where: {
                    id_sala: sala.id_sala
                },
                order: [['id_chat', 'desc']],
                include: ['tb_usuario', 'tb_sala'],
            });
    
        resp.send(mensagens);
    } catch (e) {
        resp.send({ erro: "Erro get chat!!"})
    }
})

app.put("/sala", async (req, resp) =>{
    try{
        let id = req.query.id;
        let nome = req.body.nome;
        let ativo = req.body.ativo;
    
        let r = await 
            db.tb_sala.update({
                nm_sala: nome,
                bt_ativa: ativo
            }, {
                where: { id_sala: id }
            })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: "Erro put sala!!" })
    }
  })

app.put("/user", async (req, resp) =>{
    try{
        let id = req.query.id;
        let nome = req.body.nome;
    
        let r = await 
            db.tb_usuario.update({
                nm_usuario: nome
            }, {
                where: { id_usuario: id }
            })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: "Erro put user!!" })
    }
 })
 
 app.delete("/user", async (req, resp) =>{
     try{
        let id = req.query.id;
    
        let r = await db.tb_usuario.destroy({ where: { id_usuario: id }})
        resp.sendStatus(200);
     } catch (e) {
         resp.send({ erro: "Erro delete user!!" })
     }
 })  

app.delete("/sala", async (req, resp) =>{
    try{
        let id = req.query.id_sala; 
    
        let r = await db.tb_sala.destroy({ where: { id_sala: id }})
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: "Erro delete sala!!" })
    }
  })

app.delete("/chat/:id", async (req, resp) => {
    try{
        let r = await db.tb_chat.destroy({ where: { id_chat: req.params.id }})
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: "Erro delete chat!!" })
    }
})  


app.listen(process.env.PORT,
           x => console.log(`>> Server up at port ${process.env.PORT}`))