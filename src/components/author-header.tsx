import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/icons/ArrowLeft.svg";
import { BUTTON_GROUP_ORIENTATION, Button, ButtonGroup } from "./buttons";
// import { ReactComponent as Plus } from "../assets/icons/Plus.svg";
import { ReactComponent as Edit } from "../assets/icons/Edit.svg";
import { useModal } from "../hooks/useModal";
import Modal from "./modal";


interface AuthorHeaderProps {
  author: {
    name: string;
    username: string;
    bio: string;
  };
}

export default function AuthorHeader({ author }: AuthorHeaderProps) {
  const navigate = useNavigate();
  const { toggleVisibility } = useModal();

  return (
    <div className="bg-white w-full h-full py-3 px-6 rounded-sm">
      <EditAuthorProfileModal />
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
          {/* <Button small>
            <Plus />
            Seguir
          </Button> */}
          <Button.Outline small onClick={toggleVisibility}>
            <Edit />
            Editar
          </Button.Outline>
        </ButtonGroup>
      </header>
      <p className="mt-2 text-xs">{author.bio}</p>
    </div>
  );
}

function EditAuthorProfileModal() {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>Editar perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="input-group border border-slate-300 text-slate-400 rounded-sm flex flex-col px-1 py-2 focus-within:border-violet-400 focus-within:text-violet-400">
            <label className="" htmlFor="author-name">Nome</label>
            <input className="focus:outline-none text-black" type="text" id="author-name" />
          </div>
          <div className="input-group border border-slate-300 text-slate-400 rounded-sm flex flex-col px-1 py-2 focus-within:border-violet-400 focus-within:text-violet-400">
            <label htmlFor="author-bio">Bio</label>
            <textarea className="focus:outline-none text-black resize-none" id="author-bio" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Configurações de dados</h3>
            <ButtonGroup className="mt-4" orientation={BUTTON_GROUP_ORIENTATION.VERTICAL}>
              {/* <Button.Outline small>Alterar senha</Button.Outline>
              <Button.Outline small>Baixar dados</Button.Outline> */}
              <Button.Danger small>Excluir conta</Button.Danger>
            </ButtonGroup>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button.Success>Salvar</Button.Success>
      </Modal.Footer>
    </Modal>
  );
}
