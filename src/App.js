import React from "react"
import Header from "./components/Header";
import Items from "./components/Items";
import ItemPage from "./components/ItemPage";

const genresmas = ['науковий', 'фікшн', 'нонфікшн']

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
            genres: genresmas[0],
            description: 'Текст що описує книгу книгу книгу книгу книгу книгу книгу книгу.',
            rating: 0,
            reviewText: '',
            readingStatus: 'Читатиму'
          },
          {
            id: 2,
            bookname: 'Друга книга',
            author: 'Автор книги 2',
            cover: '2.jpg',
            pagenum: '1232',
            publicationdate: '2002',
            genres: genresmas[1],
            description: 'Текст що описує книгу книгу книгу книгу книгу книгу книгу книгу.',
            rating: 5,
            reviewText: 'Текст що описує відгук користувача про книгу книгу книгу книгу книгу книгу книгу книгу.',
            readingStatus: 'Читаю'
          },
          {
            id: 3,
            bookname: 'Третя книга',
            author: 'Автор книги 3',
            cover: '3.jpg',
            pagenum: '342',
            publicationdate: '2003',
            genres: genresmas[2],
            description: 'Текст що описує книгу книгу книгу книгу книгу книгу книгу книгу.',
            rating: 3,
            reviewText: 'Текст що описує відгук користувача про книгу книгу книгу книгу книгу книгу книгу книгу.',
            readingStatus: 'Прочитав'
          },

        ],
        activeStatus: 'Читатиму',
        selectedItem: null
      }
  }

  handleStatusChange = (status) => {
      this.setState({ activeStatus: status });
  }; 

  handleItemsChange = (updatedItems) => {
      this.setState({ items: updatedItems });
  };

  handleGoBackToLists = () => {
      this.setState({ selectedItem: null });
  };

  handleItemClick = (clickedItem) => {
    this.setState({ selectedItem: clickedItem });
  };

  handleRatingChange = (updatedItem) => {
    const updatedItems = this.state.items.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.setState({ items: updatedItems });
  };

  handleSaveReviewText = (updatedItem) => {
    const updatedItems = this.state.items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    this.setState({ items: updatedItems });
  };
  handleSaveDescription = (updatedItem) => {
    const updatedItems = this.state.items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    this.setState({ items: updatedItems });
  };

  render(){
    const { selectedItem } = this.state;

    if (selectedItem === null){
      return (
        <div className="wrapper">
          <Header
            onStatusChange={this.handleStatusChange}
            selectedItem={selectedItem}
            onGoBackToLists={this.handleGoBackToLists}
          />
          <Items
            items={this.state.items}
            onItemsChange={this.handleItemsChange}
            activeStatus={this.state.activeStatus}
            onItemClick={this.handleItemClick}
          />
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <Header
            onStatusChange={this.handleStatusChange}
            selectedItem={selectedItem}
            onGoBackToLists={this.handleGoBackToLists}
          />
          <ItemPage
            selectedItem={selectedItem}
            onRatingChange={this.handleRatingChange}
            onSaveReviewText={this.handleSaveReviewText}
            onSaveDescription={this.handleSaveDescription}
          />
        </div>
      );
    }
  }
}

export default App;
