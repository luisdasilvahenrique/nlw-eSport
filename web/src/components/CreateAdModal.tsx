import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, GameController } from "phosphor-react";

import { Input } from "../components/Form/Input";

export function CreateAdModal(){
    return(
        <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

        <Dialog.Content className="fixed bg-[#242634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>

          <form className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold ">Qual o game?</label>

              <Input
                id="game"
                placeholder="Selecione o game que deseja jogar" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                id="name"
                placeholder="Como ter chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser Zero"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord?</label>
                <Input
                  id="discord"
                  type="text"
                  placeholder="Usuario#000"
                />
              </div>
            </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className="grid grid-cols-5 gap-1">
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Domingo">D</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Segunda-feira">S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Terça-feira">T</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Quarta-feira">Q</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Quinta-feira">Q</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Sexta-feira">S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Sábado">S</button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-1">
                    <Input id="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>
            

            <div className="mt-2 flex items-center gap-2 text-sm">
                <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
                    <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400 "/>
                    </Checkbox.Indicator>
                </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </div>

            <footer className="mt-8 flex justify-end gap-4">
              <Dialog.Close 
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
              <button 
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit">
                <GameController size={24}/>
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    );
}