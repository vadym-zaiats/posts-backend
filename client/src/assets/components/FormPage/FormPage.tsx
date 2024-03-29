import styles from "./formPage.module.scss";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UpdatedData } from "../../../../../server/interfaces/interfaces";
import { Posts } from "../../interfaces/interfaces";
import { POSTS } from "../../api/url";
import image from "../../img/close.png";
import { useNavigate } from "react-router-dom";

export function FormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Posts | undefined>();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  async function getPost(id: number): Promise<void> {
    try {
      const res = await fetch(`${POSTS}/${id}`);
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePost(
    id: number,
    updPostData: UpdatedData
  ): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${POSTS}/${id}`, {
        method: "PUT",
        body: JSON.stringify(updPostData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function createPost(newPostData: UpdatedData): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(POSTS, {
        method: "POST",
        body: JSON.stringify(newPostData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function deletePost(id: number): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${POSTS}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id) {
      getPost(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setText(post.text);
      setGenre(post.genre);
      setIsPrivate(post.isPrivate);
    }
  }, [post]);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleChangeGenre = (e: ChangeEvent<HTMLInputElement>) => {
    setGenre(e.target.value);
  };

  const handleChangeSetIsPrivate = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // PUT запит
    if (id && title && text && genre) {
      updatePost(Number(id), {
        title,
        text,
        genre,
        isPrivate,
      });
    }
    // POST запит
    if (id === undefined && title && text && genre) {
      await createPost({ title, text, genre, isPrivate });
    }
    navigate("/");
  };

  const handleDelete = async () => {
    await deletePost(Number(id));
    navigate("/");
  };

  return (
    <>
      <Link to={`/`}>
        <button className={styles[`form__button`]}>Назад до усіх новин</button>
      </Link>
      <form className={styles[`form__body`]} onSubmit={handleSubmit}>
        <h2>{id ? "Зміна посту" : "Створити новий пост"}</h2>
        {id && (
          <img
            onClick={() => {
              handleDelete();
            }}
            className={`${styles["delete-img"]}`}
            src={image}
            alt="delete"
            width="26px"
          />
        )}
        <div className={`${styles["form__item"]}`}>
          <label>Заголовок</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          />
        </div>
        <div className={`${styles["form__item"]}`}>
          <label>Текст</label>
          <input
            type="text"
            id="text"
            name="text"
            value={text}
            onChange={handleChangeText}
          />
        </div>
        <div className={`${styles["form__item"]}`}>
          <label>Жанр</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={handleChangeGenre}
          />
        </div>
        <div className={`${styles["form__item"]}`}>
          <label>
            {id ? "Чи має бути Private?" : "Відмітити якщо Private"}
          </label>
          <input
            type="checkbox"
            id="isPrivate"
            name="isPrivate"
            checked={isPrivate}
            onChange={handleChangeSetIsPrivate}
          />
        </div>
        <button className={styles[`form__button`]} type="submit">
          {id ? "Зберегти зміни" : "Створити новину"}
        </button>
      </form>
    </>
  );
}
