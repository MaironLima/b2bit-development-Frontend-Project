import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Heart, HeartPlus, HeartMinus, Pencil, Trash2 } from "lucide-react";
import api from "../services/api";
import { useStore } from "../store/store";

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  authorId: number;
  createdAt: string;
  authorName: string;
  likesCount: number;
};

type PostsProps = {
  posts: Post[];
};

function Posts({ posts }: PostsProps) {
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
  const [likesCount, setLikesCount] = useState<{ [key: number]: number }>({});
  const [likeErrorPostId, setLikeErrorPostId] = useState<number | null>(null);

  const { currentId, accessToken, setUpdate } = useStore();

  const { mutate: likeMutation } = useMutation({
    mutationFn: async (postId: number) => {
      const response = await api.post(
        `/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: (data, postId) => {
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: data.liked,
      }));
    },
  });

const { mutate: deletePost } = useMutation({
  mutationFn: async (postId: number) => {
    await api.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  onSuccess: () => {
    setUpdate();
  }
});

  function onDelete(postId: number) {
    deletePost(postId);
  }

  function handleLike(postId: number, initialLikesCount: number) {
    if (!accessToken) {
      setLikeErrorPostId(postId);
      return;
    }

    setLikeErrorPostId(null);

    const isCurrentlyLiked = likedPosts[postId] || false;

    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !isCurrentlyLiked,
    }));

    setLikesCount((prev) => ({
      ...prev,
      [postId]:
        (prev[postId] ?? initialLikesCount) + (isCurrentlyLiked ? -1 : 1),
    }));

    likeMutation(postId);
  }

  return (
    <>
      {[...posts]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((post) => (
          <div
            key={post.id}
            className="global-card global-alternative-border mt-9 pb-2"
          >
            <div className="flex items-center justify-between pl-0 ml-0 mb-5">
              <div className="flex items-center gap-2">
                <h4 className="global-card-title m-0 pointer-events-none">
                  {post.authorName}
                </h4>
                <p className="global-card-extra m-0">
                  @{post.authorName} • {post.createdAt}
                </p>
              </div>
              {currentId === post.authorId && (
                <div>
                  <button
                    className="global-post-icon text-[#eb5757] hover:text-[#d94040]"
                    onClick={() => onDelete(post.id)}
                  >
                    <Trash2 />
                  </button>
                  <button className="global-post-icon hover:text-[#007ed8]">
                    <Pencil />
                  </button>
                </div>
              )}
            </div>
            <div className="mt-0">
              <h3 className="global-card-title tracking-wider mb-1 mt-0">
                {post.title}
              </h3>
              <h4 className="global-card-subtitle mt-0">{post.content}</h4>
            </div>
            <div className="flex justify-center w-full">
              {post.image && (
                <img
                  src={post.image}
                  alt="Posted Image"
                  className="rounded-lg"
                  style={{
                    maxWidth: 700,
                    maxHeight: 700,
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>

            <div className="bg-none mb-0 mt-4 flex items-center gap-2">
              <button
                className={
                  (currentId === post.authorId
                    ? "global-like mb-0 pointer-events-none"
                    : likedPosts[post.id]
                    ? "global-like mb-0 group"
                    : "global-like-unactived mb-0 group")
                }
                onClick={
                  currentId === post.authorId
                    ? undefined
                    : () => handleLike(post.id, post.likesCount)
                }
                tabIndex={currentId === post.authorId ? -1 : 0}
                aria-disabled={currentId === post.authorId}
              >
                <span className="block group-hover:hidden">
                  <Heart />
                </span>
                {currentId === post.authorId ? (
                  <span className="hidden group-hover:block">
                    <HeartMinus />
                  </span>
                ) : !likedPosts[post.id] ? (
                  <span className="hidden group-hover:block">
                    <HeartPlus />
                  </span>
                ) : (
                  <span className="hidden group-hover:block">
                    <HeartMinus />
                  </span>
                )}
              </button>
              <span
                className={
                  (currentId === post.authorId
                    ? "pointer-events-none "
                    : "") +
                  (currentId === post.authorId || likedPosts[post.id]
                    ? "global-like mb-0 -translate-x-2 -translate-y-px"
                    : "global-like-unactived mb-0 -translate-x-2 -translate-y-px")
                }
              >
                {likesCount[post.id] ?? post.likesCount}
              </span>
            </div>

            {likeErrorPostId === post.id && (
              <p className="text-red-500 text-sm mt-2 ml-1">
                Você precisa estar logado para curtir.
              </p>
            )}
          </div>
        ))}
    </>
  );
}

export default Posts;
