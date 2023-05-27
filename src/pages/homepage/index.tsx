import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { Article, ArticleListLoaderProps } from "../../@types/article";
import ArticlesList from "../../components/articles-list";
import Layout from "../../layouts/global";
import { useAuth } from "../../hooks";
import { retrieveArticlesByAuthorID, retrieveArticlesByAuthorName, retrieveArticlesByTagName } from "../../services/articles";
import { retriveUserID } from "../../utilities/localStorage";
import { APIError } from "../../@types/global";

interface HomepageLoaderProps extends ArticleListLoaderProps {
  title: string;
}

export default function Homepage() {
  const { articles, title } = useLoaderData() as HomepageLoaderProps;
  const { authenticated } = useAuth();

  if (!authenticated) {
    redirect("/auth/login")
  }

  return (
    <Layout>
      <main className="flex mx-auto w-full max-w-2xl min-w-[260px]">
        <ArticlesList title={title} articles={articles} />
      </main>
    </Layout>
  );
}

export async function loader({ request }: LoaderFunctionArgs): Promise<HomepageLoaderProps> {
  const userID = retriveUserID();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const search = searchParams.get("search");

  if (!userID) {
    return redirect("/auth/login") as unknown as HomepageLoaderProps;
  }

  if (type && search) {
    let response: Article[] | APIError = []

    if (type === "tag") {
      response = await retrieveArticlesByTagName(search);
    } else {
      response = await retrieveArticlesByAuthorName(search);
    }

    if ('status' in response) {
      return redirect("/auth/login") as unknown as HomepageLoaderProps;
    }

    return { title: "Artigos encontrados", articles: response }
  }

  const articles = await retrieveArticlesByAuthorID(userID);

  if ('status' in articles) {
    return redirect("/auth/login") as unknown as HomepageLoaderProps;
  }
  return { title: "Seus artigos", articles }
}
