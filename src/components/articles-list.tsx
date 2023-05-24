import { Article } from "../@types/article";
import ArticleCard from "./article-card";

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
  return (
    <section className="w-full">
      {title && <h1 className="article-list--title text-lg font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl">{title}</h1>}
      <ul className="article-list--items w-full h-full flex flex-col items-center overflow-hidden overflow-y-auto">
        { articles.map((article) => (<ArticleCard key={article._id} article={article} />) )}
      </ul>
    </section>
  );
}
