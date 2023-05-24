import { useEffect, useRef, useState } from "react";
import { Tags } from "../@types/article";
import { ReactComponent as Tuitui } from "../assets/branding/branding.svg";
import { ReactComponent as File } from "../assets/icons/FileText.svg";
import { ReactComponent as Search } from "../assets/icons/Search.svg";
import { ReactComponent as User } from "../assets/icons/User.svg";
import { ReactComponent as Down } from "../assets/icons/Down.svg";
import { Button } from "./buttons";
import { ChildrenProps, Form } from "./form";
import { ButtonGroup, LINK_GROUP_ORIENTATION, Link } from "./links";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Navigation() {
  const { search, type } = useSearchParams() as { type?: string, search?: string }
  const navigate = useNavigate();
  function iconRule(width: number) {
    return (width >= 425 && width <= 550) || (width >= 640 && width <= 747);
  }

  async function submit(values: any) {
    navigate(`/homepage?type=${values.type || ""}&search=${values.search || ""}`);
  }

  return (
    <nav className="w-full h-full sm:h-14 bg-white drop-shadow-sm flex flex-col xs:flex-row items-center justify-between gap-1">
      <div className="p-1 w-20 h-20 md:h-full">
        <Link.Default className="w-full h-full" to={'/homepage'}>
          <Tuitui className="w-full h-full"/>
        </Link.Default>
      </div>
        <Form onSubmit={submit} initialValues={{ type: type || "none", search: search || "" }}>
          {SearchGroup}
        </Form>
      <div className="actions">
        <ButtonGroup orientation={LINK_GROUP_ORIENTATION.VERTICAL}>
          <Link iconRule={iconRule} to={'/'}>
            <File />
            Novo artigo
          </Link>
          <Link.Terciary iconRule={iconRule} to={'/auth/register'}>
            <User />
            Criar conta
          </Link.Terciary>
        </ButtonGroup>
      </div>
    </nav>
  )
}

function SearchGroup({ values, errors, handleOnChange }: ChildrenProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [listItems, updateListItems] = useState<Tags[]>([]);
  const [showList, updateShowList] = useState<boolean>(false);

  function updateList(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      console.log("enter");
    }

    updateListItems(_ => [])
  }

  const handleItemClick = (tagName: string) => (_: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    handleOnChange({
      target: {
        name: "search",
        value: tagName
      }
    });
    updateShowList(_ => false);
  }

  useEffect(() => {
    if (showList) {
      inputRef.current?.focus();
    }

    if (errors.length) {
      return;
    }
  }, [showList]);

  return (
    <div className="search-bar flex flex-col sm:flex-row">
      <select value={values["type"]} name="type" onChange={handleOnChange} className="select border px-2 py-1">
        <option hidden value="none">Selecione</option>
        <option value="tag">Tag</option>
        <option value="author">Autor</option>
      </select>
      <div className="relative group flex border px-2 py-1">
        <input ref={inputRef} onFocus={_ => updateShowList(_ => true)} onKeyDown={updateList} value={values["search"]} name="search" onChange={handleOnChange} type="text" className="input-select focus:outline-none relative" />
        <Down className="w-5 cursor-pointer" onClick={_ => updateShowList(state => !state)} />
        <ul onBlur={_ => console.log("AAa")} className={`input-select--list ${showList ? "visible" : "invisible"}`}>
          {listItems.length === 0 && <li className="input-select--list-item__disabled w-full">Vamos buscar algo</li>}
          {listItems.map((item) => (
            <li key={`${item.tagName}`} onClick={handleItemClick(item.tagName)} className="input-select--list-item w-full">
              {item.tagName}
            </li>
          ))}
        </ul>
      </div>
      <Button type="submit">
        <Search />
      </Button>
    </div>
  )
}
