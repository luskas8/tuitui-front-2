import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { ArticleListLoaderProps } from "../../@types/article";
import { User } from "../../@types/user";
import ArticlesList from "../../components/articles-list";
import AuthorHeader from "../../components/author-header";
import Layout from "../../layouts/global";
import { retrieveArticlesByAuthorID } from "../../services/articles";
import { retrieveUserByID } from "../../services/user";

interface AuthorPageProps extends ArticleListLoaderProps {
  author: User;
}

export default function AuthorPage() {
  const { articles, author } = useLoaderData() as AuthorPageProps;
  return (
    <Layout>
      <header className="flex flex-col items-center max-w-2xl min-w-[260px] mx-auto">
        <AuthorHeader
          author={author}
        />
      </header>
      <main className="flex justify-center max-w-2xl min-w-[260px] mx-auto mt-5">
        <ArticlesList title="Artigos" articles={articles} />
      </main>
    </Layout>
  );
}

export async function loader({ params }: LoaderFunctionArgs): Promise<AuthorPageProps> {
  const { author_id } = params as { author_id: string };
  const author = await retrieveUserByID(author_id);

  if ('status' in author) {
    return redirect('/auth/login') as unknown as AuthorPageProps;
  }

  const articles = await retrieveArticlesByAuthorID(author_id);

  if ('status' in articles) {
    return redirect('/auth/login') as unknown as AuthorPageProps;
  }

  return { articles, author }
}
