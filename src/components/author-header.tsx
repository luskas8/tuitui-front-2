import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/icons/ArrowLeft.svg";
import { BUTTON_GROUP_ORIENTATION, Button, ButtonGroup } from "./buttons";
// import { ReactComponent as Plus } from "../assets/icons/Plus.svg";
import { ReactComponent as Edit } from "../assets/icons/Edit.svg";
import { useForm, useModal } from "../hooks";
import Modal from "./modal";
import { User } from "../@types/user";
import React, { useRef, useState } from "react";
import { retriveUserID } from "../utilities/localStorage";
import { Input } from "./inputs";
import { Form } from "./form";
import { saveUserInformations } from "../services/user";


interface AuthorHeaderProps {
  author: User;
}

interface EditAuthorProfileModalProps {
  author: User;
  updateAuthor: React.Dispatch<React.SetStateAction<User>>;
}

export default function AuthorHeader({ author }: AuthorHeaderProps) {
  const loggedUserID = retriveUserID();
  const navigate = useNavigate();
  const { toggleVisibility } = useModal();
  const [authorInfo, setAuthorInfo] = useState<User>(author);

  return (
    <div className="bg-white w-full h-full py-3 px-6 rounded-sm">
      <EditAuthorProfileModal author={authorInfo} updateAuthor={setAuthorInfo} />
      <nav className="flex items-center gap-2 py-1 mb-2 border-b-2 border-slate-100">
        <Button.Default onClick={() => navigate(-1)} className="w-5 h-5">
          <ArrowLeft />
        </Button.Default>
        <h1>Perfil</h1>
      </nav>
      <header className="flex justify-between">
        <section>
          <h1 className="font-bold text-2xl">{authorInfo.username}</h1>
          <h2 className="mt-1 font-light text-slate-500">{authorInfo.username}</h2>
        </section>
        {loggedUserID === authorInfo._id && (
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
        )}
      </header>
      <p className="mt-2 text-xs">{authorInfo.description}</p>
    </div>
  );
}

function EditAuthorProfileModal({ author, updateAuthor }: EditAuthorProfileModalProps) {
  const { isSubmitting } = useForm();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isDeleting, updateIsDeleting] = useState(false);
  const [isUpdating, updateIsUpdating] = useState(false);

  function handleDeleteAccount() {
    updateIsDeleting(true)
  }

  const handleUpdateAccount = async (values: any) => {
    updateIsUpdating(true)

    const response = await saveUserInformations(values);

    // TODO: show response alert message
    if (response) {
      updateAuthor(author => ({ ...author, ...values }));
    }
    updateIsUpdating(false);
  }

  return (
    <Modal onClickFaceDismiss={isDeleting || isUpdating || isSubmitting}>
      <Modal.Header cancelButton={isDeleting || isUpdating || isSubmitting}>
        <Modal.Title>Editar perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          initialValues={{ username: author.username, description: author.description }}
          onSubmit={handleUpdateAccount}
        >
          {({ values, errors, handleOnChange }) => {
            return (
            <div className="flex flex-col gap-4">
              <Input
                label="Nome"
                id="username"
                name="username"
                placeholder="Nome"
                error={errors.username}
                handleOnChance={handleOnChange}
                value={values.username}
                disabled={isDeleting || isUpdating || isSubmitting}
              />
              <Input
                label="Nome"
                id="description"
                name="description"
                placeholder="Bio"
                error={errors.description}
                handleOnChance={handleOnChange}
                value={values.description}
                disabled={isDeleting || isUpdating || isSubmitting}
              />
              <div>
                <h3 className="font-bold text-sm">Configurações de dados</h3>
                <ButtonGroup className="mt-4" orientation={BUTTON_GROUP_ORIENTATION.VERTICAL}>
                  {/* <Button.Outline small>Alterar senha</Button.Outline>
                  <Button.Outline small>Baixar dados</Button.Outline> */}
                  <Button.Danger loading={isDeleting} disabled={isDeleting || isUpdating || isSubmitting} small onClick={handleDeleteAccount}>Excluir conta</Button.Danger>
                </ButtonGroup>
                <button ref={buttonRef} type="submit" className="hidden" />
              </div>
            </div>
            )
          }}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button.Success loading={isUpdating || isSubmitting} disabled={isDeleting || isUpdating || isSubmitting} type="submit" onClick={() => buttonRef.current?.click()}>Salvar</Button.Success>
      </Modal.Footer>
    </Modal>
  );
}
