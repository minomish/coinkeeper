import React, { useState } from 'react';
import { FaHome, FaMoneyBillAlt, FaShoppingCart, FaUtensils, FaCar, FaBeer, FaHeart, FaEnvelope, FaUser, FaMusic, FaGlobe, FaFilm, FaBook, FaLaptop, FaDesktop, FaCamera, FaGamepad, FaTv, FaAppleAlt, FaCoffee } from 'react-icons/fa';
import './CategoryManager.css';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: FaHome,
    color: '#3498db', // Изменил цвет по умолчанию на более приятный
  });
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);

  // Массив иконок с компонентами и названиями
  const icons = [
    { id: 1, icon: <FaHome />, name: 'Home', component: FaHome },
    { id: 2, icon: <FaMoneyBillAlt />, name: 'Money', component: FaMoneyBillAlt },
    { id: 3, icon: <FaShoppingCart />, name: 'Shopping', component: FaShoppingCart },
    { id: 4, icon: <FaUtensils />, name: 'Food', component: FaUtensils },
    { id: 5, icon: <FaCar />, name: 'Car', component: FaCar },
    { id: 6, icon: <FaBeer />, name: 'Beer', component: FaBeer },
    { id: 7, icon: <FaHeart />, name: 'Health', component: FaHeart },
    { id: 8, icon: <FaEnvelope />, name: 'Mail', component: FaEnvelope },
    { id: 9, icon: <FaUser />, name: 'User', component: FaUser },
    { id: 10, icon: <FaMusic />, name: 'Music', component: FaMusic },
    { id: 11, icon: <FaGlobe />, name: 'Travel', component: FaGlobe },
    { id: 12, icon: <FaFilm />, name: 'Entertainment', component: FaFilm },
    { id: 13, icon: <FaBook />, name: 'Education', component: FaBook },
    { id: 14, icon: <FaLaptop />, name: 'Electronics', component: FaLaptop },
    { id: 15, icon: <FaDesktop />, name: 'Computer', component: FaDesktop },
    { id: 16, icon: <FaCamera />, name: 'Photo', component: FaCamera },
    { id: 17, icon: <FaGamepad />, name: 'Games', component: FaGamepad },
    { id: 18, icon: <FaTv />, name: 'TV', component: FaTv },
    { id: 19, icon: <FaAppleAlt />, name: 'Fruits', component: FaAppleAlt },
    { id: 20, icon: <FaCoffee />, name: 'Coffee', component: FaCoffee },
  ];

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.icon) {
      setCategories([...categories, newCategory]);
      setNewCategory({ name: '', icon: FaHome, color: '#3498db' });
      setShowIconPicker(false);
    }
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleEditCategory = (index) => {
    setEditing(true);
    setEditingIndex(index);
    setNewCategory(categories[index]);
    setShowIconPicker(false);
  };

  const handleUpdateCategory = () => {
    const updatedCategories = [...categories];
    updatedCategories[editingIndex] = newCategory;
    setCategories(updatedCategories);
    setEditing(false);
    setNewCategory({ name: '', icon: FaHome, color: '#3498db' });
    setShowIconPicker(false);
  };

  const toggleIconPicker = () => {
    setShowIconPicker(!showIconPicker);
  };

  const selectIcon = (iconComponent) => {
    setNewCategory({ ...newCategory, icon: iconComponent });
    // Не закрываем пикер сразу, чтобы пользователь мог видеть выбор
  };

  // Находим выбранную иконку для отображения
  const selectedIcon = icons.find(icon => icon.component === newCategory.icon);

  return (
    <div className="category-manager">
      <h2>Управление категориями</h2>
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item" style={{ borderLeft: `5px solid ${category.color}` }}>
            <div className="category-icon" style={{ color: category.color }}>
              {category.icon}
            </div>
            <div className="category-info">
              <span>{category.name}</span>
            </div>
            <div className="category-actions">
              <button onClick={() => handleEditCategory(index)}>
                Редактировать
              </button>
              <button onClick={() => handleDeleteCategory(index)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="category-form">
        <h3>{editing ? 'Редактировать категорию' : 'Добавить категорию'}</h3>
        <div className="form-group">
          <label>Название категории</label>
          <input
            type="text"
            placeholder="Введите название"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Иконка</label>
          <div className="icon-selector">
            <button type="button" onClick={toggleIconPicker} className="icon-picker-toggle">
              {selectedIcon ? (
                <span className="selected-icon">
                  {selectedIcon.icon}
                  <span className="icon-name">{selectedIcon.name}</span>
                </span>
              ) : (
                'Выбрать иконку'
              )}
            </button>
            
            {showIconPicker && (
              <div className="icon-picker-container">
                <div className="icon-picker">
                  {icons.map((iconObj) => (
                    <button
                      key={iconObj.id}
                      onClick={() => selectIcon(iconObj.component)}
                      className={`icon-option ${newCategory.icon === iconObj.component ? 'selected' : ''}`}
                      title={iconObj.name}
                    >
                      {iconObj.icon}
                    </button>
                  ))}
                </div>
                <button 
                  type="button" 
                  className="confirm-icon-btn"
                  onClick={() => setShowIconPicker(false)}
                >
                  Готово
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Цвет</label>
          <div className="color-picker">
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
            />
            <span className="color-value">{newCategory.color}</span>
          </div>
        </div>

        <div className="form-actions">
          <button 
            onClick={editing ? handleUpdateCategory : handleAddCategory}
            disabled={!newCategory.name}
            className="save-btn"
          >
            {editing ? 'Обновить категорию' : 'Добавить категорию'}
          </button>
          
          {editing && (
            <button 
              onClick={() => {
                setEditing(false);
                setNewCategory({ name: '', icon: FaHome, color: '#3498db' });
              }}
              className="cancel-btn"
            >
              Отмена
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;