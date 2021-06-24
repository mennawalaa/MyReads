import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';





class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      key: 'Art ',
      getData: 0,
      changingBookId: ' ',
      newShelf: ' ',
      selectedObj: {},
      missingAuthor: 'unkown auther',
      missingthumbnail: ' ',


    };
  }

  searchForBooks = (event) => {
    const Input = event.target.value;
    this.setState({ key: Input });
    if (!Input) {
      this.setState({ searchResults: [] });

    } else {

      BooksAPI.search(Input, 20).then((res) => {
        if (!res || res.error) {
          this.setState({ searchResults: [] });
        } else {
          this.setState({ searchResults: res });

          //adding shelf
          const modifiedRes = this.shelfState(res);
          this.setState({ searchResults: modifiedRes });

        }
      });
    }
  }
  getMovementData = (e, Item) => {

    const Shelf = e.target.value;
    // add shelf property to selected item
    Item["shelf"] = Shelf;
    this.setState({ getData: 1 });
    this.setState({ selectedObj: Item });
    // BooksAPI.update(Item, Item.shelf);
    this.props.passAddItem(Item);



  }

  shelfState = (res) => {
    //compare search reasults with books on shelves 
    res.forEach((item) => {
      let foundc = false;
      let foundw = false;
      let foundp = false;
      for (let i = 0; i < this.props.ReadingBooks.length; i++) {
        if (this.props.ReadingBooks[i].id === item.id) {
          foundc = true;
          break;
        }
      }
      if (foundc) {
        //add currnet shelf
        item["shelf"] = 'currentlyReading';

      }

      else {
        for (let i = 0; i < this.props.WantToReadBooks.length; i++) {
          if (this.props.WantToReadBooks[i].id === item.id) {
            foundw = true;
            break;
          }
        }
      }
      if (foundw) {
        //add wantto shelf
        item["shelf"] = 'wantToRead';

      }

      else {

        for (let i = 0; i < this.props.Read.length; i++) {
          if (this.props.Read[i].id === item.id) {
            foundp = true;
            break;
          }
        }
        if (foundp) {
          //add read shelf
          item["shelf"] = 'read';
        } else {
          if (((!foundp) && (!foundw) && (!foundc))) {
            //add anone shelf
            item["shelf"] = 'none';
          }
        }

      }

      BooksAPI.update(item, item.shelf);

    })

    return res;
  }

  render() {

    return (
      <div>


        <div className="search-books-input-wrapper">
          <DebounceInput minLength={0} element='input' type='text'
            debounceTimeout={300} placeholder="Search by title or author" onChange={event => this.searchForBooks(event)} />
          <div className="search-books-results">
            <ol className="books-grid">
              {(this.state.searchResults) && (this.state.searchResults.map(item =>
                <li key={item.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${item.imageLinks ? item.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'}")` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={e => this.getMovementData(e, item)} value={item.shelf} >
                          <option value="move">Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead" >Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title" >{item.title}</div>
                    <div className="book-authors">{item.authors}</div>


                  </div>
                </li>


              )


              )}
            </ol>
            <Link className="close-search" to='/'>Close</Link>

            <p>

            </p>
          </div>
        </div>
      </div>


    );


  }








};
export default Search;