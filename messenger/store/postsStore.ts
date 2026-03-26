import { create } from "zustand";

type Post = {
  id: string;
  name: string;
  username: string;
  text: string;
};

type PostsState = {
  posts: Post[];
  addPost: (text: string) => void;
};

export const usePostsStore = create<PostsState>((set) => ({
  posts: [
    {
      id: "1",
      name: "Elon Musk",
      username: "@elonmusk",
      text: "Starship launch coming soon 🚀",
    },
    {
      id: "2",
      name: "Mark Zuckerberg",
      username: "@zuck",
      text: "AI is the future 🤖",
    },
  ],

  addPost: (text) =>
    set((state) => ({
      posts: [
        {
          id: Date.now().toString(),
          name: "Alexander",
          username: "@alex",
          text,
        },
        ...state.posts,
      ],
    })),
}));
