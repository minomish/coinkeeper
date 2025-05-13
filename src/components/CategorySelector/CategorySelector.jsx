import { useState } from 'react';

const categories = ['Еда', 'Транспорт', 'Развлечения', 'Зарплата', 'Другое'];

const CategorySelector = ({ value, onChange }) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    if (selected === 'Другое') {
      setIsCustom(true);
      onChange(''); // пока пусто, пользователь введет
    } else {
      setIsCustom(false);
      onChange(selected);
    }
  };

  const handleCustomCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCustomCategory(newCategory);
    onChange(newCategory);
  };

  return (
    <div>
      <label>Категория:</label>
      <select onChange={handleCategoryChange} value={isCustom ? 'Другое' : value}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {isCustom && (
        <input
          type="text"
          placeholder="Введите категорию"
          value={customCategory}
          onChange={handleCustomCategoryChange}
        />
      )}
    </div>
  );
};

export default CategorySelector;
