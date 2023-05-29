import { Article } from "../@types/article";
import { ReactComponent as CaretRight } from "../assets/icons/CaretRight.svg";
import { Link } from "./links";
import MDEditor from "@uiw/react-md-editor";

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
      {/* relative after:bg-gradient-to-t after:from-white after:z-10 after:absolute after:pointer-events-none after:w-full after:h-full after:top-0 after:left-0 */}
      <main className="w-full min-h-10 max-h-48 sm:max-h-24 overflow-hidden text-ellipsis">
        <div className="h-full text-ellipsis text-justify" data-color-mode="light">
          <MDEditor.Markdown className="" source={article.content} />
        </div>
      </main>
      <footer className="flex flex-wrap gap-2 mt-2">
        {article.tags?.map((tag) => (
          <Link.Default to={`/homepage?type=tag&search=${tag.tagName}`} key={tag.tagName} className="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-lg text-xs">
            {tag.tagName}
          </Link.Default>
        ))}
      </footer>
    </li>
  );
}
