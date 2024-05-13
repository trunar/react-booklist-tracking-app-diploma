import React, { Component } from 'react'

export class SearchBar extends Component {
    handleInputChange = (event) => {
        const searchText = event.target.value;
        this.props.onSearchTextChange(searchText);
    };
    render() {
        return (
            <div className='searchdiv'>
                <input
                    type="text"
                    placeholder="Пошук"
                    onChange={this.handleInputChange}
                />
            </div>
        )
    }
}

export default SearchBar