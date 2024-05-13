import React from "react"
import Header from "./components/Header";
import Items from "./components/Items";
import ItemPage from "./components/ItemPage";
import SearchBar from "./components/SearchBar";

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
            cover: './covers/1.jpg',
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
            cover: './covers/2.jpg',
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
            cover: './covers/3.jpg',
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
        selectedItem: null,
        searchText: ''
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

  handleAddItem = (newItem) => {
    const maxId = this.state.items.length > 0 ? Math.max(...this.state.items.map(item => item.id)) : 0;
    const updatedItems = [...this.state.items, {
      id: maxId + 1,
      ...newItem,
      cover: '',
      pagenum: '',
      publicationdate: '',
      genres: '',
      description: '',
      rating: 0,
      reviewText: '',
      readingStatus: this.state.activeStatus
    }];
    this.setState({ items: updatedItems });
  };

  handleDeleteItem = (itemId) => {
    const updatedItems = this.state.items.filter(item => item.id !== itemId);
    this.setState({ items: updatedItems });
  };

  handleDeleteCover = () => {
    const { selectedItem } = this.state;
    selectedItem.cover = '';
    this.setState({ selectedItem });
  };

  handleAddCover = (coverData) => {
    const { selectedItem, items } = this.state;
    const updatedItems = items.map(item => {
        if (item === selectedItem) {
            item.cover = URL.createObjectURL(coverData);
            console.log(URL.createObjectURL(coverData));
        }
        return item;
    });
    this.setState({ items: updatedItems });
  };

  handleSearchTextChange = (text) => {
    this.setState({ searchText: text });
  };

  render(){
    const { selectedItem, searchText } = this.state;

    if (selectedItem === null){
      return (
        <div className="wrapper">
          <Header
            onStatusChange={this.handleStatusChange}
            selectedItem={selectedItem}
            onGoBackToLists={this.handleGoBackToLists}
          />
          <SearchBar 
            onSearchTextChange={this.handleSearchTextChange}
          />
          <Items
            items={this.state.items}
            onItemsChange={this.handleItemsChange}
            activeStatus={this.state.activeStatus}
            onItemClick={this.handleItemClick}
            onAddItem={this.handleAddItem}
            onDeleteItem={this.handleDeleteItem}
            searchText={searchText}
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
            onDeleteItem={this.handleDeleteItem}
            onGoBackToLists={this.handleGoBackToLists}
            onAddCover={this.handleAddCover}
            onDeleteCover={this.handleDeleteCover}
            onReadingStatusChange={this.handleStatusChange}
          />
        </div>
      );
    }
  }
}

export default App;
