import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { TagSearched } from "../@types/article";
import { User as TypeUser } from "../@types/user";
import { ReactComponent as Tuitui } from "../assets/branding/branding.svg";
import { ReactComponent as File } from "../assets/icons/FileText.svg";
import { ReactComponent as Loading } from "../assets/icons/Loading.svg";
import { ReactComponent as Search } from "../assets/icons/Search.svg";
import { ReactComponent as Up } from "../assets/icons/Up.svg";
import { ReactComponent as User } from "../assets/icons/User.svg";
import { retriveTags } from "../services/tags";
import { retrieveUsersByUsername } from "../services/user";
import { retriveUserID } from "../utilities/localStorage";
import { Button } from "./buttons";
import { ChildrenProps, Form } from "./form";
import { ButtonGroup, LINK_GROUP_ORIENTATION, Link } from "./links";

export default function Navigation() {
  const HREF = window.location.href
  const { searchParams, pathname } = new URL(HREF);
  const loggedUser = retriveUserID();

  const inProfilePageRegex = /^\/profile\/([a-z]|[0-9])+$/m;
  const inCreatePageRegex = /^\/profile\/([a-z]|[0-9])+\/create$/m;

  const type = searchParams.get("type");
  const search = searchParams.get("search");

  const navigate = useNavigate();

  function iconRule(width: number) {
    return (width >= 425 && width <= 550) || (width >= 640 && width <= 747);
  }

  async function submit(values: any) {
    navigate(`/homepage?type=${values.type}&search=${values.search}`);
  }

  return (
    <nav className="w-full h-full sm:h-14 bg-white drop-shadow-sm flex flex-col xs:flex-row items-center justify-between gap-1">
      <div className="p-1 w-20 h-20 md:h-full">
        <Link.Default className="w-full h-full" to={'/homepage'}>
          <Tuitui className="w-full h-full"/>
        </Link.Default>
      </div>
      <Form
        onSubmit={submit}
        initialValues={{ type: type || "tag", search: search || "" }}
        schemeValidation={z.object({
          type: z.string({ required_error: "Campo obrigatório" }).min(1, "Campo obrigatório"),
          search: z.string({ required_error: "Campo obrigatório" }).min(1, "Escolha uma pesquisa")
        }).required()}
        >
        {SearchGroup}
      </Form>
      <div className="actions sm:pr-1">
        <ButtonGroup orientation={LINK_GROUP_ORIENTATION.VERTICAL}>
          {!inCreatePageRegex.test(pathname) && (
            <Link iconRule={iconRule} to={`/profile/${loggedUser}/create`}>
              <File />
              Novo artigo
            </Link>
          )}
          {!inProfilePageRegex.test(pathname) && (
            <Link.Terciary iconRule={iconRule} to={`/profile/${loggedUser}`}>
              <User />
              Minha conta
            </Link.Terciary>
          )}
        </ButtonGroup>
      </div>
    </nav>
  )
}

function SearchGroup({ values, errors, handleOnChange }: ChildrenProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [listItems, updateListItems] = useState<TagSearched[] | TypeUser[]>([]);
  const [showList, updateShowList] = useState<boolean>(false);
  const [isLoading, updateLoadingState] = useState<boolean>(false);

  async function searchByType(type: string, search: string): Promise<void> {
    updateLoadingState(_ => true);
    switch (type) {
      case "tag":
        const tagResponse = await retriveTags(search);

        if ('status' in tagResponse) {
          updateListItems(_ => []);
          break;
        }

        updateListItems(_ => tagResponse);
        break;
      case "author":
        const usersResponse = await retrieveUsersByUsername(search);

        if ('status' in usersResponse) {
          updateListItems(_ => []);
          break;
        }

        updateListItems(_ => usersResponse);
        break;
      default:
        break;
    }

    updateLoadingState(_ => false);
  }

  async function updateList(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showList) {
      updateShowList(_ => true);
    }

    if (e.key === "Enter" && values.search !== "") {
      updateShowList(_ => false);
      return;
    }

    if (e.currentTarget.value === "") {
      updateListItems(_ => []);
      return;
    }

    if (e.currentTarget.value !== "" && values.type !== "none") {
      await searchByType(values.type, e.currentTarget.value);
    }
  }

  const handleItemClick = (value: string) => (_: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    handleOnChange({
      target: {
        name: "search",
        value
      }
    });

    updateShowList(_ => false);

    navigate(`/homepage?type=${values.type}&search=${value}`);
  }

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange({
      target: {
        name: "type",
        value: e.currentTarget.value
      }
    });

    if (values.search !== "") {
      searchByType(e.currentTarget.value, values.search).finally(()=> {});
    }

    inputRef.current?.focus();
  }

  return (
    <div className="search-bar flex flex-row">
      <div className={`relative group flex border px-2 py-1 ${(errors && errors["search"]) ? "border-red-400 text-red-400" : ""}`}>
        <input  ref={inputRef} onFocus={_ => updateShowList(_ => true)} onKeyUp={updateList} value={values["search"]} placeholder="Pesquise artigos aqui" onChange={handleOnChange} name="search" type="text" className="input-select focus:outline-none relative" />
        <Up className={`w-5 cursor-pointer ${showList ? "visible" : "invisible"}`} onClick={_ => updateShowList(state => !state)} />
        <div className={`input-select--list ${showList ? "visible" : "invisible"}`}>
          <div className="w-full flex justify-around items-center bg-white text-black">
            <div className="w-full h-full relative flex justify-center items-center">
              <input className="peer invisible absolute" onChange={onRadioChange} checked={values["type"] === "tag"} type="radio" name="type" value="tag" id="tag" />
              <label className="w-2/3 h-full text-center border-transparent border-b-4 peer-checked:border-violet-400 peer-checked:border-b-1 rounded-sm py-1 font-normal peer-checked:font-semibold" htmlFor="tag">
                Tags
              </label>
            </div>
            <div className="w-full h-full relative flex justify-center items-center">
              <input className="peer invisible absolute" onChange={onRadioChange} checked={values["type"] === "author"} type="radio" name="type" value="author" id="author" />
              <label className="w-2/3 h-full text-center border-transparent border-b-4 peer-checked:border-violet-400 peer-checked:border-b-1 rounded-sm py-1 font-normal peer-checked:font-semibold" htmlFor="author">
                Autores
              </label>
            </div>
          </div>
          <ul className="max-h-[150px] h-full overflow-hidden overflow-y-auto">
            {isLoading && <li className="input-select--list-item w-full flex justify-center text-black">
                <Loading className="w-7 h-7 animate-spin"/>
              </li>
            }

            {(!isLoading && listItems.length >= 1) && listItems.map((item) => {
              if ('username' in item) {
                return (
                  <li key={`${item._id}`} onClick={handleItemClick(item.username)} className="input-select--list-item w-full">
                    {item.username}
                  </li>
                )
              }

              return (
                <li key={`${item.tagName}`} onClick={handleItemClick(item.tagName)} className="input-select--list-item w-full">
                  {item.tagName}
                </li>
              )
            })}

            {(!isLoading && values.search !== "" && listItems.length === 0) && <li className="input-select--list-item w-full">
              Nada encontrado
            </li>}
          </ul>
        </div>
      </div>
      <Button useIconRule={false} type="submit">
        <Search />
      </Button>
    </div>
  )
}
