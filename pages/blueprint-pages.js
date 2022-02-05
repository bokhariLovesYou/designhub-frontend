import React, { useState } from "react";
import DashboardHeader from "@/components/parts/DashboardHeader";
import PageTitle from "@/components/parts/PageTitle";
import Main from "@/components/layouts/Main";
import ContentWrapper from "@/components/parts/ContentWrapper";
import Link from "next/link";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

const BlueprintPages = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      orderId: 1,
      title: "Dummy Page",
    },
    {
      id: 2,
      orderId: 2,
      title: "Dummy Page 2",
    },
    {
      id: 3,
      orderId: 3,
      title: "Dummy Page 3",
    },
    {
      id: 4,
      orderId: 4,
      title: "Dummy Page 4",
    },
    {
      id: 5,
      orderId: 5,
      title: "Dummy Page 5",
    },
    {
      id: 6,
      orderId: 6,
      title: "Dummy Page 6",
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((x) => x.id === active.id);
        const newIndex = items.findIndex((x) => x.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setItems((items) => {
        const updatedItems = items.map((elem, index) => {
          const obj = elem;
          obj.orderId = index + 1;
          return obj;
        });
        return arrayMove(updatedItems);
      });
    }
  }

  return (
    <>
      <DashboardHeader />
      <Main>
        <PageTitle title="Blueprint Pages" renderClientName renderActionButton />
        <ContentWrapper>
          <div className="overflow-x-auto border border-theme-border">
            <table className="COMPONENT__table table w-full text-theme-text text-sm">
              <thead className="bg-theme-panel border-b border-theme-border">
                <tr>
                  <th>Name</th>
                  <th>Updated Date</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {items.map((elem, index) => (
                      <SortableItem
                        key={elem.id}
                        id={elem.id}
                        title={elem.title}
                        order={elem.orderId}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </tbody>
            </table>
          </div>
        </ContentWrapper>
      </Main>
    </>
  );
};

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <td>
        {props.title}
        <span className="text-xs block">Order: {props.order}</span>
      </td>
      <td>
        May 29, 2021<span className="text-xs block">11:55 PM</span>
      </td>
      <td>
        May 29, 2021<span className="text-xs block">11:55 PM</span>
      </td>
    </tr>
  );
};

export default BlueprintPages;
