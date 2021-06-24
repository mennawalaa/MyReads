import React, { Component } from 'react';
import * as BooksAPI from "./BooksAPI";


class WantToRead extends Component {

  componentDidMount() {

    if (this.props !== undefined) {

      this.props.WantToReadBooks.forEach((item) => {
        BooksAPI.update(item, item.shelf);
      });
    }
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevprops !== this.props) {
      this.showBookState();
    }
  }


  getMovementData = (e, id) => {
    const Shelf = e.target.value;
    this.props.toNewShelf(id, Shelf);

  }

  showBookState = () => {

    this.props.WantToReadBooks.forEach((item) => {
      BooksAPI.update(item, item.shelf);
    });
  }
  render() {

    const Books = this.props.WantToReadBooks;

    return (
      <div>

        <div className="bookshelf-books">
          <ol className="books-grid">
            {Books.map(item =>

              <li key={item.id}>

                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${item.imageLinks ? item.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'}")` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={e => this.getMovementData(e, item.id)} value="wantToRead">
                        <option value="move">Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{item.title}</div>
                  <div className="book-authors">{item.authors}</div>
                </div>
              </li>

            )

            }
          </ol>
        </div>

      </div>
    );


  }


}
export default WantToRead;