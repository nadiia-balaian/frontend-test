import { useCallback, useRef, useState } from 'react';

import './App.css';
import { message, Button, Input, Flex } from 'antd';
import { CloseOutlined, CommentOutlined } from '@ant-design/icons';
import { Comment, NewCommentElement } from './interfaces';
import { CommentSection } from './components/CommentSection';

function App() {
  const [values, setValues] = useState({});
  const [elementsData, setElementsData] = useState<NewCommentElement[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const containerRef = useRef(null);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const containerBox = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerBox.left + window.scrollX;
      const y = e.clientY - containerBox.top + window.scrollY;
      setIsCommenting(true);

      const newId = `element-${elementsData.length}`;

      setElementsData((prevElements) => [...prevElements, { id: newId, x, y, isOpen: true }]);
      setValues((prevValues) => ({
        ...prevValues,
        [newId]: '',
      }));
    },
    [elementsData.length]
  );

  const saveComment = (id: string) => {
    setIsCommenting(false);
    toggleElementVisibility(id, false);
    setComments([
      ...comments,
      {
        id: Math.random().toString(),
        elementId: id,
        content: values[id],
        author: 'John Doe',
      },
    ]);
    messageApi.open({
      type: 'success',
      content: 'Comment saved!',
    });
  };

  const handleChange = useCallback((id: string, newValue: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  }, []);

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
      const elementHasComment = comments.find((comment) => comment.elementId === id);
      if (!elementHasComment) {
        setElementsData((prevElements) => prevElements.filter((element) => element.id !== id));
      }
    },
    [toggleElementVisibility, comments]
  );

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
        {elementsData.map(({ id, x, y, isOpen }) => (
          <div key={id} style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}>
            {isOpen ? (
              <Flex vertical className="element-wrapper" gap={8}>
                <CloseOutlined onClick={() => onClose(id)} />
                <Input
                  type="text"
                  value={values[id] || ''}
                  maxLength={100}
                  onChange={(e) => handleChange(id, e.target.value)}
                  placeholder="Type here..."
                  id={id}
                />
                <Flex gap={4} justify="space-between">
                  <Button onClick={() => onClose(id)}>Cancel</Button>
                  <Button type="primary" onClick={() => saveComment(id)} disabled={!values[id]}>
                    Save
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <CommentOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  toggleElementVisibility(id, true);
                }}
              />
            )}
          </div>
        ))}
      </div>
      {contextHolder}

      <CommentSection comments={comments} />
    </div>
  );
}

export default App;
