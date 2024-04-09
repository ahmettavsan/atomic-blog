import { faker } from "@faker-js/faker";
import { createContext, useContext, useState } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

//1)Create A Context
const BlogContext = createContext();

function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <BlogContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        setSearchQuery: setSearchQuery,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

function useBlogContext() {
  return useContext(BlogContext);
}

export { BlogContext, BlogProvider, useBlogContext };

//Context API
//System to pass data throughout the app without manually
//passing props down the tree.
//Allows us to 'broadcast' global state to the entire app
//1-Provider:gives all child components access to value
//2-Value:Data that we want to make available (usually state and functions)
//3-Consumers:all components that read the provided context value

//when value changed ,all consumers will automatically be re-rendered.
//So all the components that are reading the context value.

//Context api sayesinde componentlerin kullanımındaki bağımlılık azalır çünkü artık onların
//ihtiyacı olan datayı kullanılacağı componentten sağlamak yerine ihtiyacı olan
//dataya kendi içinden erişim sağlayabilir
//!!!!!
