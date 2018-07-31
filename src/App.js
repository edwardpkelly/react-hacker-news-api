import React, { Component } from 'react';
import Search from './Search/Search';
import Table from './Table/Table';
import Button from './Button/Button';

import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = 100;
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {

  state = {
    results: null,
    searchKey: '',
    searchTerm: DEFAULT_QUERY
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    console.log(url);
    fetch(url)
      .then(response => response.json()
        .then(result => this.setSearchTopStories(result))
        .catch(error => error)
      );
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    //const oldHits = page !== 0 ? this.state.result.hits : [];
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [ ...oldHits, ...hits ];

    //this.setState({ result: { hits: updatedHits, page } });
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits:updatedHits, page }
      }
    });
  }

  onDismiss = (itemID) => {
    const filteredList = this.state.result.hits.filter(item => item.objectID !== itemID);
    const updatedList = { ...this.state.result, hits: filteredList };
    this.setState({ result: updatedList });
  }

  onSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({  searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  render() {
    const { 
      searchTerm,
      results,
      searchKey
     } = this.state;

     const page = (
       results &&
       results[searchKey] &&
       results[searchKey].page
     ) || 0;

     const list = (
       results &&
       results[searchKey] && 
       results[searchKey].hits
     ) || [];

    return (
      <div className="App">
        <div className="page">
          <div className="interactions">
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}>
              Search
        </Search>
          </div>
          {
            <Table
              list={list}
              onDismiss={this.onDismiss} 
            />
          }
          <div className="interactions">
            <Button
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
              More
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
