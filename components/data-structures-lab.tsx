"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";

type Structure = "array" | "stack" | "queue";

const copy = {
  "pt-br": {
    tabs: { array:"Array", stack:"Pilha", queue:"Fila" }, inputLabel:"Valor para inserir",
    placeholder:"Digite um valor...", add:"Adicionar", remove:"Remover último", clear:"Limpar",
    push:"Empilhar", pop:"Desempilhar", enqueue:"Enfileirar", dequeue:"Desenfileirar",
    empty:"A estrutura está vazia. Adicione um valor para começar.",
    arrayHelp:"Acesso por índice. Inserir ou remover no meio pode exigir deslocar elementos.",
    stackHelp:"LIFO: o último elemento inserido é o primeiro a sair. Operações no topo.",
    queueHelp:"FIFO: o primeiro elemento inserido é o primeiro a sair.",
    index:"índice", top:"TOPO", front:"INÍCIO", rear:"FIM", count:"Elementos",
    added:"Valor adicionado", removed:"Valor removido", cleared:"Estrutura limpa",
    removedEmpty:"Não há elementos para remover.", invalid:"Digite um valor antes de adicionar.",
    history:"Última operação", initial:"Nenhuma operação ainda.", visual:"VISUALIZAÇÃO OPERACIONAL",
  },
  en: {
    tabs: { array:"Array", stack:"Stack", queue:"Queue" }, inputLabel:"Value to insert",
    placeholder:"Enter a value...", add:"Add", remove:"Remove last", clear:"Clear",
    push:"Push", pop:"Pop", enqueue:"Enqueue", dequeue:"Dequeue",
    empty:"The structure is empty. Add a value to get started.",
    arrayHelp:"Index-based access. Inserting or removing in the middle may shift elements.",
    stackHelp:"LIFO: the last item added is the first removed. Operations happen at the top.",
    queueHelp:"FIFO: the first item added is the first removed.",
    index:"index", top:"TOP", front:"FRONT", rear:"REAR", count:"Elements",
    added:"Value added", removed:"Value removed", cleared:"Structure cleared",
    removedEmpty:"There are no elements to remove.", invalid:"Enter a value before adding.",
    history:"Last operation", initial:"No operations yet.", visual:"OPERATIONAL VISUALIZATION",
  },
  es: {
    tabs: { array:"Array", stack:"Pila", queue:"Cola" }, inputLabel:"Valor para insertar",
    placeholder:"Escribe un valor...", add:"Añadir", remove:"Eliminar último", clear:"Limpiar",
    push:"Apilar", pop:"Desapilar", enqueue:"Encolar", dequeue:"Desencolar",
    empty:"La estructura está vacía. Añade un valor para comenzar.",
    arrayHelp:"Acceso por índice. Insertar o eliminar en medio puede desplazar elementos.",
    stackHelp:"LIFO: el último elemento añadido es el primero en salir. Operaciones en la cima.",
    queueHelp:"FIFO: el primer elemento añadido es el primero en salir.",
    index:"índice", top:"CIMA", front:"INICIO", rear:"FINAL", count:"Elementos",
    added:"Valor añadido", removed:"Valor eliminado", cleared:"Estructura limpiada",
    removedEmpty:"No hay elementos para eliminar.", invalid:"Escribe un valor antes de añadir.",
    history:"Última operación", initial:"Todavía no hay operaciones.", visual:"VISUALIZACIÓN OPERATIVA",
  },
} as const;

export default function DataStructuresLab({ locale = "pt-br" }: { locale?: Locale }) {
  const [structure, setStructure] = useState<Structure>("array");
  const [items, setItems] = useState<string[]>(["12", "7", "24"]);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const m = copy[locale];

  function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = value.trim();
    if (!next) { setStatus(m.invalid); return; }
    setItems((current) => [...current, next]);
    setValue("");
    setStatus(`${m.added}: ${next}`);
  }

  function remove() {
    if (items.length === 0) { setStatus(m.removedEmpty); return; }
    const removed = structure === "queue" ? items[0] : items[items.length - 1];
    setItems((current) => structure === "queue" ? current.slice(1) : current.slice(0, -1));
    setStatus(`${m.removed}: ${removed}`);
  }

  function clear() {
    setItems([]);
    setStatus(m.cleared);
  }

  const addLabel = structure === "stack" ? m.push : structure === "queue" ? m.enqueue : m.add;
  const removeLabel = structure === "stack" ? m.pop : structure === "queue" ? m.dequeue : m.remove;

  return (
    <section className="structures-lab" aria-label={m.visual}>
      <div className="structures-tabs" role="tablist" aria-label={m.visual}>
        {(["array", "stack", "queue"] as const).map((key) => (
          <button key={key} type="button" role="tab" aria-selected={structure === key}
            className={structure === key ? "structure-tab active" : "structure-tab"}
            onClick={() => { setStructure(key); setStatus(""); }}>
            {m.tabs[key]}
          </button>
        ))}
      </div>
      <div className="structure-description">{structure === "array" ? m.arrayHelp : structure === "stack" ? m.stackHelp : m.queueHelp}</div>
      <form className="structure-controls" onSubmit={add}>
        <label className="sr-only" htmlFor="structure-value">{m.inputLabel}</label>
        <input id="structure-value" value={value} onChange={(event) => setValue(event.target.value)}
          placeholder={m.placeholder} maxLength={24} />
        <button className="structure-action primary" type="submit">{addLabel}</button>
        <button className="structure-action" type="button" onClick={remove}>{removeLabel}</button>
        <button className="structure-action subtle" type="button" onClick={clear}>{m.clear}</button>
      </form>
      <div className={structure === "stack" ? "structure-canvas stack-canvas" : "structure-canvas"} aria-live="polite">
        {items.length === 0 ? <p className="structure-empty">{m.empty}</p> : structure === "stack" ? (
          <div className="stack-visual"><span className="structure-end-label">{m.top}</span>
            {[...items].reverse().map((item, index) => <div className={index === 0 ? "structure-cell structure-top-cell" : "structure-cell"} key={`${index}-${item}`}>{item}</div>)}
          </div>
        ) : (
          <div className={structure === "queue" ? "array-visual queue-visual" : "array-visual"}>
            {structure === "queue" && <span className="structure-end-label">{m.front}</span>}
            {items.map((item, index) => <div className="array-cell-wrap" key={`${index}-${item}`}>
              <div className="structure-cell">{item}</div><span className="array-index">{m.index} {index}</span>
            </div>)}
            {structure === "queue" && <span className="structure-end-label">{m.rear}</span>}
          </div>
        )}
      </div>
      <div className="structure-footer">
        <span><strong>{m.count}:</strong> {items.length}</span>
        <span><strong>{m.history}:</strong> {status || m.initial}</span>
      </div>
      <p className="structure-note">{structure === "queue" ? m.queueHelp : structure === "stack" ? m.stackHelp : m.arrayHelp}</p>
    </section>
  );
}
