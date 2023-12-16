import { useCallback, useEffect, useRef, useState } from 'react';

import './App.css';
import { message } from 'antd';
import { Comment, CommentElement } from './interfaces';
import { AddCommentComponent } from './components/AddCommentComponent';

function App() {
  const [elementsData, setElementsData] = useState<CommentElement[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const containerRef = useRef(null);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);

  const itemRefs = useRef([]);

  useEffect(() => {
    const calculatePosition = () => {
      if (containerRef.current) {
        const containerBox = containerRef.current.getBoundingClientRect();
        const elementsDataUpdated = elementsData.map((element, index) => {
          const elementBox = itemRefs.current[index].getBoundingClientRect();
          const x = ((elementBox.left - containerBox.left) / containerBox.width) * 100 + '%';
          const y = ((elementBox.top - containerBox.top) / containerBox.height) * 100 + '%';
          return {
            ...element,
            x: x,
            y: y,
          };
        });
        setElementsData(elementsDataUpdated);
      }
    };

    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, [elementsData]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const containerBox = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerBox.left + window.scrollX + 'px';
      const y = e.clientY - containerBox.top + window.scrollY + 'px';
      setIsCommenting(true);
      const newId = `element-${elementsData.length}`;
      setElementsData((prevElements) => [...prevElements, { id: newId, x, y, comment: {} as Comment, isOpen: true }]);
    },
    [elementsData.length]
  );

  const saveComment = (id: string, text: string) => {
    setIsCommenting(false);
    const elementIndex = elementsData.findIndex((element) => element.id === id);
    const elementToUpdate = elementsData.find((element) => element.id === id);

    if (elementToUpdate) {
      let updatedElement: CommentElement;
      if (elementToUpdate.comment.content) {
        updatedElement = {
          ...elementToUpdate,
          comment: {
            ...elementToUpdate.comment,
            replies: [
              ...elementToUpdate.comment.replies,
              {
                id: Math.random().toString(),
                elementId: id,
                content: text,
                replies: [],
              },
            ],
          },
        };
      } else {
        updatedElement = {
          ...elementToUpdate,
          comment: {
            id: Math.random().toString(),
            elementId: id,
            content: text,
            replies: [],
          },
        };
      }
      setElementsData([
        ...elementsData.slice(0, elementIndex),
        {
          ...updatedElement,
        },
        ...elementsData.slice(elementIndex + 1),
      ]);
    }
    messageApi.open({
      type: 'success',
      content: 'Comment saved!',
    });
  };

  const toggleElementVisibility = useCallback(
    (id: string, isOpen: boolean) => {
      const elementIndex = elementsData.findIndex((element) => element.id === id);
      const elementToClose = elementsData.find((element) => element.id === id);
      if (elementToClose) {
        setElementsData([
          ...elementsData.slice(0, elementIndex),
          {
            ...elementToClose,
            isOpen,
          },
          ...elementsData.slice(elementIndex + 1),
        ]);
      }
    },
    [elementsData]
  );

  const onClose = useCallback(
    (id: string) => {
      setIsCommenting(false);
      toggleElementVisibility(id, false);
      const element = elementsData.find((element) => element.id === id);
      if (element && !element.comment.content) {
        setElementsData((prevElements) => prevElements.filter((element) => element.id !== id));
      }
    },
    [toggleElementVisibility, elementsData]
  );

  const addReaction = useCallback((key: string, id: string) => {
    setElementsData((prevElements) =>
      prevElements.map((element) => (element.id === id ? { ...element, reaction: key } : element))
    );
  }, []);

  return (
    <div className="wrapper">
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '300px',
          border: '1px solid darkgray',
          marginBottom: '20px',
          position: 'relative',
        }}
        onClick={isCommenting ? undefined : handleClick}
      >
        {elementsData.map(({ id, x, y, isOpen }, index) => (
          <div
            ref={(el) => (itemRefs.current[index] = el)}
            key={id}
            style={{ position: 'absolute', left: `${x}`, top: `${y}`, zIndex: index + 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <AddCommentComponent
              id={id}
              isOpen={isOpen}
              onClose={onClose}
              saveComment={saveComment}
              elementData={elementsData[index]}
              toggleElementVisibility={toggleElementVisibility}
              onAddReaction={addReaction}
            />
          </div>
        ))}
      </div>
      {contextHolder}
    </div>
  );
}

export default App;
