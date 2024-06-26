import React from "react"
import Header from "./components/Header";
import Items from "./components/Items";
import ItemPage from "./components/ItemPage";
import SearchBar from "./components/SearchBar";
import AuthForm from "./components/AuthForm";

import axios from "axios";

const dbItemsReload = (updatedItems) => {
  axios.delete('http://localhost:3001/items')
    .then(response => {
      console.log("Старі дані успішно видалено");
      axios.post('http://localhost:3001/items', updatedItems)
        .then(response => {
          console.log("Нові дані успішно вставлено");
        })
        .catch(error => {
          console.log("Помилка вставлення нових даних:", error);
        });
    })
    .catch(error => {
      console.log("Помилка видалення старих даних:", error);
    });
}

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        items: [],
        activeStatus: 'Читатиму',
        selectedItem: null,
        searchText: '',
        currentUser: null,
        userId: null
      }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/items')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleStatusChange = (status) => {
      this.setState({ activeStatus: status });
  }; 

  handleItemsChange = (updatedItems) => {
    axios.delete('http://localhost:3001/items')
      .then(response => {
        console.log("Старі дані успішно видалено");
        axios.post('http://localhost:3001/items', updatedItems)
          .then(response => {
            console.log("Нові дані успішно вставлено");
            this.setState({ items: updatedItems });
          })
          .catch(error => {
            console.log("Помилка вставлення нових даних:", error);
          });
      })
      .catch(error => {
        console.log("Помилка видалення старих даних:", error);
      });
  };

  handleGoBackToLists = () => {
    this.setState({ selectedItem: null });
    const updatedItems = this.state.items;
    dbItemsReload(updatedItems);
  };

  handleItemClick = (clickedItem) => {
    this.setState({ selectedItem: clickedItem });
  };

  handleRatingChange = (updatedItem) => {
    const updatedItems = this.state.items.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    dbItemsReload(updatedItems);
    this.setState({ items: updatedItems });
  };

  handleSaveReviewText = (updatedItem) => {
    const updatedItems = this.state.items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    dbItemsReload(updatedItems);
    this.setState({ items: updatedItems });
  };

  handleSavePage = (updatedItem) => {
    const updatedItems = this.state.items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    dbItemsReload(updatedItems);
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
      readingStatus: this.state.activeStatus,
      userId: this.state.userId
    }];
    dbItemsReload(updatedItems);
    this.setState({ items: updatedItems });
  };

  handleDeleteItem = (itemId) => {
    const updatedItems = this.state.items.filter(item => item.id !== itemId);
    dbItemsReload(updatedItems);
    this.setState({ items: updatedItems });
  };

  handleDeleteCover = () => {
    const { selectedItem } = this.state;
    const filename = selectedItem.cover.split('/').pop();

    axios.delete(`http://localhost:3001/delete-cover/${filename}`)
        .then(response => {
            console.log('File deleted successfully:', response.data);
            selectedItem.cover = '';
            const updatedItems = this.state.items.map(item => {
                if (item === selectedItem) {
                    item.cover = selectedItem.cover;
                }
                return item;
            });
            dbItemsReload(updatedItems);
            this.setState({ selectedItem });
        })
        .catch(error => {
            console.error('There was a problem with your Axios request:', error);
        });
  };

  handleAddCover = (coverURL) => {
    const { selectedItem, items } = this.state;
    const updatedItems = items.map(item => {
        if (item === selectedItem) {
            item.cover = coverURL;
        }
        return item;
    });
    dbItemsReload(updatedItems);
    this.setState({ items: updatedItems });
  };

  handleSearchTextChange = (text) => {
    this.setState({ searchText: text });
  };

  handleAuthClick = (login, password) => {
    axios.post('http://localhost:3001/auth', { login, password })
    .then(response => {
      if (response.data.success) {
        this.setState({ userId: response.data.userId, currentUser: response.data.login });
      } else {
        this.setState({ userId: null, currentUser: null });
        alert("Введені дані є некоректними");
      }
    })
    .catch(error => {
      console.error('Error authenticating:', error);
    });
  }

  handleRegisterClick = (login, password) => {
    if (login !== '' && password !== ''){
      axios.post('http://localhost:3001/register', { login, password })
      .then(response => {
        if (response.data.success) {
          alert("Створено нового користувача " + login);
          axios.post('http://localhost:3001/auth', { login, password })
          .then(response => {
            if (response.data.success) {
              this.setState({ userId: response.data.userId, currentUser: response.data.login });
            } else {
              this.setState({ userId: null, currentUser: null });
              alert("Введені дані є некоректними");
            }
          })
          .catch(error => {
            console.error('Error authenticating:', error);
          });
        } else {
          alert("Помилка реєстрації");
        }
      })
      .catch(error => {
        alert("Користувач вже існує");
        console.error('Error registering user:', error);
      });
    } else {alert("Дані введено некоректно");}
  }

  handleLogoutClick = () => {
    this.setState({
      activeStatus: 'Читатиму',
      selectedItem: null,
      searchText: '',
      userId: null,
      currentUser: null
    });
    window.location.reload();
  }

  render(){
    const { selectedItem, searchText, currentUser, userId } = this.state;

    if (currentUser){
      if (selectedItem === null){
        return (
          <div className="wrapper">
            <div className="logoutdiv">Вітаємо, {currentUser}! <span className="logoutbutton" onClick={this.handleLogoutClick}>Вийти</span></div>
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
              userId={userId}
            />
          </div>
        );
      } else {
        return (
          <div className="wrapper">
            <div className="logoutdiv">Вітаємо, {currentUser}! <span className="logoutbutton" onClick={this.handleLogoutClick}>Вийти</span></div>
            <Header
              onStatusChange={this.handleStatusChange}
              selectedItem={selectedItem}
              onGoBackToLists={this.handleGoBackToLists}
            />
            <ItemPage
              selectedItem={selectedItem}
              onRatingChange={this.handleRatingChange}
              onSaveReviewText={this.handleSaveReviewText}
              onSavePage={this.handleSavePage}
              onDeleteItem={this.handleDeleteItem}
              onGoBackToLists={this.handleGoBackToLists}
              onAddCover={this.handleAddCover}
              onDeleteCover={this.handleDeleteCover}
              onReadingStatusChange={this.handleStatusChange}
            />
          </div>
        );
      }
    } else {
      return(
        <div className="wrapper">
          <AuthForm
            onAuthClick={this.handleAuthClick}
            onRegisterClick={this.handleRegisterClick}
          />
        </div>
      );
    }
  }
}

export default App;
