import { Await, LoaderFunctionArgs, defer, redirect, useLoaderData } from "react-router-dom";
import { Article } from "../../@types/article";
import ArticlesList from "../../components/articles-list";
import Layout from "../../layouts/global";
import { useAuth } from "../../hooks";
import { retrieveArticles, retrieveArticlesByAuthorName, retrieveArticlesByTagName } from "../../services/articles";
import { retriveUserID } from "../../utilities/localStorage";
import { APIError } from "../../@types/global";
import { Suspense, useEffect } from "react";
import Squeleton from "../../components/Squeleton";

interface HomepageLoaderProps {
  title: string;
  articles: Promise<Article[] | APIError>;
}

interface ArticlesListLoadingProps {
  title: string;
  articles: Article[] | APIError;
}

export default function Homepage() {
  const { articles, title } = useLoaderData() as HomepageLoaderProps;
  const { authenticated } = useAuth();

  if (!authenticated) {
    redirect("/auth/login")
  }

  useEffect(() => {
    document.title = "Página inicial | Tuitui";
  }, []);

  return (
    <Layout>
      <main className="flex mx-auto w-full max-w-2xl min-w-[260px]">
        <Suspense fallback={<Squeleton />}>
            <Await resolve={articles}>
              {(articles: Article[] | APIError) => <ArticlesListLoading articles={articles} title={title} />}
            </Await>
        </Suspense>
      </main>
    </Layout>
  );
}

function ArticlesListLoading({ title, articles }: ArticlesListLoadingProps) {
  if ('status' in articles) {
    return redirect('/auth/login') as unknown as JSX.Element;
  }

  return <ArticlesList title={title} articles={articles} />
}

export async function loader({ request }: LoaderFunctionArgs): Promise<unknown> {
  const userID = retriveUserID();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const search = searchParams.get("search");

  if (!userID) {
    return redirect("/auth/login") as unknown as HomepageLoaderProps;
  }

  if (type && search) {
    let response: Promise<Article[] | APIError>;

    if (type === "tag") {
      response = retrieveArticlesByTagName(search);
    } else {
      response = retrieveArticlesByAuthorName(search);
    }

    if ('status' in response) {
      return redirect("/auth/login") as unknown as HomepageLoaderProps;
    }

    return { title: "Artigos encontrados", articles: response }
  }

  const articles = retrieveArticles();

  if ('status' in articles) {
    return redirect("/auth/login") as unknown as HomepageLoaderProps;
  }
  return defer({ title: "Últimos artigos", articles: articles });
}
