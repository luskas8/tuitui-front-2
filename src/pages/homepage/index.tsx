import { redirect, useLoaderData } from "react-router-dom";
import { Article, ArticleListLoaderProps } from "../../@types/article";
import ArticlesList from "../../components/articles-list";
import Layout from "../../layouts/global";
import { useAuth } from "../../hooks";
import { retrieveArticlesByAuthorID } from "../../services/articles";
import { retriveUserID } from "../../utilities/localStorage";

export default function Homepage() {
  const { articles } = useLoaderData() as ArticleListLoaderProps;
  const { authenticated } = useAuth();

  if (!authenticated) {
    redirect("/auth/login")
  }

  return (
    <Layout>
      <main className="flex mx-auto w-full max-w-2xl min-w-[260px]">
        <ArticlesList articles={articles} />
      </main>
    </Layout>
  );
}

export async function loader(): Promise<ArticleListLoaderProps> {
  const userID = retriveUserID();
  const articles: Article[] = await retrieveArticlesByAuthorID(userID!) as Article[];
  return { articles }
}
