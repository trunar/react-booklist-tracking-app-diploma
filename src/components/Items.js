import React, { Component } from 'react'
import Item from './Item'

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

    render() {
        return (
            <div className='maindiv'>
                <div className='sidediv'></div>
                <main>
                    <Item key={1} item={this.props.items[0]} />
                    {this.props.items.map(el => (
                        <Item key={el.id} item={el} onReadingStatusChange={this.handleReadingStatusChange} />
                    ))}
                </main>
                <div className='sidediv'></div>
            </div>
        )
    }
}

export default Items