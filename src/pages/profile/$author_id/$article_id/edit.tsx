import { useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Article } from "../../../../@types/article";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/ArrowLeft.svg";
import { ReactComponent as CheckCircle } from "../../../../assets/icons/Check-Circle.svg";
import { ReactComponent as Close } from "../../../../assets/icons/Close.svg";
import { Button, ButtonGroup } from "../../../../components/buttons";
import Layout from "../../../../layouts/global";

interface ArticlePagePropsProps {
  article: Article;
}

export default function EditArticlePage() {
  const { article } = useLoaderData() as ArticlePagePropsProps;

  let inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
              <input className="font-bold hover:bg-slate-100 px-2 py-1 rounded-lg" placeholder="+ Adicionar tag" value={article.title} type="text" />
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
              value={article.content}
            />
            <div className="text-xs text-slate-400">Escreva até um máximo de 5000 caractéres</div>
          </main>
          <footer className="flex flex-wrap gap-2 mt-4">
            {article.tags?.map((tag) => (
              <Button.Default
                onClick={() => {}} key={tag.tagName}
                className="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-lg text-xs flex items-center gap-1"
              >
                {tag.tagName}
                <Close className="w-2" />
              </Button.Default>
            ))}

            <input className="text-xs hover:bg-slate-100 px-2 py-1 rounded-lg" placeholder="+ Adicionar tag" ref={inputRef} type="text" />
          </footer>
        </div>
      </div>
    </Layout>
  );
}

export async function loader(): Promise<ArticlePagePropsProps> {
  const article = {
    title: "Hello World",
    _id:"434324",
    author: {
      _id: "48384",
      username: "luskas8"
    },
    content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    tags: [
      { tagName: "desenvolvimento" },
      { tagName: "tencnologia" },
      { tagName: "hi-tec" },
      { tagName: "folclore" },
      { tagName: "brasil" },
      { tagName: "estrangeiro" },
      { tagName: "geografia" },
      { tagName: "histório" },
      { tagName: "Muzy" },
      { tagName: "Roberto Cariani" },
      { tagName: "musculação" },
      { tagName: "academia" },
    ]
  }

  return { article };
}
