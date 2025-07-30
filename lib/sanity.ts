import { createClient } from "@sanity/client";
import { groq } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-02-18",
  useCdn: true,
});

export const getPosts = async () => {
  const posts = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      "mainImage": mainImage.asset->url,
      tags[]->{
        name,
        slug
      },
      categories[]->{
        title,
        slug
      }
    }`
  );
  return posts;
};

export const getPost = async (slug: string) => {
  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      "mainImage": mainImage.asset->url,
      body,
      tags[]->{
        name,
        slug
      },
      categories[]->{
        title,
        slug
      },
      "relatedPosts": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc) [0...3] {
        title,
        slug,
        "mainImage": mainImage.asset->url,
        publishedAt,
        tags[]->{
          name,
          slug
        },
        categories[]->{
          title,
          slug
        }
      }
    }`,
    { slug }
  );
  return post;
};

export const getRecentPosts = async () => {
  const posts = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      publishedAt,
      "mainImage": mainImage.asset->url,
    }`
  );
  return posts;
};
