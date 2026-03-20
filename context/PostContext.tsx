import React, { createContext, ReactNode, useState } from "react";

type Post = {
  id: string;
  text?: string;
  image?: string | null;
};

type PostContextType = {
  posts: Post[];
  addPost: (post: Post) => void;
};

export const PostContext = createContext<PostContextType | undefined>(
  undefined,
);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}
