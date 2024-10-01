import Image from "next/image";

import { getMeal } from "@/service/action";
import styles from "./items.module.css";
import { notFound } from "next/navigation";

// export const generateMetadata = async ({ params }) => {
//   const meal = getMeal(params.slug);
//   if (!meal) {
//     notFound();
//   }
//   return {
//     title: meal.title,
//     description: meal.summary,
//   };
// };
const MealItemPage = async ({ params }) => {
  const meal = await getMeal(params.slug);

  if (!meal) {
    notFound();
  }
  const instructions = meal[0].instructions.replace(/\n/g, "<br/>");
  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal[0].image} fill alt="img" />
        </div>
        <div className={styles.headerText}>
          <h1>{meal[0].title} </h1>
          <p className={styles.creator}>
            {" "}
            by
            <a href={`mailto:${meal[0].creator_email}`}>
              {meal[0].creator_email}
            </a>
          </p>
          <p className={styles.summary}>{meal[0].summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{ __html: instructions }}
        ></p>
      </main>
    </>
  );
};

export default MealItemPage;
