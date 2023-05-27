import { LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Article } from "../../../@types/article";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/ArrowLeft.svg";
import { ReactComponent as DeleteOutlined } from "../../../assets/icons/DeleteOutlined.svg";
import { ReactComponent as Edit } from "../../../assets/icons/Edit.svg";
import { Button, ButtonGroup } from "../../../components/buttons";
import { Link } from "../../../components/links";
import Modal from "../../../components/modal";
import { useModal } from "../../../hooks";
import Layout from "../../../layouts/global";
import { retrieveArticleByID } from "../../../services/articles";
import { retriveUserID } from "../../../utilities/localStorage";
import MDEditor from "@uiw/react-md-editor";

interface ArticlePagePropsProps {
  article: Article;
}

export default function ArticlePage() {
  const loggedUserID = retriveUserID();
  const { article } = useLoaderData() as ArticlePagePropsProps;

  const { toggleVisibility } = useModal();
  const navigate = useNavigate();

  return (
    <Layout>
      <DeleteConfirmationModal />
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
        <Button.Outline onClick={toggleVisibility}>Cancelar ação</Button.Outline>
        <Button.Danger>Sim, excluir!</Button.Danger>
      </Modal.Footer>
    </Modal>
  );
}

export async function loader({ params }: LoaderFunctionArgs): Promise<ArticlePagePropsProps> {
  const { article_id } = params as { article_id: string };
  const article = await retrieveArticleByID(article_id);

  if ('status' in article) {
    return redirect('/auth/login') as unknown as ArticlePagePropsProps;
  }

  return { article };
}
