import React, { useState, useEffect } from 'react';
import { NavLink } from '@mantine/core';
import { fetchCategories } from '../../services/categoryService';
import { Link, useLocation } from 'react-router-dom';
import { IconCategory } from '@tabler/icons-react';

function CategoryMenu() {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <NavLink
          key={category.id}
          component={Link}
          to={`/category/${category.id}`}
          label={category.name}
          active={location.pathname === `/category/${category.id}`}
          leftSection={<IconCategory size="1rem" stroke={1.5} />}
          childrenOffset={28}
        >
          {category.subCategories.map((subCategory) => (
            <NavLink
              key={subCategory.id}
              component={Link}
              to={`/communities/${subCategory.id}`}
              label={subCategory.name}
              active={location.pathname === `/communities/${subCategory.id}`}
            />
          ))}
        </NavLink>
      ))}
    </>
  );
}

export default CategoryMenu;
