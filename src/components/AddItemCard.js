import React, { Component } from 'react'

export class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bookname: '',
          author: ''
        };
    }

    handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    };
    
    handleAddItem = () => {
        const newItem = {
            bookname: this.state.bookname,
            author: this.state.author
        };
        this.props.onAddItem(newItem);
        this.setState({
            bookname: '',
            author: ''
        });
    };

    render() {
        return (
            <div className='item'>
                <img
                    src={"./covers/addNewItem.png"}
                    alt={'Add new book cover'}
                    onClick={this.handleAddItem}
                />
                <input
                    type="text"
                    name="bookname"
                    placeholder="Назва книги"
                    value={this.state.bookname}
                    onChange={this.handleInputChange}
                    className='addItemCardInput'
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Ім'я автора"
                    value={this.state.author}
                    onChange={this.handleInputChange}
                    className='addItemCardInput'
                />
                <div className='addItemButton' onClick={this.handleAddItem}>Додати</div>
            </div>
        )
    }
}

export default Item