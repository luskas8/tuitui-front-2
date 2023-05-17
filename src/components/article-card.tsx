import { Article } from "../@types/article";
import { ReactComponent as CaretRight } from "../assets/icons/CaretRight.svg";
import { Link } from "./links";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <li className="article-card list-none w-full rounded shadow-lg px-6 py-4 bg-white">
      <header className="flex justify-between">
        <div>
          <h1 className="font-bold">{article.title}</h1>
          <Link.Default to={`/profile/${article.author._id}`} className="font-light text-slate-500 hover:underline hover:underline-offset-2">
            {article.author.username}
          </Link.Default>
        </div>
        <div>
          <Link to={`/profile/${article.author._id}/${article._id}`}>
            <CaretRight />
            Ler mais
          </Link>
        </div>
      </header>
      <main className="w-full min-h-10 max-h-48 sm:max-h-24 overflow-hidden text-ellipsis relative after:bg-gradient-to-t after:from-white after:absolute after:pointer-events-none after:w-full after:h-full after:top-0 after:left-0">
        <div className=" h-full text-ellipsis text-justify">
          {article?.content}
        </div>
      </main>
    </li>
  );
}
