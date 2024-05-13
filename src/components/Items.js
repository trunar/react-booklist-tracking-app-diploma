import React, { Component } from 'react'
import Item from './Item'
import AddItemCard from './AddItemCard'

export class Items extends Component {
    handleReadingStatusChange = (itemId, newStatus) => {
        const updatedItems = this.props.items.map(item => {
          if (item.id === itemId) {
            return { ...item, readingStatus: newStatus };
          }
          return item;
        });
        this.props.onItemsChange(updatedItems);
    };

    handleItemClick = (clickedItem) => {
        this.props.onItemClick(clickedItem);
    };

    handleDeleteItem = (clickedItem) => {
        this.props.onDeleteItem(clickedItem);
    };

    render() {
        const { items, activeStatus, searchText } = this.props;
        const filteredItems = items.filter(item =>
            (item.readingStatus === activeStatus) &&
            (item.bookname.toLowerCase().includes(searchText.toLowerCase()) ||
            item.author.toLowerCase().includes(searchText.toLowerCase()))
        );

        return (
            <div className='maindiv'>
                <div className='sidediv'></div>
                <main>
                    <AddItemCard onAddItem={this.props.onAddItem} />
                    {filteredItems.map(el => (
                        <Item
                            key={el.id}
                            item={el}
                            onReadingStatusChange={this.handleReadingStatusChange}
                            onItemClick={this.handleItemClick}
                            onDeleteItem={this.handleDeleteItem}
                        />
                    ))}
                </main>
                <div className='sidediv'></div>
            </div>
        )
    }
}

export default Items