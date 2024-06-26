import React, { Component } from 'react'
import Dropdown from './Dropdown'

export class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readingStatus: this.props.item.readingStatus || '',
        };
    }
    
    handleReadingStatusChange = (status) => {
        this.setState({ readingStatus: status });
        this.props.onReadingStatusChange(this.props.item.id, status);
    };

    handleItemClick = () => {
        this.props.onItemClick(this.props.item);
    };

    handleDeleteClick = () => {
        const { onDeleteItem } = this.props;
        onDeleteItem(this.props.item.id);
    };

    render() {
        return (
        <div className='item'>
            <div className='xmark' onClick={this.handleDeleteClick}>x</div>
            <img
                src={this.props.item.cover ? this.props.item.cover : "./covers/noImage.png"}
                alt={'Book cover with ID ' + this.props.item.id}
                onClick={this.handleItemClick}
            />
            <h2>{this.props.item.bookname}</h2>
            <h3>{this.props.item.author}</h3>
            <Dropdown value={this.state.readingStatus} onChange={this.handleReadingStatusChange} />
        </div>
        )
    }
}

export default Item