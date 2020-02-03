import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css'; 

export default class Main extends Component {
  state = {
    livros: [],
    livroInfo: {},
    page: 1,
    param: '',
    yearStart: 1900,
    yearEnd: new Date().getFullYear(),
  }

  handleChange(event) {
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  search = () => {
    const { param, yearStart, yearEnd } = this.state;
    this.loadLivros(1, param, yearStart, yearEnd);
  }

  componentDidMount() {
   this.loadLivros();
  }

  loadLivros = async (page = 1, param = '', yearStart = '', yearEnd = '') => {
    const response = await api.get(`/livros`, { params: { page, param, yearStart, yearEnd }});
    const { docs, ...livroInfo } = response.data;
    this.setState({ livros: docs, livroInfo, page });
  };

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;
    const pageNumber = page - 1;
    this.loadLivros(pageNumber);
  }

  nextPage = () => {
    const { page, livroInfo } = this.state;
    if (page === livroInfo.pages) return;
    const pageNumber = page + 1;
    this.loadLivros(pageNumber);
  }

  gotoPage = number => {
    const { page } = this.state;
    if (page === number) return;
    this.loadLivros(number);
  }

  filterList = params => {
    return null;
  }

  render() {

    const { livros, page, livroInfo } = this.state;
    let lista, renderPageNumbers;

    if (livros !== null) {
      lista = livros.map(livro => (
        <tr key={livro._id}>
          <td>{livro.titulo}</td>
          <td>{livro.autor}</td>
          <td>{livro.editora}</td>
          <td>{livro.ano}</td>
          <td><Link to={`/livros/${livro._id}`}>Detalhes</Link></td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (livroInfo.pages !== null) {
      for (let i = 1; i <= livroInfo.pages; i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        return (
          <span key={number} onClick={() => this.gotoPage(number)}>{number}</span>
        );
      });
    }

    return ( 
      <div className ="livro-list">
        
        <div className="row border-bottom">
          <div className="col-2">
            <h1 className="display-5 text-center">SUPERO</h1>
          </div>
          <fieldset className="col-8">
            <input type="text" className="form-control form-control-lg" placeholder="Busque livros pelo autor, título ou ISBN" name="param" value={this.state.param} onChange={this.handleChange.bind(this)}/>
          </fieldset>
          <div className="col-2">
            <button className="btn btn-secondary btn-lg btn-block" onClick={this.search}>BUSCAR</button>
          </div>
        </div>

        <div className="row border-bottom my-1">
          <div class="form-group row col-12">
            <label class="col-sm-2 col-form-label">Filtrar ano de publicação</label>
            <div class="col-2">
              <input className="form-control" type="number" min="1900" max={this.state.yearEnd} value={this.state.yearStart} name="yearStart"  onChange={this.handleChange.bind(this)}/>
            </div>
            <label class="col-form-label">até</label>
            <div class="col-2">
              <input className="form-control" type="number" min="1900" max={this.state.yearEnd} value={this.state.yearEnd} name="yearEnd" onChange={this.handleChange.bind(this)}/>
            </div>
            <label class="col align-self-end col-form-label float-right text-right">{this.state.livroInfo.total} registros encontrados</label>
          </div>
        </div>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Livro</th> 
              <th>Autor</th>
              <th>Editora</th>
              <th>Ano</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista}
          </tbody>
        </table>

        <div className="pagination">
          <span disabled={page === 1} onClick={this.prevPage}>&laquo;</span>
          {renderPageNumbers}
          <span disabled={page === livroInfo.pages} onClick={this.nextPage}>&raquo;</span>
        </div>

      </div>
    )
  }
}