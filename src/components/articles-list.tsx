import { Article } from "../@types/article";
import { retriveUserID } from "../utilities/localStorage";
import ArticleCard from "./article-card";
import { Link } from "./links";

interface ArticlesListProps {
  title?: string;
  articles: Article[];
}

// TODO: Add pagination
// TODO: Add infinite scroll
// TODO: Add search
// TODO: Add filter
// TODO: Add no content

export default function ArticlesList({ title, articles }: ArticlesListProps) {
  const hasArticles = articles.length > 0;
  const loggedUser = retriveUserID();

  const reversedArticles = [...articles].reverse();

  return (
    <section className="w-full">
      {title && <h1 className="article-list--title text-lg font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl">{title}</h1>}
      <ul className="article-list--items w-full h-full flex flex-col items-center overflow-hidden overflow-y-auto">
        {!hasArticles && <div className="w-full h-[250px] flex flex-col justify-center items-center bg-slate-50 rounded-md">
          <h2 className="text-black text-xl font-bold">Nenhum artigo encontrado</h2>
          <p className="text-gray-500">Que tal criar um hein? <Link.Default to={`/profile/${loggedUser}/create`}>bora lá!</Link.Default></p>
        </div>}
        {reversedArticles.map((article) => (<ArticleCard key={article._id} article={article} />) )}
      </ul>
    </section>
  );
}
