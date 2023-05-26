import { useEffect, useRef, useState } from "react";
import { LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Article } from "../../../../@types/article";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/ArrowLeft.svg";
import { ReactComponent as CheckCircle } from "../../../../assets/icons/Check-Circle.svg";
import { ReactComponent as Close } from "../../../../assets/icons/Close.svg";
import { Button, ButtonGroup } from "../../../../components/buttons";
import Layout from "../../../../layouts/global";
import { retrieveArticleByID, saveArticleInformations } from "../../../../services/articles";
import { retriveUserID } from "../../../../utilities/localStorage";
import { useAuth } from "../../../../hooks";

interface ArticlePagePropsProps {
  article: Article;
}

export default function EditArticlePage() {
  const { article } = useLoaderData() as ArticlePagePropsProps;
  const { authenticated } = useAuth();

  if (!authenticated) {
    return redirect("/auth/login");
  }

  const [articleInfo, setArticleInfo] = useState<Article>(article);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function tagInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const newTag = event.currentTarget.value;
      const newArticle = articleInfo;

      newArticle.tags?.push({ tagName: newTag });

      setArticleInfo((prev) => ({
        ...prev,
        ...newArticle,
      }));
      event.currentTarget.value = "";

      saveArticleInformations(newArticle);
    }
  }

  const handleTagDelete = (tagName: string) => (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newArticle = articleInfo;

    newArticle.tags = newArticle.tags?.filter((tag) => tag.tagName !== tagName);

    setArticleInfo((prev) => ({
      ...prev,
      ...newArticle,
    }));

    saveArticleInformations(newArticle);
  }

  useEffect(() => {
    // console.log(inputRef.current)
  }, [])

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center">
        <div className="article-card w-full max-w-2xl min-w-[260px] rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
          <nav className="flex items-center gap-2 py-1 mb-2 border-b-2 border-slate-100">
            <Button.Default onClick={() => navigate(-1)} className="w-5 h-5">
              <ArrowLeft />
            </Button.Default>
            <h1>Editando artigo</h1>
          </nav>
          <header className="flex flex-wrap justify-between items-center">
            <div>
              <input className="font-bold hover:bg-slate-100 px-2 py-1 rounded-lg" placeholder="+ Adicionar tag" value={articleInfo.title} type="text" />
            </div>
            <ButtonGroup className="py-2">
              <Button.Danger onClick={() => navigate(-1)}>
                <Close />
                Cancelar
              </Button.Danger>
              <Button.Success>
                <CheckCircle />
                Salvar
              </Button.Success>
            </ButtonGroup>
          </header>
          <main className="text-justify">
            <textarea
              className="w-full h-64 hover:bg-slate-100 rounded-lg px-2 py-1"
              value={articleInfo.content}
            />
            <div className="text-xs text-slate-400">Escreva até um máximo de 5000 caractéres</div>
          </main>
          <footer className="flex flex-wrap gap-2 mt-4">
            {articleInfo.tags?.map((tag) => (
              <Button.Default
                onClick={handleTagDelete(tag.tagName)} key={tag.tagName}
                className="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-lg text-xs flex items-center gap-1"
              >
                {tag.tagName}
                <Close className="w-2" />
              </Button.Default>
            ))}

            <input onKeyDown={tagInputKeyDown} className="text-xs hover:bg-slate-100 px-2 py-1 rounded-lg" placeholder="+ Adicionar tag" ref={inputRef} type="text" />
          </footer>
        </div>
      </div>
    </Layout>
  );
}

export async function loader({ params }: LoaderFunctionArgs): Promise<ArticlePagePropsProps> {
  const loggedUserID = retriveUserID();
  const { article_id } = params as { article_id: string };
  const article = await retrieveArticleByID(article_id);

  if ('status' in article) {
    return redirect("/auth/login") as unknown as ArticlePagePropsProps;
  }

  if (loggedUserID !== article.author._id) {
    return redirect("/homepage") as unknown as ArticlePagePropsProps;
  }

  return { article };
}
