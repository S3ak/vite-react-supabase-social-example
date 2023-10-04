import { useEffect, useState } from "react";

const initialPostState = {
  title: "No post found",
  body: "Nothing to see here",
  userId: null,
  id: null,
};

/**
 * Displays a single post
 * @see https://docs.noroff.dev/social-endpoints/posts
 */
export default function PostPage() {
  const [post, setPost] = useState(initialPostState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TIP: Get the ID from the search params in the URL
        // TIP: Fetch the post from the API using the ID
        // TIP: Set the post in state
      } catch (error) {
        // TIP: Handle errors from the API
      } finally {
        // TIP: Set loading to false
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>A single post</h1>
      <section>
        <h2>{post?.title}</h2>
      </section>
    </>
  );
}
