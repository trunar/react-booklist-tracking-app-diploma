import React from "react"
import Header from "./components/Header";
import Items from "./components/Items";

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        items: [
          {
            id: 1,
            bookname: 'Перша книга',
            author: 'Автор книги 1',
            cover: '1.jpg',
            pagenum: '123',
            publicationdate: '2001',
            genres: ['перший', 'другий', 'третій'],
            description: 'Текст що описує книгу книгу книгу книгу книгу книгу книгу книгу.',
            rating: 4,
            reviewText: 'Текст що описує відгук користувача про книгу книгу книгу книгу книгу книгу книгу книгу.',
            readingStatus: 'Читатиму'
          },
          {
            id: 2,
            bookname: 'Друга книга',
            author: 'Автор книги 2',
            cover: '2.jpg',
            pagenum: '1232',
            publicationdate: '2002',
            genres: ['перший', 'третій'],
            description: 'Текст що описує книгу книгу книгу книгу книгу книгу книгу книгу.',
            rating: 5,
            reviewText: 'Текст що описує відгук користувача про книгу книгу книгу книгу книгу книгу книгу книгу.',
            readingStatus: 'Читатиму'
          },
          {
            id: 3,
            bookname: 'Третя книга',
            author: 'Автор книги 3',
            cover: '3.jpg',
            pagenum: '342',
            publicationdate: '2003',
            genres: ['перший', 'другий'],
            description: 'Текст що описує книгу книгу книгу книгу книгу книгу книгу книгу.',
            rating: 3,
            reviewText: 'Текст що описує відгук користувача про книгу книгу книгу книгу книгу книгу книгу книгу.',
            readingStatus: 'Читатиму'
          },

        ]
      }
  }
  handleItemsChange = (updatedItems) => {
      this.setState({ items: updatedItems });
  };
  render(){
    return (
      <div className="wrapper">
        <Header />
        <Items items={this.state.items} onItemsChange={this.handleItemsChange} />
      </div>
    );
  }
}

export default App;
