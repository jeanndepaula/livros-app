import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import "./styles.css";

export default class Livro extends Component{
    
  state = {
    livro: {},
  };

  async componentDidMount(){
      
    const { id } = this.props.match.params;

    const response = await api.get(`/livros/${id}`);

    this.setState({ livro: response.data });

  }
  
  render(){

    const { livro } = this.state;

    return (
      <div className="livro-info">
        <h1>{livro.titulo}</h1>
        <p>Autor: {livro.autor}</p>
        <p>Editora: {livro.editora}</p>
        <p>Ano: {livro.ano}</p>
        <p>Idioma: {livro.idioma}</p>
        <p>Dimensões: {livro.dimensoes}</p>
        <p>Peso: {livro.peso}</p>
        <p>ISBN: {livro.isbn}</p>
        <Link className="btn btn-secondary" to={'/'}>Voltar</Link>
      </div>
    );
  }
}