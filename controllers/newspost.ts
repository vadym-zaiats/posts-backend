/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response } from "express";
import { checkPostService } from "../validation/posts";
import { Posts } from "../db/entity/Posts";
import { Users } from "../db/entity/User";
import { AppDataSource } from "../db/data-source";
import {
  ValidationError,
  NewspostsServiceError,
  LoginError,
} from "../services/errorHandler";
import { type DecodedToken } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";

const postRepository = AppDataSource.getRepository(Posts);
const userRepository = AppDataSource.getRepository(Users);

class NewsPostController {
  async getAllPosts(req: Request, res: Response) {
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 2;

    const paginatedPosts = await AppDataSource.manager.find(Posts, {
      relations: ["author"],
      skip,
      take,
    });
    const allPosts = await AppDataSource.manager.find(Posts);

    if (!allPosts) {
      throw new NewspostsServiceError(
        "Помилка на сервері при отриманні усіх постів"
      );
    }

    const allPostsLength = allPosts.length;

    return res.status(200).json({ allPosts: paginatedPosts, allPostsLength });
  }

  async getPostById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const post = await postRepository.find({
      where: { id },
      relations: ["author"],
    });

    if (!post) {
      throw new NewspostsServiceError(
        `Помилка на сервері при отриманні посту по id: ${id}`
      );
    }
    return res.status(200).json(post);
  }

  async createNewPost(req: Request, res: Response) {
    const check: any = checkPostService(req.body);
    if (check?.length > 0) {
      throw new ValidationError(check[0].message);
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new LoginError(check[0].message);
    }

    const decodedData: DecodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, "secret", async (err, decoded: any) => {
        if (err) {
          reject(null);
        } else {
          resolve(decoded);
        }
      });
    });
    const { email } = decodedData;

    const user = await userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new Error("Користувача з таким email не знайдено");
    }

    const { title, text, genre, isPrivate } = req.body;
    const post = new Posts();
    post.title = title;
    post.text = text;
    post.genre = genre;
    post.isPrivate = isPrivate;
    post.author = user;

    await postRepository.save(post);
    return res.status(200).json(post);
  }

  async editPost(req: Request, res: Response) {
    const check: any = checkPostService(req.body);
    if (check?.length > 0) {
      throw new ValidationError(check[0].message);
    }

    const id = parseInt(req.params.id);
    const { title, text, genre, isPrivate } = req.body;
    try {
      const post = await postRepository.findOneOrFail({ where: { id } });

      if (title !== undefined) {
        post.title = title;
      }
      if (text !== undefined) {
        post.text = text;
      }
      if (genre !== undefined) {
        post.genre = genre;
      }
      if (isPrivate !== undefined) {
        post.isPrivate = isPrivate;
      }
      await postRepository.save(post);

      // Повернення оновленого посту
      return res.status(200).json(post);
    } catch (error) {
      throw new NewspostsServiceError(`Посту з ${id} не існує`);
    }
  }

  async deletePost(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await postRepository.findOneOrFail({ where: { id } });

      await postRepository
        .createQueryBuilder()
        .delete()
        .from(Posts)
        .where("id = :id", { id })
        .execute();

      return res.status(200).json({ message: `Пост з id: ${id} видалено` });
    } catch (error) {
      throw new NewspostsServiceError(`Посту з ${id} не існує`);
    }
  }
}

export default new NewsPostController();