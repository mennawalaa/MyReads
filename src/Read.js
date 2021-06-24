import React, { Component } from 'react';
import * as BooksAPI from "./BooksAPI";



class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getData: 0,
      changingBookId: ' ',
      newShelf: ' ',
      read: 0,
      wantoread: 0,
      current: 0
    }
  }
  componentDidMount() {
    this.showBookState();
  }
  getMovementData = (e, id) => {
    const Shelf = e.target.value;
    this.setState({ getData: 1 });
    this.setState({ changingBookId: id });
    this.setState({ newShelf: Shelf });
    this.props.toNewShelf(id, Shelf);

  }
  componentDidUpdate(prevprops, prevstate) {
    if (prevprops !== this.props) {
      this.props.readBooks.forEach((item) => {
        BooksAPI.update(item, item.shelf);
      })
    }
  }

  showBookState = () => {

    this.props.readBooks.forEach((item) => {
      BooksAPI.update(item, item.shelf);
      let selected1 = (item.shelf === "wantToRead") ? true : false;
      this.setState({ wantoread: selected1 });
      let selected2 = (item.shelf === "currentlyReading") ? true : false;
      this.setState({ current: selected2 });
      let selected3 = (item.shelf === "read") ? true : false;
      this.setState({ read: selected3 });

    });
  }

  render() {
    const Books = this.props.readBooks;
    return (
      <div>
        <p>those books where great </p>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {Books.map(item =>

              <li key={item.id}>

                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${item.imageLinks ? item.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'}")` }}></div>
                    <div className="book-shelf-changer">

                      <select onChange={e => this.getMovementData(e, item.id)} value={item.shelf} >
                        <option value="move" >Move to...</option>
                        <option value="currentlyReading" selected={this.state.current}>Currently Reading</option>
                        <option value="wantToRead" selected={this.state.wantoread}>Want to Read</option>
                        <option value="read" selected={this.state.read}>Read</option>
                        <option value="none" disabled>None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title" key={Books.title}>{item.title}</div>
                  <div className="book-authors" key={Books.authors}>{item.authors}</div>
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

export default Read;