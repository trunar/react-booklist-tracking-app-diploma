import React, { Component } from 'react'
import Dropdown from './Dropdown'
import StarRating from './StarRating';

export class ItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isEditable: false,
          isPageEditable: false,
          reviewText: '',
          description: '',
        };
    }

    componentDidMount() {
        const { selectedItem } = this.props;
        if (selectedItem) {
            this.setState({ reviewText: selectedItem.reviewText,
                            description: selectedItem.description
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
        const { selectedItem, onSaveDescription } = this.props;
        const { description } = this.state;
        selectedItem.description = description;
        onSaveDescription(selectedItem);
        this.setState({ isPageEditable: false });
    };

    handleReviewChange = (event) => {
        this.setState({ reviewText: event.target.value });
    };

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
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

    render() {
        const { selectedItem } = this.props;
        const { isEditable, isPageEditable, reviewText, description } = this.state;
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
                            <li><input className='i1' type="text" value={selectedItem.bookname} readOnly required /></li>
                            <li><input className='i2' type="text" value={selectedItem.author} readOnly required /></li>
                            <li>Сторінок: <input type="number" value={selectedItem.pagenum} readOnly maxLength={5} /></li>
                            <li>Рік: <input type="number" value={selectedItem.publicationdate} maxLength={4} readOnly /></li>
                            <li>Жанр: {selectedItem.genres}</li>

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