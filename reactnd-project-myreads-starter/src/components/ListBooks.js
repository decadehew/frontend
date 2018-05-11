import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired
	}

	shelfFilter = (shelf) => {
		const { books } = this.props;
		return books.filter((book) => book.shelf === shelf)
	}

	
	render() {
		const { changeShelf } = this.props;
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Bookshelf 
							title="Currently Reading" 
							books={this.shelfFilter("currentlyReading")}
							changeShelf={changeShelf}
						/>
						<Bookshelf 
							title="Want to Read" 
							books={this.shelfFilter("wantToRead")}
							changeShelf={changeShelf}
						/>
						<Bookshelf 
							title="Read" 
							books={this.shelfFilter("read")}
							changeShelf={changeShelf}
						/>
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">
						Add a book
					</Link>
				</div>
			</div>
		)
	}
}

export default ListBooks