import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: [true, "O título do livro é obrigatório"]},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O nome do autor é obrigatório."]},
    editora: {
      type: String, required: [true, "A editora do livro é obrigatória."],
      enum: 
      {values:["Classicos", "Alura"],
        message: "A editora {VALUE} não é um valor permitido."
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator(valor) {
          return valor >= 5 && valor <= 5000;
        },

        message: "O Valor não está entre 5 e 5000. Valor Fornecido {VALUE} "
      }
    }
  }
);

const livros= mongoose.model("livros", livroSchema);

export default livros;