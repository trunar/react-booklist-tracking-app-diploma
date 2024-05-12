import React, {useState} from 'react'

export default function Header({ onStatusChange, selectedItem, onGoBackToLists }) {
    const [active, setActive] = useState('Читатиму');

    const handleStatusChange = (status) => {
        setActive(status);
        onStatusChange(status);
    };

    const handleGoBackClick = () => {
        onGoBackToLists();
    };

    if (selectedItem === null){
        return (
            <header>
                <div>
                    <ul className='menu'>
                        <li className={active === 'Читатиму' ? 'activeItem' : ''} onClick={() => handleStatusChange('Читатиму')}>Читатиму</li>
                        <li className={active === 'Читаю' ? 'activeItem' : ''} onClick={() => handleStatusChange('Читаю')}>Читаю</li>
                        <li className={active === 'Прочитав' ? 'activeItem' : ''} onClick={() => handleStatusChange('Прочитав')}>Прочитав</li>
                    </ul>
                </div>
            </header>
        )
    } else {
        return (
            <header>
                <div>
                    <ul className='menu'>
                        <li onClick={handleGoBackClick} >До списків</li>
                    </ul>
                </div>
            </header>
        )
    }
}
