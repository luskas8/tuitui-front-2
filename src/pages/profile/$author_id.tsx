import { Suspense, useEffect } from "react";
import { Await, LoaderFunctionArgs, Navigate, defer, redirect, useLoaderData } from "react-router-dom";
import { Article } from "../../@types/article";
import { APIError } from "../../@types/global";
import { User } from "../../@types/user";
import Squeleton from "../../components/Squeleton";
import ArticlesList from "../../components/articles-list";
import AuthorHeader from "../../components/author-header";
import Layout from "../../layouts/global";
import { retrieveArticlesByAuthorID } from "../../services/articles";
import { retrieveUserByID } from "../../services/user";


interface ArticleLoadingProps {
  author: Promise<typeof retrieveUserByID>;
  articles: Promise<typeof retrieveArticlesByAuthorID>;
}

interface AuthorHeaderLoadingProps {
  author: User | APIError;
}

interface AuthorArticlesLoadingProps {
  articles: Article[] | APIError;
}

export default function AuthorPage() {
  useEffect(() => {
    document.title = "Página de perfil | Tuitui";
  }, []);

  const { articles, author } = useLoaderData() as ArticleLoadingProps;
  return (
    <Layout>
      <header className="flex flex-col items-center max-w-2xl min-w-[260px] mx-auto">
        <Suspense fallback={<Squeleton blocks={1} />}>
          <Await
            resolve={author}
            errorElement={
              <Navigate to="/auth/login" replace={true} />
            }
          >
            {(author: User | APIError) => <AuthorHeaderLoading author={author} />}
          </Await>
        </Suspense>
      </header>
      <main className="flex justify-center max-w-2xl min-w-[260px] mx-auto mt-5">
        <Suspense fallback={<Squeleton />}>
            <Await
              resolve={articles}
              errorElement={
                <Navigate to="/auth/login" replace={true} />
              }
            >
              {(articles: Article[] | APIError) => <AuthorArticlesLoading articles={articles} />}
            </Await>
        </Suspense>
      </main>
    </Layout>
  );
}

export function AuthorHeaderLoading({ author }: AuthorHeaderLoadingProps) {
  if ('status' in author) {
    return redirect('/auth/login') as unknown as JSX.Element;
  }

  return <AuthorHeader author={author} />
}

function AuthorArticlesLoading({ articles }: AuthorArticlesLoadingProps) {
  if ('status' in articles) {
    return redirect('/auth/login') as unknown as JSX.Element;
  }

  return <ArticlesList title="Seus artigos" articles={articles} />
}

export async function loader({ params }: LoaderFunctionArgs): Promise<unknown> {
  const { author_id } = params as { author_id: string };
  const author = retrieveUserByID(author_id);
  const articles = retrieveArticlesByAuthorID(author_id);

  return defer({ articles, author });
}
