import MDEditor from "@uiw/react-md-editor";
import { Suspense, useEffect } from "react";
import { Await, LoaderFunctionArgs, defer, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Article } from "../../../@types/article";
import { APIError } from "../../../@types/global";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/ArrowLeft.svg";
import { ReactComponent as DeleteOutlined } from "../../../assets/icons/DeleteOutlined.svg";
import { ReactComponent as Edit } from "../../../assets/icons/Edit.svg";
import Squeleton from "../../../components/Squeleton";
import { Button, ButtonGroup } from "../../../components/buttons";
import { Link } from "../../../components/links";
import Modal from "../../../components/modal";
import { useAlert, useModal } from "../../../hooks";
import Layout from "../../../layouts/global";
import { deleteArticleByID, retrieveArticleByID } from "../../../services/articles";
import { retriveUserID } from "../../../utilities/localStorage";

interface ArticleLoadingProps {
  article: Promise<typeof retrieveArticleByID>;
}

interface ArticlePageProps {
  article: Article | APIError;
}


export default function EditArticleLoading() {
  const { article } = useLoaderData() as ArticleLoadingProps;

  useEffect(() => {
    document.title = "Artigo | Tuitui";
  }, []);

  return <Suspense fallback={<div className="w-full h-full flex flex-col items-center"><Squeleton /></div>}>
    <Await
      resolve={article}
      errorElement={<div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
        <p className="text-slate-500">O artigo que você está tentando acessar não existe ou foi removido</p>
        <Link.Default to="/homepage" className="text-sky-500 hover:underline">Voltar para a página inicial</Link.Default>
      </div>}
    >
      {(article: Article | APIError) => <ArticlePage article={article} />}
    </Await>
  </Suspense>;
}

export function ArticlePage({ article }: ArticlePageProps) {
  const loggedUserID = retriveUserID();

  const { toggleVisibility } = useModal();
  const navigate = useNavigate();

  if ('status' in article) {
    return redirect('/auth/login') as unknown as JSX.Element;
  }

  return (
    <Layout>
      <DeleteConfirmationModal articleID={article._id} />
      <div className="w-full h-full flex flex-col items-center">
        <div className="article-card w-full max-w-2xl min-w-[260px] rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
          <nav className="flex items-center gap-2 py-1 mb-2 border-b-2 border-slate-100">
            <Button.Default onClick={() => navigate(-1)} className="w-5 h-5">
              <ArrowLeft />
            </Button.Default>
            <h1>Artigo</h1>
          </nav>
          <header className="flex justify-between">
            <div>
              <h1 className="font-bold">{article.title}</h1>
              <h2 onClick={() => navigate(`/profile/${article.author._id}`)} className="cursor-pointer font-light text-slate-500 hover:underline hover:underline-offset-2">
                {article.author.username}
              </h2>
            </div>
            {loggedUserID === article.author._id && (
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
            )}
          </header>
          <main className="text-justify" data-color-mode="light">
            <MDEditor.Markdown className="" source={article.content} />
          </main>
          <footer className="flex flex-wrap gap-2 mt-2">
            {article.tags?.map((tag) => (
              <Link.Default to={`/homepage?type=tag&search=${tag.tagName}`} key={tag.tagName} className="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-lg text-xs">
                {tag.tagName}
              </Link.Default>
            ))}
          </footer>
        </div>
      </div>
    </Layout>
  );
}

interface DeleteConfirmationModalProps {
  articleID: string;
}

function DeleteConfirmationModal({ articleID }: DeleteConfirmationModalProps) {
  const navigate = useNavigate();
  const { toggleVisibility } = useModal();
  const { updateAlert } = useAlert();

  async function handleDeleteArticle() {
    const response = await deleteArticleByID(articleID);

    if ('status' in response) {
      updateAlert({
        type: 'error',
        message: response.message,
      })
      return;
    }

    updateAlert({
      type: 'success',
      message: 'Artigo excluído com sucesso!',
    })
    toggleVisibility();
    navigate(-1)
  }

  return (
    <Modal onClickBackdropismissModal={false}>
      <Modal.Header>
        <Modal.Title>Confirmar ação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja excluir este artigo?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button.Outline onClick={toggleVisibility}>Cancelar ação</Button.Outline>
        <Button.Danger onClick={handleDeleteArticle}>Sim, excluir!</Button.Danger>
      </Modal.Footer>
    </Modal>
  );
}

export async function loader({ params }: LoaderFunctionArgs): Promise<unknown> {
  const { article_id } = params as { article_id: string };
  const article = retrieveArticleByID(article_id);

  return defer({ article });
}
