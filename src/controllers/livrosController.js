import { livros } from "../models/Index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if(livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else { 
        next(new NaoEncontrado("Erro ao localizar Livro"));
      }

      
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res,next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const atualizaLivro = await livros.findByIdAndUpdate(id, {$set: req.body});

      if(atualizaLivro !== null ) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Erro ao localizar livro"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const excluirLivro = await livros.findByIdAndDelete(id);

      if(excluirLivro !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Erro ao Localizar Livro"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      
      const busca = processaBusca(req.query);

      const livrosResultado = await livros.find(busca);

      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };
}


function processaBusca(parametros) {
  const {editora, titulo, minPaginas, maxPaginas} = parametros;

  const busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = {$regex: titulo, $options: "i"}; // Retorno da busca não precisa ser o nome do livro completo, $Options i é o parametro para não diferenciar letras minusculas de maisculas
  if(minPaginas || maxPaginas) busca.numeroPaginas = {};

  //gte = Maior ou igual que
  if(minPaginas) busca.numeroPaginas.$gte(minPaginas);
  // lte = Menor ou igual que
  if(maxPaginas) busca.numeroPaginas.$lte(maxPaginas);

  return busca;
}

export default LivroController;