import styles from "./card.module.scss";
import { Link } from "react-router-dom";
import { Posts } from "../../../../../server/db/entity/Posts";

export function Card({ post }: { post: Posts }) {
  return (
    <Link className={`${styles["card__link"]}`} to={`/post/${post.id}`}>
      <li className={`${styles["card__item"]}`}>
        <h3>{post.title}</h3>
        <p className={`${styles["card__text"]}`}>{post.text}</p>
        <p className={`${styles["card__text"]}`}>{post.genre}</p>
        <p className={`${styles["card__text"]}`}>
          isPrivate: {post.isPrivate.toString()}
        </p>
        <p>email: {post.author.email}</p>
      </li>
    </Link>
  );
}
