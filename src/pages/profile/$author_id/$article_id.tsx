import { Suspense } from "react";
import { Await, useLoaderData, useNavigate, } from "react-router-dom";
import { Article } from "../../../@types/article";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/ArrowLeft.svg";
import { ReactComponent as DeleteOutlined } from "../../../assets/icons/DeleteOutlined.svg";
import { ReactComponent as Edit } from "../../../assets/icons/Edit.svg";
import { Button, ButtonGroup } from "../../../components/buttons";
import { Link } from "../../../components/links";
import Modal from "../../../components/modal";
import { useModal } from "../../../hooks/useModal";
import Layout from "../../../layouts/global";

interface ArticlePagePropsProps {
  asyncArticle: Promise<Article>;
}

export default function ArticlePage() {
  const { asyncArticle } = useLoaderData() as ArticlePagePropsProps;

  const { toggleVisibility } = useModal();
  const navigate = useNavigate();

  return (
    <Layout>
      <DeleteConfirmationModal />
      <div className="w-full h-full flex flex-col bg-gray-200 items-center">
        <div className="article-card w-full max-w-2xl min-w-[260px] rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
          <nav className="flex items-center gap-2 py-1 mb-2 border-b-2 border-slate-100">
            <Button.Default onClick={() => navigate(-1)} className="w-5 h-5">
              <ArrowLeft />
            </Button.Default>
            <h1>Artigo</h1>
          </nav>
          <Suspense fallback={<div>Carregando...</div>}>
            <Await
              resolve={asyncArticle}
              errorElement={<div>Could not load Article 😬</div>}
            >
              {(article: Article) => (
                <>
                  <header className="flex justify-between">
                    <div>
                      <h1 className="font-bold">{article.title}</h1>
                      <h2 onClick={() => navigate(`/profile/${article.author._id}`)} className="cursor-pointer font-light text-slate-500 hover:underline hover:underline-offset-2">
                        {article.author.username}
                      </h2>
                    </div>
                    <ButtonGroup className="py-2">
                      <Link to={`/profile/${article.author._id}/${article._id}/edit`}>
                        <Edit />
                        Editar
                      </Link>
                      <Button.Danger onClick={toggleVisibility}>
                        <DeleteOutlined />
                        Excluir
                      </Button.Danger>
                    </ButtonGroup>
                  </header>
                  <main className="text-justify">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard dummy text
                      ever since
                    </p>
                  </main>
                  <footer className="flex flex-wrap gap-2 mt-2">
                    {article.tags?.map((tag) => (
                      <Link.Default to={`/homepage?tag=${tag.tagName}`} key={tag.tagName} className="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-lg text-xs">
                        {tag.tagName}
                      </Link.Default>
                    ))}
                  </footer>
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}

function DeleteConfirmationModal() {
  const { toggleVisibility } = useModal();

  return (
    <Modal onClickFaceDismiss={false}>
      <Modal.Header>
        <Modal.Title>Confirmar ação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja excluir este artigo?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleVisibility}>Cancelar ação</Button>
        <Button.Danger>Sim, excluir!</Button.Danger>
      </Modal.Footer>
    </Modal>
  );
}

async function getArticles(): Promise<Article> {
  return {
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
}

export async function loader(): Promise<ArticlePagePropsProps> {
  const asyncArticle = getArticles();

  return { asyncArticle };
}
