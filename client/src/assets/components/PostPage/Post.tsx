import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Posts } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import styles from "../Main/main.module.scss";
import { POSTS, USER } from "../../api/url";

export function PostPage() {
  const [post, setPost] = useState<Posts | undefined>();
  const [author, setAuthor] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);

  const { id } = useParams();

  async function getPost(id: number): Promise<void> {
    try {
      const res = await fetch(`${POSTS}/${id}`);

      if (!res.ok) {
        throw new Error("НЕМАЄ ТАКОГО ПОСТУ");
      }
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function isLogedin(): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(USER, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      setAuthor(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      isLogedin();
    }
    if (id) {
      getPost(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (post && post && post.author && post.author.email) {
      if (author === post.author.email) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    }
  }, [author, post]);

  console.log(post);

  return (
    <>
      {isAuthor && (
        <Link to={`/edit-post/${id}`}>
          <button
            className={`${styles["buttons"]} ${styles["buttons--change-post"]}`}
          >
            Змінити пост
          </button>
        </Link>
      )}

      <Link to={`/`}>
        <button
          className={`${styles["buttons"]} ${styles["buttons--back-to-all"]}`}
        >
          Назад до усіх новин
        </button>
      </Link>
      <div>
        {post && (
          <>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <p>{post.genre}</p>
            <p>isPrivate: {post.isPrivate.toString()}</p>
            <p>email: {post.author.email}</p>
          </>
        )}
      </div>
    </>
  );
}
