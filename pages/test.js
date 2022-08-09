// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   DragOverlay,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// const test = () => {
//   const [activeId, setActiveId] = useState(null);
//   const [items, setItems] = useState([1, 2, 3]);
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   return (
//     <>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext items={items} strategy={verticalListSortingStrategy}>
//           {items.map((id) => (
//             <SortableItem key={id} id={id} />
//           ))}
//         </SortableContext>
//         <DragOverlay>{activeId ? <SortableItem id={activeId} /> : null}</DragOverlay>
//       </DndContext>
//     </>
//   );

//   function handleDragStart(event) {
//     const { active } = event;

//     setActiveId(active.id);
//   }

//   function handleDragEnd(event) {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setItems((items) => {
//         const oldIndex = items.indexOf(active.id);
//         const newIndex = items.indexOf(over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//     setActiveId(null);
//   }
// };

// export function SortableItem(props) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: props.id,
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       className="border flex items-center justify-between border-theme-border bg-white px-3 pl-4 py-2"
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//     >
//       <div>
//         <span>{props.id}</span>
//       </div>
//     </div>
//   );
// }

// export default test;

import React from "react";

const test = () => {
  return <div>test</div>;
};

export default test;
