import React, { createContext, ReactNode, useEffect, useState } from "react";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/config/firebase";

type Post = {
  id: string;
  userId: string;
  text?: string;
  image?: string | null;
};

type PostContextType = {
  posts: Post[];
  addPost: (post: Omit<Post, "id">) => Promise<void>;
};

export const PostContext = createContext<PostContextType | undefined>(
  undefined,
);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData: Post[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">),
      }));

      setPosts(postsData);
    });

    return unsubscribe;
  }, []);

  const addPost = async (post: Omit<Post, "id">) => {
    await addDoc(collection(db, "posts"), {
      ...post,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}
