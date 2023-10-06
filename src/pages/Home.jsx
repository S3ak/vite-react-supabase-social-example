import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Link } from "@tanstack/react-router";

import { supabase, addPost } from "../lib/api";

/**
 * @typedef {import('../lib/types.js').PostModel} Post
 */

/**
 * Home Page displays a list of posts
 * @see https://docs.noroff.dev/social-endpoints/posts
 */
export default function HomePage() {
  /** @type {[Post[], React.Dispatch<Data>]} */
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const makeANewPost = async (event) => {
    event.preventDefault();

    const { author_name, title } = event.target.elements;

    const { data, error } = await supabase
      .from("posts")
      .insert([{ name: author_name.value, title: title.value }])
      .select();

    console.log(data, error);

    if (error) {
      setError(error);
      return;
    }

    setPosts((prevPosts) => [...data, ...prevPosts]);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase.from("posts").select();
        console.log(data, error);

        if (error) throw error;

        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { name, title } = event.target.elements;

    addPost({
      name: name.value,
      title: title.value,
    });
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <>
      <h1>Home Page</h1>

      <section>
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <form onSubmit={(event) => makeANewPost(event)}>
            <label htmlFor="author_name">Name</label>
            <input type="text" name="author_name" id="author_name" />
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <button className="text-2xl font-bold" type="submit">
              Make A post
            </button>
          </form>

          {posts.map((post) => (
            <div key={post.id} className="relative group">
              <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={post?.imageSrc ?? faker.image.url()}
                  alt={post?.imageAlt}
                  className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                />
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-sm ">
                    <Link to={`/posts/${post.id}`} search={{ id: post.id }}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {post.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm ">{post.title}</p>
                </div>
                <p className="text-sm font-medium ">{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
          <div className="sm:\mx-auto sm:w-full sm:max-w-sm">
            <img
              className="w-auto h-10 mx-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center ">
              Create a post
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 "
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 "
                  >
                    title
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="current-title"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
