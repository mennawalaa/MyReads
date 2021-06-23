import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import Search from "./Search";
import BookList from "./BookList";

class BooksApp extends React.Component {
  state = {
    updatedData: [],
    showSearchPage: false,
    ReadingBooks: [],
    WantToReadBooks: [],
    Read: [],
    prevShelf: " ",
  };
  moveToSearch = () => {
    this.setState({ showSearchPage: true });
  };
  Back = () => {
    this.setState({ showSearchPage: false });
  };
  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      const newItem = this.addItem();
      if (newItem !== undefined) {
        const newres = [...res, newItem];
        this.setState({ updatedData: newres });
      } else {
        this.setState({ updatedData: res });
      }

      this.mapping();
    });
  }
  shelfChange = (id, shelf) => {
    //change the book shelf
    const movingBook = this.state.updatedData.find((item) => item.id === id);
    movingBook.shelf = shelf;
    this.mapping();
  };

  addItem = (selectedItem) => {
    if (selectedItem !== undefined) {
      const movingBook = this.state.updatedData.find(
        (item) => item.id === selectedItem.id
      );

      if (movingBook !== undefined) {
        //if the call to set shelf is comming from the search page
        // return book shelf state to search page

        this.setState({ prevShelf: movingBook.shelf });

        movingBook.shelf = selectedItem.shelf;

        this.mapping();
      } else {
        //the data come from search not found  in the list

        //form a array of the old state and the new item
        const newarr = this.state.updatedData.concat(selectedItem);

        //map the new array to the shelf states
        const currentlyReading = newarr.filter(
          (item) => item.shelf === "currentlyReading"
        );

        this.setState({ ReadingBooks: currentlyReading });
        const wantto = newarr.filter((item) => item.shelf === "wantToRead");
        this.setState({ WantToReadBooks: wantto });
        const read = newarr.filter((item) => item.shelf === "read");
        this.setState({ Read: read });
        this.setState({ updatedData: newarr });
      }
    }
  };

  mapping = () => {
    const currentlyReading = this.state.updatedData.filter(
      (item) => item.shelf === "currentlyReading"
    );
    this.setState({ ReadingBooks: currentlyReading });

    const wantto = this.state.updatedData.filter(
      (item) => item.shelf === "wantToRead"
    );
    this.setState({ WantToReadBooks: wantto });

    const read = this.state.updatedData.filter((item) => item.shelf === "read");
    this.setState({ Read: read });
  };

  render() {
    return (
      <div>
        <>
          <Route
            path="/Search"
            render={() => (
              <Search
                backButton={this.Back}
                passAddItem={this.addItem}
                oldShelf={this.state.prevShelf}
                ReadingBooks={this.state.ReadingBooks}
                WantToReadBooks={this.state.WantToReadBooks}
                Read={this.state.Read}
              />
            )}
          />
        </>

        <>
          <Route
            path="/"
            exact
            render={() => (
              <BookList
                addBook={this.moveToSearch}
                passshelfChange={this.shelfChange}
                ReadingBooks={this.state.ReadingBooks}
                WantToReadBooks={this.state.WantToReadBooks}
                Read={this.state.Read}
              />
            )}
          />
        </>
      </div>
    );
  }
}

export default BooksApp;
