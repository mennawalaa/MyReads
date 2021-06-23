import React, {Component} from 'react';

class WantToRead extends Component{
  constructor(props){
    super(props);
    this.state={getData:0 ,
    changingBookId:' ',
    newShelf:' '
    }
  }
  getMovementData=(e,id)=>{
    const Shelf=e.target.value;
     this.setState({getData:1});
     this.setState({changingBookId:id});
     this.setState({newShelf:Shelf});
     this.props.toNewShelf(id,Shelf);

  } 
 render(){
  const Books=this.props.WantToReadBooks ;
   return(
      <div>
      <p>want to read these books</p>
      <div className="bookshelf-books">
        <ol className="books-grid">
            { Books.map(item=>
                    
                     <li key={item.id}>
                    
                       <div className="book">
                         <div className="book-top">
                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${item.imageLinks ? item.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'}")`}}></div>
                           <div className="book-shelf-changer">
                             <select onChange={e=>this.getMovementData(e,item.id)}>
                               <option value="move">Move to...</option>
                               <option value="currentlyReading">Currently Reading</option>
                               <option value="wantToRead">Want to Read</option>
                               <option value="read">Read</option>
                               <option value="none" disabled>None</option>
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
export default WantToRead ;