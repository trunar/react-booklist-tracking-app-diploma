import React, { Component } from 'react'

export class Item extends Component {
    render() {
        return (
            <div className='item'>
                <img src={"./covers/addNewItem.png"} alt={'Add new book cover'} />
                <h2>Додавання</h2>
                <h3>нової книги</h3>
                <div className='addItemButton'>Додати</div>
            </div>
        )
    }
}

export default Item