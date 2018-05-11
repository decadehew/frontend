import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		changeShelf: PropTypes.func.isRequired
	}
	imageLinks = (book) => {
		if(book.imageLinks && book.imageLinks.thumbnail) {
			return `url(${book.imageLinks.thumbnail})`;
		}
	}
	render() {
		const { book, changeShelf } = this.props;
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.imageLinks(book) }}></div>
					<div className="book-shelf-changer">
						<select
							value={book.shelf}
							onChange={(e)=> changeShelf(book, e.target.value) }>
							<option value="none" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors ? book.authors.join(',\n') : ''}</div>
			</div>
		)
	}
}

export default Book