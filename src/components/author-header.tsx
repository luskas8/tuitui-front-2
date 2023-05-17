import { useNavigate } from "react-router-dom";
import { BUTTON_GROUP_ORIENTATION, Button, ButtonGroup } from "./buttons";
import { ReactComponent as ArrowLeft } from "../assets/icons/ArrowLeft.svg";
import { ReactComponent as Plus } from "../assets/icons/Plus.svg";
import { ReactComponent as Edit } from "../assets/icons/Edit.svg";


interface AuthorHeaderProps {
  author: {
    name: string;
    username: string;
    bio: string;
  };
}

export default function AuthorHeader({ author }: AuthorHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full h-full py-3 px-6 rounded-sm">
      <nav className="flex items-center gap-2 py-1 mb-2 border-b-2 border-slate-100">
        <Button.Default onClick={() => navigate(-1)} className="w-5 h-5">
          <ArrowLeft />
        </Button.Default>
        <h1>Perfil</h1>
      </nav>
      <header className="flex justify-between">
        <section>
          <h1 className="font-bold text-2xl">{author.name}</h1>
          <h2 className="mt-1 font-light text-slate-500">{author.username}</h2>
        </section>
        <ButtonGroup orientation={BUTTON_GROUP_ORIENTATION.VERTICAL}>
          <Button small>
            <Plus />
            Seguir
          </Button>
          <Button.Outline small>
            <Edit />
            Editar
          </Button.Outline>
        </ButtonGroup>
      </header>
      <p className="mt-2 text-xs">{author.bio}</p>
    </div>
  );
}

