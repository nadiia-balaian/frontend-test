import { Button, Input, Popover, Flex } from 'antd';

import { CommentOutlined } from '@ant-design/icons';

interface NewCommentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  saveComment: () => void;
}

export const NewComment = ({ value, onChange, saveComment }: NewCommentProps) => {
  const content = (
    <Flex vertical={true} gap={25}>
      <Input.TextArea
        value={value}
        showCount
        maxLength={100}
        onChange={onChange}
        placeholder="Write your comment here"
        style={{ height: 80, resize: 'none' }}
      />
      <Button type="primary" onClick={saveComment} disabled={!value}>
        Save
      </Button>
    </Flex>
  );

  return (
    <Popover content={content} title="New comment" trigger="click">
      <Button title="Left comment!">
        <CommentOutlined />
      </Button>
    </Popover>
  );
};
