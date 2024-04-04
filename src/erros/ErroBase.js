class ErroBase extends Error { //A classe Error é nativa do javascript
  constructor(mensagem = "Erro interno de servidor", status = "500") {
    super();
    this.mensagem = mensagem;
    this.status = status;
  }

  enviarResposta(res) {
    res.status(this.status).send({
      mensagem: this.mensagem,
      status: this.status,
    });
  }
}

export default ErroBase;