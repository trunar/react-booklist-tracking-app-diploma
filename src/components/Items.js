import React, { Component } from 'react'
import Item from './Item'
import AddItemCard from './AddItemCard'

export class Items extends Component {
    state = {
        filterOption: 'all',
        reviewFilterOption: 'all',
        genreFilterOption: 'all',
        minPageFilter: '',
        maxPageFilter: ''
    };

    handleFilterChange = (filter) => {
        this.setState({ filterOption: filter });
    };

    handleReviewFilterChange = (filter) => {
        this.setState({ reviewFilterOption: filter });
    };

    handleGenreFilterChange = (filter) => {
        this.setState({ genreFilterOption: filter });
    };

    handleMinPageFilterChange = (event) => {
        this.setState({ minPageFilter: event.target.value });
    };

    handleMaxPageFilterChange = (event) => {
        this.setState({ maxPageFilter: event.target.value });
    };

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
        const { items, activeStatus, searchText, userId } = this.props;
        const { filterOption, reviewFilterOption, genreFilterOption, minPageFilter, maxPageFilter } = this.state;

        let filteredItemstemp = items.filter(item =>
            (item.readingStatus === activeStatus)
        );

        filteredItemstemp = filteredItemstemp.filter(item => item.userId === userId);

        filteredItemstemp = filteredItemstemp.filter(item =>
            (item.bookname.toLowerCase().includes(searchText.toLowerCase()) ||
            item.author.toLowerCase().includes(searchText.toLowerCase()))
        );

        if (filterOption === 'rated') {
            filteredItemstemp = filteredItemstemp.filter(item => item.rating && item.rating >= 1 && item.rating <= 5);
        } else if (filterOption === 'unrated') {
            filteredItemstemp = filteredItemstemp.filter(item => !item.rating || item.rating === 0);
        }

        if (reviewFilterOption === 'reviewed') {
            filteredItemstemp = filteredItemstemp.filter(item => item.reviewText !== '' && item.reviewText !== null);
        } else if (reviewFilterOption === 'unreviewed') {
            filteredItemstemp = filteredItemstemp.filter(item => item.reviewText === '' || item.reviewText === null);
        }

        if (genreFilterOption !== 'all') {
            filteredItemstemp = filteredItemstemp.filter(item => item.genre === genreFilterOption);
        }

        if (minPageFilter !== '') {
            const minPages = parseInt(minPageFilter);
            filteredItemstemp = filteredItemstemp.filter(item => item.pagenum >= minPages);
        }

        if (maxPageFilter !== '') {
            const maxPages = parseInt(maxPageFilter);
            filteredItemstemp = filteredItemstemp.filter(item => item.pagenum <= maxPages);
        }

        const filteredItems = filteredItemstemp;

        return (
            <div className='maindiv'>

                <div className='sidediv'>
                    <h1>Фільтри</h1>
                    <hr></hr>
                    <h2>Жанри</h2>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="genreFilter"
                                checked={genreFilterOption === 'all'}
                                onChange={() => this.handleGenreFilterChange('all')}
                            />
                            Всі
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="genreFilter"
                                checked={genreFilterOption === 'науковий'}
                                onChange={() => this.handleGenreFilterChange('науковий')}
                            />
                            Науковий
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="genreFilter"
                                checked={genreFilterOption === 'фікшн'}
                                onChange={() => this.handleGenreFilterChange('фікшн')}
                            />
                            Фікшн
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="genreFilter"
                                checked={genreFilterOption === 'нонфікшн'}
                                onChange={() => this.handleGenreFilterChange('нонфікшн')}
                            />
                            Нонфікшн
                        </label>
                    </div>
                    <hr></hr>
                    <h2>Оцінка</h2>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="filter"
                                checked={filterOption === 'all'}
                                onChange={() => this.handleFilterChange('all')}
                            />
                            Всі
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="filter"
                                checked={filterOption === 'rated'}
                                onChange={() => this.handleFilterChange('rated')}
                            />
                            Оцінені
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="filter"
                                checked={filterOption === 'unrated'}
                                onChange={() => this.handleFilterChange('unrated')}
                            />
                            Не оцінені
                        </label>
                    </div>
                    <hr></hr>
                    <h2>Рецензія</h2>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="reviewFilter"
                                checked={reviewFilterOption === 'all'}
                                onChange={() => this.handleReviewFilterChange('all')}
                            />
                            Всі
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="reviewFilter"
                                checked={reviewFilterOption === 'reviewed'}
                                onChange={() => this.handleReviewFilterChange('reviewed')}
                            />
                            З рецензією
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="reviewFilter"
                                checked={reviewFilterOption === 'unreviewed'}
                                onChange={() => this.handleReviewFilterChange('unreviewed')}
                            />
                            Без рецензії
                        </label>
                    </div>
                    <hr></hr>
                    <h2>Кількість сторінок</h2>
                    <div className='pageNumForm'>
                        <input
                            type="number"
                            value={minPageFilter}
                            onChange={this.handleMinPageFilterChange}
                            placeholder='Від'
                        />
                        <input
                            type="number"
                            value={maxPageFilter}
                            onChange={this.handleMaxPageFilterChange}
                            placeholder='До'
                        />
                    </div>
                </div>

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