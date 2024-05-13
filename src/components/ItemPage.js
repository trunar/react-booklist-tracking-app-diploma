import React, { Component } from 'react'
import Dropdown from './Dropdown'
import StarRating from './StarRating';

export class ItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            isPageEditable: false,
            bookname: '',
            author: '',
            pagenum: '',
            publicationdate: '',
            genre: '',
            description: '',
            reviewText: ''
        };
    }

    componentDidMount() {
        const { selectedItem } = this.props;
        if (selectedItem) {
            this.setState({
                bookname: selectedItem.bookname,
                author: selectedItem.author,
                pagenum: selectedItem.pagenum,
                publicationdate: selectedItem.publicationdate,
                genre: selectedItem.genre,
                description: selectedItem.description,
                reviewText: selectedItem.reviewText
            });
        }
    }

    handleRatingChange = (newRating) => {
        const { selectedItem, onRatingChange } = this.props;
        selectedItem.rating = newRating;
        onRatingChange(selectedItem);
    };

    handleEditClick = () => {
        this.setState({ isEditable: true });
    };

    handleSaveClick = () => {
        const { selectedItem, onSaveReviewText } = this.props;
        const { reviewText } = this.state;
        selectedItem.reviewText = reviewText;
        onSaveReviewText(selectedItem);
        this.setState({ isEditable: false });
    };

    handleEditPageClick = () => {
        this.setState({ isPageEditable: true });
    };

    handleSavePageClick = () => {
        const { selectedItem, onSavePage } = this.props;
        const { bookname, author, pagenum, publicationdate, genre, description } = this.state;
        
        selectedItem.description = description;
        selectedItem.bookname = bookname;
        selectedItem.author = author;
        selectedItem.pagenum = pagenum;
        selectedItem.publicationdate = publicationdate;
        selectedItem.genre = genre;
        
        onSavePage(selectedItem);
        this.setState({ isPageEditable: false });
    };

    handleReviewChange = (event) => {
        this.setState({ reviewText: event.target.value });
    };

    handleDeleteClick = () => {
        const { selectedItem, onDeleteItem } = this.props;
        onDeleteItem(selectedItem.id);
        this.props.onGoBackToLists();
    };

    handleDeleteCoverClick = () => {
        const { onDeleteCover } = this.props;
        onDeleteCover();
    };

    handleAddCoverClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.jpg';
        fileInput.onchange = this.handleCoverChange;
        fileInput.click();
    };
    
    handleCoverChange = (event) => {
        const file = event.target.files[0];
        this.props.onAddCover(file);
    };

    handleReadingStatusChange = (status) => {
        const { selectedItem, onReadingStatusChange } = this.props;
        selectedItem.readingStatus = status;
        onReadingStatusChange(selectedItem);
    };

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    };

    handleBooknameChange = (event) => {
        this.setState({ bookname: event.target.value });
    };
    
    handleAuthorChange = (event) => {
        this.setState({ author: event.target.value });
    };
    
    handlePagenumChange = (event) => {
        this.setState({ pagenum: event.target.value });
    };
    
    handlePublicationdateChange = (event) => {
        this.setState({ publicationdate: event.target.value });
    };

    handleGenreChange = (event) => {
        this.setState({ genre: event.target.value });
    };

    render() {
        const { selectedItem } = this.props;
        const { isEditable, isPageEditable, bookname, author, pagenum, publicationdate, description, reviewText, genre } = this.state;
        const genres = ['науковий', 'фікшн', 'нонфікшн', ''];
        return (
            <div className='itemPageMainDiv'>

                <div className='sidediv leftdiv'>
                    <div className='imageForm'>
                        <span>ID: {selectedItem.id}</span>
                        <img
                            src={selectedItem.cover ? selectedItem.cover : "./covers/noImage.png"}
                            alt={'Book cover with ID ' + selectedItem.id}
                        />
                        <span>Відношення 3 : 5</span>
                        <br></br>
                        <span>Формат .jpg</span>
                        <div className='itemPageButton' onClick={this.handleAddCoverClick}>Додати</div>
                        <div className='itemPageButton deleteButton' onClick={this.handleDeleteCoverClick}>Видалити</div>
                    </div>
                </div>
                    <main>
                        <ul className='itemPageUl'>
                            <div className='partUl'>
                            <li><input
                                className='i1'
                                type="text"
                                value={bookname}
                                readOnly={!isPageEditable}
                                style={{ borderWidth: isPageEditable ? '1px' : '0px' }}
                                onChange={this.handleBooknameChange}
                            /></li>
                            <li><input
                                className='i2'
                                type="text"
                                value={author}
                                readOnly={!isPageEditable}
                                style={{ borderWidth: isPageEditable ? '1px' : '0px' }}
                                onChange={this.handleAuthorChange}
                            /></li>
                            <li>Сторінок: <input
                                type="number"
                                value={pagenum}
                                readOnly={!isPageEditable}
                                style={{ borderWidth: isPageEditable ? '1px' : '0px' }}
                                onChange={this.handlePagenumChange}
                            /></li>
                            <li>Рік: <input
                                type="number"
                                value={publicationdate}
                                readOnly={!isPageEditable}
                                style={{ borderWidth: isPageEditable ? '1px' : '0px' }}
                                onChange={this.handlePublicationdateChange}
                            /></li>
                            <li>Жанр: {isPageEditable ? (
                                <select
                                    value={genre}
                                    onChange={this.handleGenreChange}
                                    className='genreSelector'
                                >
                                    {genres.map((genreOption, index) => (
                                        <option key={index} value={genreOption}>{genreOption}</option>
                                    ))}
                                </select>
                            ) : (
                                <span>{genre}</span>
                            )}
                            </li>

                            </div>
                            <hr></hr>
                            <div className='partUl'>
                                <li><h2>Опис</h2></li>
                                <li><textarea
                                        readOnly={!isPageEditable}
                                        style={{ borderWidth: isPageEditable ? '1px' : '0px' }}
                                        value={description}
                                        onChange={this.handleDescriptionChange}
                                        rows={7}
                                    />
                                </li>
                            </div>
                            <hr></hr>
                            <div className='partUl'>
                                <li><h2>Рецензія</h2></li>
                                <li>
                                    {selectedItem.rating}/5
                                    <StarRating
                                        rating={selectedItem.rating}
                                        onRatingChange={this.handleRatingChange}
                                    />
                                </li>
                                <li>
                                    <textarea
                                        readOnly={!isEditable}
                                        style={{ borderWidth: isEditable ? '1px' : '0px' }}
                                        value={reviewText}
                                        onChange={this.handleReviewChange}
                                        rows={10}
                                    />
                                </li>
                            </div>
                            <li className='reviewForm'>
                                {isEditable ? (
                                    <div className='itemPageButton' onClick={this.handleSaveClick}>Зберегти</div>
                                ) : (
                                    <div className='itemPageButton' onClick={this.handleEditClick}>Редагувати</div>
                                )}
                            </li>
                        </ul>
                    </main>
                <div className='sidediv rightdiv'>
                    <Dropdown value={selectedItem.readingStatus} onChange={this.handleReadingStatusChange} />
                    {isPageEditable ? (
                        <div className='itemPageButton' onClick={this.handleSavePageClick}>Зберегти</div>
                    ) : (
                        <div className='itemPageButton' onClick={this.handleEditPageClick}>Редагувати</div>
                    )}
                    <div className='itemPageButton deleteButton' onClick={this.handleDeleteClick}>Видалити</div>
                </div>

            </div>
        )
    }
}

export default ItemPage