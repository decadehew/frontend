import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      })
    })
  }

  updateShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then((data) => {
      book.shelf = shelf;
      console.log(book)
      this.setState((state) => ({
        books: state.books.filter((item) => item.id !== book.id).concat( [book] )
      }));

    })
	}

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks 
            books={this.state.books}
            changeShelf={this.updateShelf}
          />
        )}/>
        
        <Route path="/search" render={() => (
            <SearchBooks 
              books={this.state.books}
              changeShelf={this.updateShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
