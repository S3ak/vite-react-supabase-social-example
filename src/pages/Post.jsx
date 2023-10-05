import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";

import { fetchPost, likeAPost } from "../lib/api";
import { faker } from "@faker-js/faker";

const initialPostState = {
  title: "No post found",
  body: "Nothing to see here",
  userId: null,
  id: null,
};

/**
 * Displays a single post
 * @see
 */
export default function PostPage() {
  const [post, setPost] = useState(initialPostState);
  const { id } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPost(id);

        setPost(res);
      } catch (error) {
        console.log(error);
        // TIP: Handle errors from the API
      } finally {
        // TIP: Set loading to false
      }
    };

    fetchData();
  }, [id]);

  const lickPost = async () => {
    console.warn("reactioons count", post.reactions);
    try {
      const data = await likeAPost({
        id,
        reactions: post.reactions + 1,
      });
      setPost(data);
    } catch (error) {
      console.warn("Could not update post");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1>A single post</h1>
      <section>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={faker.image.url()} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{post?.title}</h2>
            <p>{post?.body}</p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={lickPost}>
                {post?.reactions} Like
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
