import {
  Building,
  Home as HomeIcon,
  LogOut,
  Settings,
  Timer,
} from "lucide-react";
import { Logo } from "./Logo";

export function SideBar() {
  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex-1 flex-col">
        <div className="my-3">
          <Logo />
        </div>
        <nav className="mt-10 space-y-5">
          <a
            href="http://"
            className="flex items-center gap-3 text-sm font-semibold text-zinc-200"
          >
            <HomeIcon size={24} color="white" />
            Home
          </a>
          <a
            href="http://"
            className="flex items-center gap-3 text-sm font-semibold text-zinc-200"
          >
            <Building size={24} color="white" />
            Comunidade
          </a>
          <a
            href="http://"
            className="flex items-center gap-3 text-sm font-semibold text-zinc-200"
          ></a>
        </nav>
        <div className="pt-8">
          <h3>Extras</h3>
          <div className="mt-4">
            <a className="flex items-center gap-2 py-2" href="">
              <div className="bg-primary rounded-full p-1">
                <Timer size={24} color="white" />
              </div>
              Tempo de tela
            </a>
          </div>
        </div>
        <div className="pt-8">
          <h3>Gerais</h3>
          <div className="mt-4">
            <a className="flex items-center gap-2 py-2" href="">
              <div className="p-1">
                <Settings size={24} color="white" />
              </div>
              Configurações
            </a>
            <a className="flex items-center gap-2 py-2" href="">
              <div className="p-1">
                <LogOut size={24} color="white" />
              </div>
              Sair
            </a>
          </div>
        </div>
      </div>
      <div className="mr-2 flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-zinc-400 p-2"></div>
        <p>Matheus Luiz</p>
      </div>
    </div>
  );
}
