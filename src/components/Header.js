import React, {useState} from 'react'

export default function Header() {

    const [active, setActive] = useState(0);

    return (
        <header>
            <div>
                <ul className='menu'>
                    <li className={active === 0 ? 'activeItem' : ''} onClick={() => setActive(0)}>Читатиму</li>
                    <li className={active === 1 ? 'activeItem' : ''} onClick={() => setActive(1)}>Читаю</li>
                    <li className={active === 2 ? 'activeItem' : ''} onClick={() => setActive(2)}>Прочитав</li>
                </ul>
            </div>
        </header>
    )
}
