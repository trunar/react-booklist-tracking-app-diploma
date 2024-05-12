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

    render() {
        const { items, activeStatus } = this.props;
        const filteredItems = items.filter(item => item.readingStatus === activeStatus);

        return (
            <div className='maindiv'>
                <div className='sidediv'></div>
                <main>
                    <AddItemCard />
                    {filteredItems.map(el => (
                        <Item
                            key={el.id}
                            item={el}
                            onReadingStatusChange={this.handleReadingStatusChange}
                            onItemClick={this.handleItemClick}
                        />
                    ))}
                </main>
                <div className='sidediv'></div>
            </div>
        )
    }
}

export default Items