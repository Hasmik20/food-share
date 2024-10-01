import React from "react";
import styles from "./mealsGrid.module.css";
import MealItem from "./MealItem";

const MealsGrid = ({ meals }) => {
  return (
    <ul className={styles.meals}>
      {meals.map((item) => (
        <li key={item.id}>
          <MealItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
