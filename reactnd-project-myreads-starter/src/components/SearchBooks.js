import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'


class SearchBooks extends Component {
    static propTypes = {
		books: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired
	}
    state = {
        query: '',
        displayBooks: []
    }

    updateQuery = (query) => {
        const { books } = this.props;
        this.setState({
            query: query
        });
        if(query.length === 0) {
            this.clearQuery(); 
        } else {
            BooksAPI.search(query).then((sBooks) => {
                if(sBooks.error) {
                    this.clearQuery();
                } else {
                    sBooks.map((searchBook) => {
                        books.find((book) => {
                            if(book.id === searchBook.id) {
                                searchBook.shelf = book.shelf;
                            } else {
                                searchBook.shelf = 'none';
                            }
                            return searchBook.id === book.id
                        })
                        return searchBook; //search array
                    })
                    this.setState({
                        displayBooks: sBooks
                    })
                }
            })
        }

        
    }

    clearQuery = () => {
        this.setState({
            query: '',
            displayBooks: []
        })
    }
    render() {
        const { displayBooks, query } = this.state;
        const { changeShelf } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link 
                    className="close-search"
                    to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(e) => { this.updateQuery(e.target.value) }}
                    />

                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {displayBooks.map((book) => (
                            <li key={book.id} >
                                <Book 
                                    book={book} 
                                    changeShelf={changeShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks;