import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Branding } from "../../assets/branding/Branding.svg";
import { ReactComponent as Tuitui } from "../../assets/branding/tuitui.svg";
import { BUTTON_GROUP_ORIENTATION, Button, ButtonGroup } from "../../components/buttons";
import { Form } from "../../components/form";
import { Link } from "../../components/links";
import { Input } from "../../components/inputs";

export default function Register() {
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const initialValues = {
    fullname: "",
    username: "",
    password: "",
    confirm_password: ""
  }

  async function onSubmit(values: any) {
    console.log(values);
    login();
  }

  function login() {
    navigate("/homepage")
  }

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
          <Form onSubmit={onSubmit} ref={formRef} initialValues={initialValues} className="w-[300px] sm:w-2/3 flex flex-col gap-3 px-5 xs:px-7 md:px-16">
            {({ values, errors, handleOnChange }) => {
              return (
                <>
                <Input
                  label="Nome completo"
                  name="fullname"
                  value={values["fullname"]}
                  handleOnChance={handleOnChange}
                  placeholder="Digite seu nome completo"
                  error={errors["fullname"]}
                />

                <Input
                  label="Nome de usuário"
                  name="username"
                  value={values["username"]}
                  handleOnChance={handleOnChange}
                  placeholder="Digite seu nome de usuário"
                  error={errors["username"]}
                />

                <Input
                  label="Senha"
                  name="password"
                  value={values["password"]}
                  handleOnChance={handleOnChange}
                  placeholder="Digite sua senha"
                  error={errors["password"]}
                />

                <Input
                  label="Confirmar nova senha"
                  name="confirm_password"
                  value={values["confirm_password"]}
                  handleOnChance={handleOnChange}
                  placeholder="Confirme sua nova senha "
                  error={errors["confirm_password"]}
                />
                  <ButtonGroup orientation={BUTTON_GROUP_ORIENTATION.VERTICAL}>
                    <Button.Default type="submit" className="w-full rounded-sm bg-violet-300 hover:bg-violet-400 text-white py-2">Criar conta</Button.Default>
                    <Link.Default className="w-full text-center rounded-sm border border-violet-300 hover:border-violet-400 text-violet-300 hover:text-violet-400 py-2" to="/auth/login">Realizar login</Link.Default>
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
