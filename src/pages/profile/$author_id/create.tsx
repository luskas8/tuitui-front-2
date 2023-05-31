import MDEditor, { getCommands } from "@uiw/react-md-editor";
import 'flowbite';
import { useEffect, useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import { Article, TagSearched, Tags } from "../../../@types/article";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/ArrowLeft.svg";
import { ReactComponent as CheckCircle } from "../../../assets/icons/Check-Circle.svg";
import { ReactComponent as Close } from "../../../assets/icons/Close.svg";
import { ReactComponent as Loading } from "../../../assets/icons/Loading.svg";
import { Button, ButtonGroup } from "../../../components/buttons";
import { useAlert, useAuth } from "../../../hooks";
import Layout from "../../../layouts/global";
import { createArticle } from "../../../services/articles";
import { retriveTags } from "../../../services/tags";
import { retrieveUserByID } from "../../../services/user";
import { Dropdown } from "../../../components/dropdown";

export default function CreateArticlePage() {
  const { updateAlert } = useAlert();
  const { authenticated } = useAuth();

  if (!authenticated) {
    return redirect("/auth/login") as unknown as JSX.Element;
  }

  const [articleInfo, setArticleInfo] = useState<Article>({ content: "", title: "", tags: [] as Tags[] } as Article);
  const [isLoadingTagsPreview, updateTagsPreviewLoading] = useState(false);
  const [tagPreviewList, updateTagPreviewList] = useState([] as TagSearched[]);
  const [isSaving, setIsSaving] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function tagInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const newTag = event.currentTarget.value;

      if (newTag === "") {
        return;
      }

      const newArticle = articleInfo;

      newArticle.tags?.push({ tagName: newTag });

      setArticleInfo((prev) => ({
        ...prev,
        ...newArticle,
      }));
      event.currentTarget.value = "";
      updateTagPreviewList(_ => []);
    }
  }

  async function updateList(e: React.KeyboardEvent<HTMLInputElement>) {
    updateTagsPreviewLoading(_ => true);

    if (e.key === "Enter" && e.currentTarget.value !== "") {
      updateTagsPreviewLoading(_ => false);
      return;
    }

    if (e.currentTarget.value === "") {
      updateTagPreviewList(_ => []);
      updateTagsPreviewLoading(_ => false);
      return;
    }

    if (e.currentTarget.value !== "") {
      const response = await retriveTags(e.currentTarget.value);

        if ('status' in response) {
          updateTagPreviewList(_ => []);
          updateTagsPreviewLoading(_ => false);
          return;
        }

        updateTagPreviewList(_ => response);
        updateTagsPreviewLoading(_ => false);
    }
  }

  const handleTagAdd = (tagName: string) => (_: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const newArticle = articleInfo;
    newArticle.tags?.push({ tagName });

    setArticleInfo((prev) => ({
      ...prev,
      ...newArticle,
    }));

    inputRef.current!.value = "";
    inputRef.current!.focus();
    updateTagPreviewList(_ => []);
  }

  const handleTagDelete = (tagName: string) => (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newArticle = articleInfo;

    newArticle.tags = newArticle.tags?.filter((tag) => tag.tagName !== tagName);

    setArticleInfo((prev) => ({
      ...prev,
      ...newArticle,
    }));
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

    const response = await createArticle(articleInfo);

    if ('status' in response) {
      updateAlert({
        type: "error",
        message: response.message,
      })
      setIsSaving(false);
      return;
    }

    const author = await retrieveUserByID(response.author);

    if ('status' in author) {
      updateAlert({
        type: "success",
        message: "Artigo criado com sucesso",
      })
      setIsSaving(false);
      navigate(`/homepage`);
      return;
    }

    setArticleInfo(_ => ({
      _id: response._id,
      author: {
        _id: author._id,
        description: author.description,
        userEmail: author.userEmail,
        username: author.username,
      },
      content: response.content,
      title: response.title,
      tags: response.tags || [],
    }));

    updateAlert({
      type: "success",
      message: "Artigo criado com sucesso",
    })
    navigate(`/profile/${response.author}/${response._id}`);
  }

  useEffect(() => {
    document.title = "Criar artigo | Tuitui";
  }, []);

  return (
    <Layout overgflow={false}>
      <div className="w-full h-full flex flex-col items-center">
        <div className="article-card w-full max-w-2xl min-w-[260px] rounded shadow-lg px-6 py-4 bg-white">
          <nav className="flex items-center gap-2 py-1 mb-2 border-b-2 border-slate-100">
            <Button.Default onClick={() => navigate(-1)} className="w-5 h-5">
              <ArrowLeft />
            </Button.Default>
            <h1>Criando artigo</h1>
          </nav>
          <header className="flex flex-wrap justify-between items-center">
            <div>
              <input disabled={isSaving} className="font-bold hover:bg-slate-100 px-2 py-1 rounded-lg" placeholder="Título do artigo" name="title" value={articleInfo.title} onChange={handleTitleChange} type="text" />
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
                name: "content",
              }}
              aria-disabled={isSaving}
              placeholder="Escreva seu artigo aqui..."
              aria-placeholder="Escreva seu artigo aqui..."
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

            <Dropdown
              theme={{
                content: "max-w-[260px]"
              }}
              arrowIcon={false}
              label={<input id="create-dropdown-input" data-dropdown-toggle="create-dropdown" disabled={isSaving} onKeyDown={tagInputKeyDown} onKeyUp={updateList} className="text-xs hover:bg-slate-100 px-2 py-1 rounded border-none focus:ring-2 focus:ring-violet-400" placeholder="+ Adicionar tag" ref={inputRef} type="text" />}
            >
              <ul className="max-h-[150px] overflow-hidden overflow-y-auto py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="create-dropdown-input">
                {isLoadingTagsPreview && <li className="flex justify-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <Loading className="w-7 h-7 animate-spin"/>
                  </li>
                }

                {(!isLoadingTagsPreview && tagPreviewList.length >= 1) && tagPreviewList.map((tag) => (
                  <li key={`${tag.tagName}`} onClick={handleTagAdd(tag.tagName)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {tag.tagName}
                  </li>
                ))}

                {(
                  !isLoadingTagsPreview
                  && (
                    (!inputRef.current || (inputRef.current && inputRef.current.value === ""))
                    && tagPreviewList.length === 0
                    )
                ) &&
                <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Nenhuma tag para listar
                </li>}

                {(!isLoadingTagsPreview && (inputRef.current && inputRef.current.value !== "") && tagPreviewList.length === 0) && (
                  <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleTagAdd(inputRef.current!.value)}>
                    + Adicionar tag
                  </li>
                )}
              </ul>
            </Dropdown>
          </footer>
        </div>
      </div>
    </Layout>
  );
}
