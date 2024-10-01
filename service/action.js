"use server";
import fs from "node:fs";
import prisma from "../prisma/prismaClient";
import slugify from "slugify";
import xss from "xss";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const getAllProducts = async () => {
  // await new Promise((res) => setTimeout(res, 2000));
  // throw new Error("error");
  return await prisma.meal.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getMeal = async (slug) => {
  const meal = await prisma.meal.findMany({
    where: {
      slug: slug,
    },
  });
  if (!meal) {
    return notFound();
  }
  return meal;
};

export const saveMeals = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  await prisma.meal.create({
    data: {
      title: meal.title,
      slug: meal.slug,
      summary: meal.summary,
      instructions: meal.instructions,
      image: meal.image,
      creator: meal.creator,
      creator_email: meal.creator_email,
    },
  });
};

const revalidateInputs = (text) => {
  return !text || text.trim() === "";
};
export const formNewMeal = async (previousState, formaData) => {
  const meal = {
    title: formaData.get("title"),
    // slug: formaData.get("title").replace(/\s/g, ""),
    image: formaData.get("image"),
    summary: formaData.get("summary"),
    instructions: formaData.get("instructions"),
    creator: formaData.get("name"),
    creator_email: formaData.get("email"),
  };
  if (
    revalidateInputs(meal.title) ||
    revalidateInputs(meal.summary) ||
    revalidateInputs(meal.instructions) ||
    revalidateInputs(meal.creator) ||
    revalidateInputs(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return { message: "invalid input" };
  }
  saveMeals(meal);
  // redirect("/meals");
  revalidatePath("/meals");
  return {
    message:
      "You have successfully saved the meal. The moderator will add it after checking",
  };
};
