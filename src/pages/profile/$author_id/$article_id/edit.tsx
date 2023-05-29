import MDEditor, { getCommands } from "@uiw/react-md-editor";
import { Suspense, useEffect, useRef, useState } from "react";
import { Await, LoaderFunctionArgs, defer, redirect, useLoaderData, useNavigate } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import { Article } from "../../../../@types/article";
import { APIError } from "../../../../@types/global";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/ArrowLeft.svg";
import { ReactComponent as CheckCircle } from "../../../../assets/icons/Check-Circle.svg";
import { ReactComponent as Close } from "../../../../assets/icons/Close.svg";
import Squeleton from "../../../../components/Squeleton";
import { Button, ButtonGroup } from "../../../../components/buttons";
import { useAlert, useAuth } from "../../../../hooks";
import Layout from "../../../../layouts/global";
import { retrieveArticleByID, saveArticleInformations } from "../../../../services/articles";
import { retriveUserID } from "../../../../utilities/localStorage";

interface EditArticleLoadingProps {
  article: Promise<typeof retrieveArticleByID>;
}

interface EditArticlePageProps {
  article: Article | APIError;
}

export default function EditArticleLoading() {
  const { article } = useLoaderData() as EditArticleLoadingProps;

  useEffect(() => {
    document.title = "Editar artigo | Tuitui";
  }, []);

  return (
    <Layout>
        <Suspense fallback={<div className="w-full h-full flex flex-col items-center"><Squeleton /></div>}>
          <Await resolve={article}>
            {(article: Article | APIError) => <EditArticlePage article={article} />}
          </Await>
        </Suspense>
    </Layout>
  );
}

function EditArticlePage({ article }: EditArticlePageProps) {
  const { updateAlert } = useAlert();
  const { authenticated } = useAuth();
  const loggedUserID = retriveUserID();

  if (!authenticated) {
    return redirect("/auth/login") as unknown as JSX.Element;
  }

  if ('status' in article) {
    return <div className="w-full">
      <Squeleton />
    </div>;
  }

  if (loggedUserID !== article.author._id) {
    updateAlert({
      type: "error",
      message: "Você não tem permissão para editar este artigo",
    });
    return redirect("/homepage") as unknown as JSX.Element;
  }

  const [articleInfo, setArticleInfo] = useState<Article>(article as Article);
  const [isSaving, setIsSaving] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function tagInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const newTag = event.currentTarget.value;
      const newArticle = articleInfo;

      newArticle.tags?.push({ tagName: newTag });

      setArticleInfo((prev) => ({
        ...prev,
        ...newArticle,
      }));
      event.currentTarget.value = "";

      const response = await saveArticleInformations(newArticle);

      if ('status' in response) {
        updateAlert({
          type: "error",
          message: response.message,
        });
        return;
      }

      updateAlert({
        type: "success",
        message: "Tag adicionada com sucesso",
      });
    }
  }

  const handleTagDelete = (tagName: string) => async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newArticle = articleInfo;

    newArticle.tags = newArticle.tags?.filter((tag) => tag.tagName !== tagName);

    setArticleInfo((prev) => ({
      ...prev,
      ...newArticle,
    }));

    const response = await saveArticleInformations(newArticle);

    if ('status' in response) {
      updateAlert({
        type: "error",
        message: response.message,
      });
      return;
    }

    updateAlert({
      type: "success",
      message: "Tag removida com sucesso",
    });
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newArticle = articleInfo;

    newArticle.title = event.currentTarget.value;

    setArticleInfo((prev) => ({
      ...prev,
      ...newArticle,
    }));
  }

  const handleContentChange = (content: string | undefined) => {
    if (!content) {
      content = "";
    }

    if (content.length > 5000) {
      return;
    }

    const newArticle = articleInfo;

    newArticle.content = content || "";

    setArticleInfo((prev) => ({
      ...prev,
      ...newArticle,
    }));
  }

  async function handleSave() {
    setIsSaving(true);
    if (!articleInfo.title || !articleInfo.content) {
      updateAlert({
        type: "error",
        message: "Preencha todos os campos",
      })

      setIsSaving(false);
      return;
    }

    const response = await saveArticleInformations(articleInfo);

    if ('status' in response) {
      updateAlert({
        type: "error",
        message: response.message,
      });
      setIsSaving(false);
      return;
    }

    updateAlert({
      type: "success",
      message: "Artigo salvo com sucesso",
    });
    setIsSaving(false);
  }

  return (
    <>
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
              <input disabled={isSaving} className="font-bold hover:bg-slate-100 px-2 py-1 rounded-lg" placeholder="Título do artigo" value={articleInfo.title} onChange={handleTitleChange} type="text" />
            </div>
            <ButtonGroup className="py-2">
              <Button.Danger disabled={isSaving} onClick={() => navigate(-1)}>
                <Close />
                Cancelar
              </Button.Danger>
              <Button.Success loading={isSaving} disabled={isSaving} onClick={handleSave}>
                <CheckCircle />
                Salvar
              </Button.Success>
            </ButtonGroup>
          </header>
          <main className="text-justify">
            <MDEditor
              commands={getCommands().filter(command => command.name !== "image")}
              data-color-mode="light"
              value={articleInfo.content}
              onChange={handleContentChange}
              previewOptions={{
                rehypePlugins: [rehypeSanitize],
              }}
              textareaProps={{
                placeholder: "Escreva seu artigo aqui...",
              }}
              aria-disabled={isSaving}
              placeholder="Escreva seu artigo aqui..."
              aria-aria-placeholder="Escreva seu artigo aqui..."
              className="w-full h-64 rounded-lg px-2 py-1"
            />
            <div className="text-xs text-slate-400">Escreva até um máximo de 5000 caractéres</div>
          </main>
          <footer className="flex flex-wrap gap-2 mt-4">
            {!!articleInfo.tags?.length && articleInfo.tags?.map((tag) => (
              <Button.Default
                disabled={isSaving}
                onClick={handleTagDelete(tag.tagName)} key={tag.tagName}
                className="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-lg text-xs flex items-center gap-1"
              >
                {tag.tagName}
                <Close className="w-2" />
              </Button.Default>
            ))}

            <input disabled={isSaving} onKeyDown={tagInputKeyDown} className="text-xs hover:bg-slate-100 px-2 py-1 rounded-lg" placeholder="+ Adicionar tag" ref={inputRef} type="text" />
          </footer>
        </div>
      </div>
    </>
  );
}

export async function loader({ params }: LoaderFunctionArgs): Promise<unknown> {
  const { article_id } = params as { article_id: string };
  const article = retrieveArticleByID(article_id);
  return defer({ article });
}
