import React, { Suspense } from "react";
import styles from "./mealsPage.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meal/MealsGrid";
import { getAllProducts } from "../../service/action";
import { Skeleton } from "@/components/meal/Skeleton";

export const metadata = {
  title: "All meals ",
};

const Meals = async () => {
  const allMeals = await getAllProducts();
  const meals = allMeals.slice(0, 6);

  return <MealsGrid meals={meals} />;
};
const MealPage = () => {
  return (
    <div>
      <header className={styles.header}>
        <h1>
          Delicious meal created{" "}
          <span className={styles.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook yourself</p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your recipe</Link>
        </p>
      </header>
      <main>
        <Suspense fallback={<Skeleton />}>
          <Meals />
        </Suspense>
      </main>
    </div>
  );
};

export default MealPage;
