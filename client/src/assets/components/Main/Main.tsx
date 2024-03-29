import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import styles from "./main.module.scss";
import { Link } from "react-router-dom";
import { Posts } from "../../../../../server/db/entity/Posts";
import { Card } from "../Card/Card";
import { REGISTER, POSTS, LOGIN } from "../../api/url";
import close from "../../img/close.png";

export function Main() {
  const [posts, setPosts] = useState<
    { allPosts: Posts[]; allPostsLength: number } | undefined
  >();

  const [skip, setSkip] = useState<number>(0);
  const [take] = useState<number>(8);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isReg, setIsReg] = useState<boolean>(false);

  const [isLogedin, setIsLogedin] = useState<boolean>(false);

  // pagination
  async function getPosts(skip: number, take: number): Promise<void> {
    try {
      const res = await fetch(`${POSTS}?skip=${skip}&take=${take}`);
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleNext = () => {
    setSkip((prevState) => prevState + 2);
  };
  const handlePrev = () => {
    if (skip !== 0) {
      setSkip((prevState) => prevState - 2);
    }
  };

  // user login
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });
  const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataLogin({ ...formDataLogin, [name]: value });
  };
  async function login(formDataLogin: object) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLogin),
    };

    try {
      const response = await fetch(LOGIN, requestOptions);
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token);
        setIsLogedin(true);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleSubmitLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    login(formDataLogin);
    setIsOpen(false);
  };

  // user registration
  const [formDataReg, setFormDataReg] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChangeReg = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataReg({ ...formDataReg, [name]: value });
  };
  async function register(formDataReg: object) {
    try {
      const res = await fetch(REGISTER, {
        method: "POST",
        body: JSON.stringify(formDataReg),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Server error");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setIsLogedin(true);
    } catch (error) {
      console.error(error);
    }
  }
  const handleSubmitReg = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(formDataReg);
    setIsReg(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogedin(true);
    }
    getPosts(skip, take);
  }, [skip, take]);

  return (
    <>
      {!isLogedin && (
        <button
          className={`${styles["buttons"]} ${styles["buttons--auth"]}`}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Авторизація
        </button>
      )}
      {isLogedin && (
        <button
          className={`${styles["buttons"]} ${styles["buttons--auth"]}`}
          onClick={() => {
            localStorage.removeItem("token");
            setIsLogedin(false);
          }}
        >
          Вихід з акаунту
        </button>
      )}
      {/* модалка авторизації */}
      {isOpen && (
        <div className={`${styles["modal"]}`}>
          <button
            className={`${styles["modal__close"]}`}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <img src={close} alt="close" width="40px" />
          </button>
          <h2>Авторизація</h2>
          <form onSubmit={handleSubmitLogin}>
            <input
              type="email"
              name="email"
              placeholder="Електронна пошта"
              value={formDataLogin.email}
              onChange={handleChangeLogin}
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formDataLogin.password}
              onChange={handleChangeLogin}
            />
            <button type="submit" className={`${styles["buttons"]}`}>
              Увійти
            </button>
          </form>
          <button
            className={`${styles["buttons"]} ${styles["buttons--reg"]}`}
            onClick={() => {
              setIsOpen(false);
              setIsReg(true);
            }}
          >
            Реєстрація
          </button>
        </div>
      )}
      {/* модалка реєстрації */}
      {isReg && (
        <form onSubmit={handleSubmitReg} className={`${styles["modal"]}`}>
          <button
            className={`${styles["modal__close"]}`}
            onClick={() => {
              setIsReg(false);
            }}
          >
            <img src={close} alt="close" width="40px" />
          </button>
          <h2>Реєстрація</h2>
          <input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            value={formDataReg.email}
            onChange={handleChangeReg}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formDataReg.password}
            onChange={handleChangeReg}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повтор паролю"
            value={formDataReg.confirmPassword}
            onChange={handleChangeReg}
          />
          <button type="submit" className={`${styles["buttons"]}`}>
            Зареєструватись
          </button>
        </form>
      )}
      {isLogedin && (
        <Link to={`/newpost`}>
          <button
            className={`${styles["buttons"]} ${styles["buttons--add-new"]}`}
          >
            Додати новину
          </button>
        </Link>
      )}
      <ul className={`${styles["posts__list"]}`}>
        {posts &&
          posts.allPosts.map((post: Posts) => {
            return <Card key={post.id} post={post} />;
          })}
      </ul>
      {skip !== 0 && (
        <button
          className={`${styles["buttons"]} ${styles["buttons--prev"]}`}
          onClick={handlePrev}
        >
          Назад
        </button>
      )}
      {posts && posts.allPostsLength > skip + take && (
        <button
          className={`${styles["buttons"]} ${styles["buttons--next"]}`}
          onClick={handleNext}
        >
          Далі
        </button>
      )}
    </>
  );
}
