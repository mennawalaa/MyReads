import React, {Component} from 'react';

import Reading from './Reading'
import WantToRead from './WantToRead'
import Read from './Read'
import { Link } from 'react-router-dom';


class BookList extends Component{

  render(){
      return(
        <div className="app">
        
         
     
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>                  
                     <Reading readingBooks={this.props.ReadingBooks} toNewShelf={this.props.passshelfChange}/>
                </div>
                <div className="app">
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>                                  
                     <WantToRead WantToReadBooks={this.props.WantToReadBooks} toNewShelf={this.props.passshelfChange} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>                 
                    <Read readBooks={this.props.Read} toNewShelf={this.props.passshelfChange} />
                  
                </div>
              </div>
            </div>
            
          </div>
          <div className="open-search">
            <Link to="/Search">Add a book</Link>
             
            
            </div>
       
        </div>
      </div>
        );
    
    
  }




}

export default BookList ;