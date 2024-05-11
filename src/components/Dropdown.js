import React, { Component } from 'react';

class Dropdown extends Component {
  render() {
    const { value, onChange } = this.props;

    const handleChange = (e) => {
        onChange(e.target.value);
    };
    return (
        <select value={value} onChange={handleChange} className="dropdown">
            <option value="Читатиму">Читатиму</option>
            <option value="Читаю">Читаю</option>
            <option value="Прочитав">Прочитав</option>
        </select>
    );
  }
}

export default Dropdown;