import { Button, Popover, Flex } from 'antd';
import { ReactionBarSelector } from '@charkour/react-reactions';
import { reactions } from '../constants';
import { DeleteOutlined } from '@ant-design/icons';

interface ReactorProps {
  onSelect: (key: string) => void;
  removeReaction: () => void;
}

export const Reactor = ({ onSelect, removeReaction }: ReactorProps) => {
  const content = (
    <Flex gap={8}>
      <ReactionBarSelector iconSize={20} onSelect={onSelect} reactions={reactions} />
      <DeleteOutlined onClick={removeReaction} title="Remove reaction" />
    </Flex>
  );
  return (
    <Popover content={content} title="Choose your reaction" trigger="click">
      <Button title="Left reaction!">🙂</Button>
    </Popover>
  );
};
