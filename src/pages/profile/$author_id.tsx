import { useLoaderData } from "react-router-dom";
import { Article, ArticleListLoaderProps } from "../../@types/article";
import ArticlesList from "../../components/articles-list";
import AuthorHeader from "../../components/author-header";
import Layout from "../../layouts/global";

interface AuthorPageProps extends ArticleListLoaderProps {
  author: {
    name: string;
    username: string;
    bio: string;
  };
}

export default function AuthorPage() {
  const { articles, author } = useLoaderData() as AuthorPageProps;
  return (
    <Layout>
      <header className="flex flex-col items-center max-w-2xl min-w-[260px] mx-auto">
        <AuthorHeader
          author={author}
        />
      </header>
      <main className="flex justify-center max-w-2xl min-w-[260px] mx-auto mt-5">
        <ArticlesList title="Artigos" articles={articles} />
      </main>
    </Layout>
  );
}

export async function loader(): Promise<AuthorPageProps> {
  const articles: Article[] = [
    {
      title: "Hello World",
      _id:"434324",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"434325",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"434326",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"434327",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"434328",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"434329",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"4343",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"4344",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"434355",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"4378324",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
    {
      title: "Hello World",
      _id:"434799",
      author: {
        _id: "48384",
        username: "luskas8"
      },
      content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has" +
        "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised" +
        "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
        "Aldus PageMaker including versions of Lorem Ipsum.",
      tags: [
        { tagName: "desenvolvimento" },
        { tagName: "tencnologia" },
        { tagName: "hi-tec" }
      ]
    },
  ]

  const author = {
    name: "Lucas Anjos",
    username: "luskas8",
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy" +
      "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
  }
  return { articles, author }
}
