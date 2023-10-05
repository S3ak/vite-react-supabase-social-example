import { createClient } from "@supabase/supabase-js";
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from "./constants";
import { faker } from "@faker-js/faker";

export const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_KEY
);

console.log(supabase);

/**
 * Fetch all posts
 * @returns {Object | Error} - A list of posts
 */
export async function fetchAllPosts() {
  try {
    const { data, error } = await supabase.from("posts").select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Fetch a single post
 * @returns {Object | Error} - A list of posts
 */
export async function fetchPost(id) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id);
    if (error) throw error;
    return data[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function addPost({
  id = crypto.randomUUID(),
  created_at = faker.date.recent(),
  name = faker.person.fullName(),
  title = faker.lorem.sentence(),
  body = faker.lorem.paragraph(),
  userId = crypto.randomUUID(),
  reactions = faker.number.int({ max: 9999 }),
}) {
  try {
    const post = {
      id,
      created_at,
      name,
      title,
      body,
      userId,
      reactions,
    };

    let { data, error } = await supabase
      .from("posts")
      .insert([{ ...post }])
      .single();

    console.log("data >>>>", data);

    if (error) throw error;
  } catch (error) {
    throw new Error(error);
  }
}

export async function likeAPost({ id, reactions }) {
  const { error } = await supabase
    .from("posts")
    .update({ reactions })
    .eq("id", id);

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  console.log("data", data);
  if (error) throw error;

  return data;
}
