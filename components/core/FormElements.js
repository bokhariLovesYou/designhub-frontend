import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { EditorContent } from "@tiptap/react";
import { useAppContext } from "@/context/AppWrapper";
import ReactSlider from "react-slider";
// DnD Sort
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// PropTypes
import PropTypes from "prop-types";

export const InputLF = (props) => {
  return (
    <>
      <div className={props.wrapperClassName}>
        {props.label && (
          <div className="mb-2">
            <label className="text-theme-text-light font-small block" htmlFor={props.name}>
              {props.label}
            </label>
          </div>
        )}
        <input
          className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-theme-focus-green focus__shadow-green focus:border-8 focus:outline-none"
          name={props.name}
          type={props.type}
          onChange={props.onChange}
          value={props.value}
          defaultValue={props.defaultValue}
          autoComplete="off"
          placeholder={props.placeholder}
          {...props.register(props.name, { ...props.rest })}
        />
      </div>
    </>
  );
};

export const Textarea = (props) => {
  return (
    <>
      <div className={props.wrapperClassName}>
        {props.label && (
          <div className="mb-2">
            <label className="text-theme-text-light font-small block" htmlFor={props.name}>
              {props.label}
            </label>
          </div>
        )}
        <TextareaAutosize
          className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          no-scrollbar
          focus:text-gray-700 focus:bg-white focus:border-theme-focus-green focus__shadow-green focus:border-8 focus:outline-none"
          name={props.name}
          type="textarea"
          onChange={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
          style={{ resize: "none" }}
          maxRows={6}
        />
      </div>
    </>
  );
};

export const TextareaLF = (props) => {
  return (
    <>
      <div className={props.wrapperClassName}>
        {props.label && (
          <div className="mb-2">
            <label className="text-theme-text-light font-small block" htmlFor={props.name}>
              {props.label}
            </label>
          </div>
        )}
        <TextareaAutosize
          className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          no-scrollbar
          focus:text-gray-700 focus:bg-white focus:border-theme-focus-green focus__shadow-green focus:border-8 focus:outline-none"
          name={props.name}
          type="textarea"
          onChange={props.onChange}
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          style={{ resize: "none" }}
          maxRows={6}
          {...props.register(props.name, { ...props.rest })}
        />
      </div>
    </>
  );
};

export const Select = (props) => {
  const options = props.options;
  const selected = props.value;
  return (
    <div className={props.wrapperClassName}>
      {props.label && (
        <div className="mb-2">
          <label className="text-theme-text-light font-small block" htmlFor={props.name}>
            {props.label}
          </label>
        </div>
      )}
      <div className="w-100">
        <Listbox value={props.value} onChange={props.onChange} name={props.name}>
          <div className="relative mt-1">
            <Listbox.Button
              className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-theme-focus-green focus__shadow-green focus:border-8 focus:outline-none"
            >
              <span className="block truncate">{selected && selected.label}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                style={{ zIndex: 9 }}
                className="absolute w-full mt-1 overflow-auto text-base bg-white rounded border border-solid border-gray-200 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {options.map((elem, index) => (
                  <Listbox.Option key={index} value={elem}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-bold" : ""
                          } hover:bg-theme-focus-green-light block truncate py-3 px-3 cursor-pointer`}
                        >
                          {elem.label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export const Toggle = (props) => {
  return (
    <>
      <div className={props.wrapperClassName}>
        {props.label && (
          <div className="mb-2">
            <label className="text-theme-text-light font-small block" htmlFor={props.name}>
              {props.label}
            </label>
          </div>
        )}
        <div className="form-control">
          <div className="cursor-pointer label">
            <input
              type="checkbox"
              onChange={props.onChange}
              name={props.name}
              checked={props.value ? `checked` : ``}
              className={`toggle border-2 border-gray-600 bg-gray-600 ${
                props.value ? `border-theme-focus-green-dark bg-theme-focus-green-dark` : ``
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const Slider = (props) => {
  return (
    <>
      <div className={props.wrapperClassName}>
        {props.label && (
          <div className="mb-2">
            <label className="text-theme-text-light font-small block" htmlFor={props.name}>
              {props.label}
            </label>
          </div>
        )}
        <div className="form-control">
          <div className="cursor-pointer label">
            <ReactSlider
              className="horizontal-slider text-theme-text-inverted text-xs font-bold h-4 rounded-xl border border-solid border-gray-300 bg-white w-full"
              marks
              markClassName=""
              min={0}
              max={10}
              thumbClassName="CUSTOM__transform-translate-y-negative-50 focus:outline-none example-thumb h-6 w-6 top-1/2 flex items-center justify-center border-1 border-theme-panel rounded-full bg-theme-focus-green-dark cursor-pointer"
              trackClassName="CUSTOM__progress"
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              onChange={props.onChange}
              defaultValue={props.defaultValue}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const MenuBar = ({ editor }) => {
  const { handlers, richTextMedia } = useAppContext();

  useEffect(() => {
    if (richTextMedia && richTextMedia.intent) {
      editor.chain().focus().setImage({ src: richTextMedia.src }).run();
    }
  }, [richTextMedia]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0H24V24H0z" />
          <path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0H24V24H0z" />
          <path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0H24V24H0z" />
          <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm9-12v8h1.5v2H22v2h-2v-2h-5.5v-1.34l5-8.66H22zm-2 3.133L17.19 16H20v-4.867z" />
        </svg>
      </button>
      <button
        onClick={() => {
          handlers.handleDrawer();
          handlers.handleRichTextImageIntent(true);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M5 11.1l2-2 5.5 5.5 3.5-3.5 3 3V5H5v6.1zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm11.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
        </svg>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z" />
        </svg>
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z" />
        </svg>
      </button>
    </>
  );
};

export const Richtext = (props) => {
  const { handlers, globalState } = useAppContext();

  return (
    <>
      <div className={props.wrapperClassName}>
        {props.label && (
          <div className="mb-2">
            <label className="text-theme-text-light font-small block" htmlFor={props.name}>
              {props.label}
            </label>
          </div>
        )}
        {props.expanded ? (
          <>
            <div className="CUSTOM__rich-text-editor bg-white bg-clip-padding border border-solid border-gray-300 rounded">
              <div className="CUSTOM__rich-text-editor__header bg-theme-panel-dark rounded-tl rounded-tr text-sm px-4 py-2 border-b border-solid border-gray-300">
                <MenuBar name={props.name} editor={props.editor} />
              </div>
              <div className="CUSTOM__rich-text-editor__body bg-white">
                <EditorContent editor={props.editor} />
              </div>
            </div>
          </>
        ) : (
          <>
            {!globalState.expandedRichText ? (
              <>
                <div className="CUSTOM__rich-text-editor bg-white bg-clip-padding border border-solid border-gray-300 rounded">
                  <div className="CUSTOM__rich-text-editor__header bg-theme-panel-dark rounded-tl rounded-tr text-sm px-4 py-2 border-b border-solid border-gray-300">
                    <MenuBar name={props.name} editor={props.editor} />
                  </div>
                  <div className="CUSTOM__rich-text-editor__body bg-white">
                    <EditorContent editor={props.editor} />
                  </div>
                </div>
                <div className="mt-2 text-right">
                  <button
                    onClick={() => handlers.handleExpandedRichText(true, props.name)}
                    type="button"
                    className="px-6 py-2 rounded border border-theme-border bg-theme-panel text-theme-text-light text-xs hover:bg-theme-panel-dark"
                  >
                    Expand Editor
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mt-2">
                  <button
                    onClick={() => handlers.handleExpandedRichText(false, null)}
                    type="button"
                    className="px-6 py-2 rounded border border-theme-border bg-theme-panel text-theme-text-light text-xs hover:bg-theme-panel-dark"
                  >
                    Close Expanded View
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export const ImageField = (props) => {
  const { handlers } = useAppContext();
  return (
    <>
      <div className={props.wrapperClassName}>
        {props.label && (
          <div className="mb-2 flex items-center justify-between">
            <label className="text-theme-text-light font-small block" htmlFor={props.name}>
              {props.label}
            </label>
            {props.image && (
              <div>
                <span
                  onClick={props.handleRemove}
                  className="text-theme-notify block text-xs cursor-pointer hover:underline"
                >
                  Remove
                </span>
              </div>
            )}
          </div>
        )}
        {props.image ? (
          <>
            <div
              onClick={() => handlers.handleDrawer(props.name)}
              className="bg-theme-panel-dark h-48 cursor-pointer mt-2 w-full relative rounded COMPONENT__image-preview"
            >
              <div className="flex h-full justify-center items-center flex-col">
                <img
                  className="max-w-full max-h-full"
                  src={props.image?.url}
                  alt={props.image?.alt}
                />
                <div className="COMPONENT__image-preview__tint">
                  <span className="text-white text-sm">Replace</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2">
                <label className="text-theme-text-light font-small block">Alt Text</label>
              </div>
              <TextareaAutosize
                className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-theme-focus-green focus__shadow-green focus:border-8 focus:outline-none"
                name={props.name}
                type="textarea"
                onChange={props.onChange}
                value={props.image.alt}
                placeholder={props.placeholder}
                style={{ resize: "none" }}
              />
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              handlers.handleDrawer(props.name);
            }}
            className="bg-theme-panel-dark h-48 cursor-pointer mt-2 w-full rounded border-theme-border border-2 border-dotted"
          >
            <div className="flex h-full justify-center items-center flex-col">
              <button
                type="button"
                className="px-6 py-2 rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm"
              >
                Browse Images
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const LinkField = (props) => {
  return (
    <>
      <Textarea
        wrapperClassName="mt-5"
        label="Button Title"
        onChange={props.linkTitleOnChange}
        value={props.linkTitleValue}
        placeholder="Add Button Title"
      />
      <Textarea
        wrapperClassName="mt-5"
        label="Button Destination"
        onChange={props.linkDestinationOnChange}
        value={props.linkDestinationValue}
        placeholder="Add Button Destination"
      />
    </>
  );
};

export const RepeaterField = (props) => {
  const { repeater, repeaterEditingMeta } = props;
  const [activeID, setActiveID] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <>
      <div className={props.wrapperClassName}>
        {props.label && (
          <div className="mb-2 flex items-center justify-between">
            <label className="text-theme-text-light font-small block" htmlFor={props.name}>
              {props.label}
            </label>
            <div>
              <span
                onClick={props.handleAdd}
                className="text-theme-notify block text-xs cursor-pointer hover:underline"
              >
                + Add
              </span>
            </div>
          </div>
        )}

        <div className="mt-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={repeater} strategy={verticalListSortingStrategy}>
              {repeater.map((elem, index) => {
                return (
                  <RepeaterListItem
                    key={index}
                    elem={elem}
                    index={index}
                    repeaterName={props.name}
                    repeaterEditingMeta={repeaterEditingMeta}
                    handleEdit={props.handleEdit}
                    handleClone={props.handleClone}
                    handleDelete={props.handleDelete}
                    id={elem.id}
                  />
                );
              })}
            </SortableContext>
            <DragOverlay>
              {activeID ? (
                <RepeaterListItem
                  elem={repeater.find((x) => x.id === activeID)}
                  handleEdit={props.handleEdit}
                  handleClone={props.handleClone}
                  handleDelete={props.handleDelete}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {props.children}
      </div>
    </>
  );
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      return props.handleMove(active, over);
    }
    setActiveID(null);
  }

  function handleDragStart(event) {
    props.handleFinishEdit();
    setActiveID(event.active.id);
  }
};

export const RepeaterListItem = ({
  elem,
  index,
  repeaterName,
  repeaterEditingMeta,
  handleEdit,
  handleClone,
  handleDelete,
  id,
}) => {
  const { handlers } = useAppContext();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sortingLabel = elem?.sortingLabel;

  return (
    <div
      data-attribute-id={id}
      ref={setNodeRef}
      style={style}
      key={index}
      className={`border flex items-center justify-between border-theme-border bg-white px-3 pl-4 py-2 ${
        index > 0 && `border-t-0`
      }`}
    >
      <span className="text-theme-text-light text-sm block truncate pr-5 flex items-center">
        <button type="button" {...listeners} {...attributes} className="pr-3">
          <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "5px", height: "24px" }}>
            <path
              fill="#516f90"
              d="M0 0h2v2H0V0zm0 8h2v2H0V8zm0 8h2v2H0v-2zM0 4h2v2H0V4zm0 8h2v2H0v-2zm0 8h2v2H0v-2zM3 0h2v2H3V0zm0 8h2v2H3V8zm0 8h2v2H3v-2zM3 4h2v2H3V4zm0 8h2v2H3v-2zm0 8h2v2H3v-2z"
            />
          </svg>
        </button>
        <span className="truncate pr-3">
          {elem && elem.sortingLabel ? elem[sortingLabel] : `...`}
        </span>
      </span>
      <div className="flex theme-row text-theme-notify -mx-2 items-center">
        {repeaterEditingMeta && repeaterEditingMeta.index === index && (
          <div className="theme-column px-2">
            <div className="badge bg-theme-primary border-none flex">
              <span style={{ fontSize: "0.6rem" }}>Editing</span>
            </div>
          </div>
        )}
        <div
          className="theme-column px-2 cursor-pointer"
          onClick={() => {
            handleEdit(index),
              handlers.handleRepeaterMeta({
                repeaterName,
                editingIndex: index,
              });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
        <div className="theme-column px-2 cursor-pointer" onClick={() => handleClone(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="theme-column px-2 cursor-pointer" onClick={() => handleDelete(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
