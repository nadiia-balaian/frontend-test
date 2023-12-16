import { useState } from 'react';
import { Button, Input, Flex } from 'antd';
import { CloseOutlined, CommentOutlined } from '@ant-design/icons';
import { CommentElement } from '../interfaces';
import { Reactor } from './Reactor';

interface CommentProps {
  id: string;
  isOpen: boolean;
  onClose: (id: string) => void;
  saveComment: (id: string, text: string) => void;
  toggleElementVisibility: (id: string, isOpen: boolean) => void;
  elementData: CommentElement;
  onAddReaction: (key: string, id: string) => void;
}

export const AddCommentComponent = ({
  id,
  isOpen,
  onClose,
  saveComment,
  elementData,
  toggleElementVisibility,
  onAddReaction,
}: CommentProps) => {
  const [newComment, setNewComment] = useState<string>('');

  return (
    <>
      {isOpen ? (
        <Flex vertical className="element-wrapper" gap={8}>
          <CloseOutlined
            onClick={() => {
              setNewComment('');
              onClose(id);
            }}
            className="close-icon"
          />
          <div>{elementData.comment?.content && <span>{elementData.comment.content}</span>}</div>

          {elementData.comment?.replies?.length
            ? elementData.comment.replies.map((reply, index) => <div key={index}>{reply.content}</div>)
            : null}

          {elementData.comment?.content && <Reactor onSelect={(key) => onAddReaction(key, id)} selected={elementData.reaction}/>}
          <Input
            type="text"
            value={newComment}
            maxLength={100}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type here..."
            id={id}
          />
          <Flex gap={4} justify="space-between">
            <Button
              onClick={() => {
                setNewComment('');
                onClose(id);
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setNewComment('');
                saveComment(id, newComment);
              }}
              disabled={!newComment}
            >
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
    </>
  );
};
