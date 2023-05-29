import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ReactComponent as Branding } from "../../assets/branding/branding.svg";
import { ReactComponent as Tuitui } from "../../assets/branding/tuitui.svg";
import { BUTTON_GROUP_ORIENTATION, Button, ButtonGroup } from "../../components/buttons";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Link } from "../../components/links";
import { useAlert, useAuth, useForm } from "../../hooks";
import { registerUser } from "../../services/user";

export default function Register() {
  const { isSubmitting } = useForm();
  const { updateAlert } = useAlert();
  const { registerLogin, authenticated } = useAuth();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirm_password: ""
  }

  async function onSubmit(values: any) {
    const response = await registerUser(values);

    if ('status' in response) {
      updateAlert({
        type: "error",
        message: response.message
      })
      return;
    }

    registerLogin(response);
  }

  function register() {
    navigate("/homepage")
  }

  useEffect(() => {
    if (authenticated) {
      register()
    }
  }, [authenticated])

  useEffect(() => {
    document.title = "Página de registro | Tuitui";
  }, []);

  return (
    <div className="flex flex-col sm:flex-row">
      <main className="w-full lg:w-1/2 h-screen bg-white flex flex-col py-3">
        <header className="w-full flex flex-col gap-3">
          <div className="w-full h-[200px] px-5 xs:px-7 md:px-16">
            <Branding />
          </div>
          <h1 className="text-slate-400 text-4xl md:text-5xl lg:text-6xl text-center tracking-wide md:tracking-wider lg:tracking-wide">conectando ideias</h1>
        </header>
        <main className="flex justify-center pt-10">
          <Form
            onSubmit={onSubmit}
            ref={formRef}
            initialValues={initialValues}
            schemeValidation={z.object({
              username: z.string({ required_error: "Campo obrigatório" }).min(1, "Campo obrigatório"),
              email: z.string({ required_error: "Campo obrigatório" }).email("Email inválido"),
              password: z.string({ required_error: "Campo obrigatório" }).min(6, "Senha muito curta"),
              confirm_password: z.string({ required_error: "Campo obrigatório" }).min(6, "Senha muito curta"),
            }).required({
              username: true,
              confirm_password: true,
              password: true,
              email: true
            })}
            className="w-[300px] sm:w-2/3 flex flex-col gap-3 px-5 xs:px-7 md:px-16"
          >
            {({ values, errors, handleOnChange }) => {
              return (
                <>
                  <Input
                    disabled={isSubmitting}
                    label="Nome de usuário"
                    name="username"
                    value={values["username"]}
                    handleOnChance={handleOnChange}
                    placeholder="Digite seu nome de usuário"
                    error={errors["username"]}
                  />

                  <Input
                    disabled={isSubmitting}
                    label="Email"
                    name="email"
                    value={values["email"]}
                    handleOnChance={handleOnChange}
                    placeholder="Digite seu email"
                    error={errors["email"]}
                  />

                  <Input
                    disabled={isSubmitting}
                    label="Senha"
                    name="password"
                    type="password"
                    value={values["password"]}
                    handleOnChance={handleOnChange}
                    placeholder="Digite sua senha"
                    error={errors["password"]}
                  />

                  <Input
                    disabled={isSubmitting}
                    label="Confirmar nova senha"
                    name="confirm_password"
                    type="password"
                    value={values["confirm_password"]}
                    handleOnChance={handleOnChange}
                    placeholder="Confirme sua nova senha "
                    error={errors["confirm_password"]}
                  />
                  <ButtonGroup orientation={BUTTON_GROUP_ORIENTATION.VERTICAL}>
                    <Button disabled={isSubmitting} loading={isSubmitting} type="submit">Criar conta</Button>
                    <Link.Outline aria-disabled={isSubmitting} to="/auth/login">Realizar login</Link.Outline>
                  </ButtonGroup>
              </>
              )
            }}
          </Form>
        </main>
      </main>
      <div className="w-full h-screen sm:w-[50%] lg:w-1/2 bg-violet-300 p-14 sm:p-2 lg:p-7">
        <div className="w-full h-full">
          <Tuitui />
        </div>
      </div>
    </div>
  )
}
