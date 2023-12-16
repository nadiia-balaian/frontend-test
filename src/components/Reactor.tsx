import { Button, Popover, Flex } from 'antd';
import { ReactionBarSelector } from '@charkour/react-reactions';
import { reactions } from '../constants';
import { DeleteOutlined } from '@ant-design/icons';

interface ReactorProps {
  onSelect: (key: string) => void;
  removeReaction?: () => void;
  selected?: string;
}

const getReactionByKey = (key: string) => {
  return reactions.filter((reaction) => reaction.key === key)[0].node;
};

export const Reactor = ({ onSelect, selected, removeReaction }: ReactorProps) => {
  const content = (
    <Flex gap={8}>
      <ReactionBarSelector iconSize={20} onSelect={onSelect} reactions={reactions} />
      {removeReaction && <DeleteOutlined onClick={removeReaction} title="Remove reaction" />}
    </Flex>
  );
  return (
    <Popover content={content} title="Choose your reaction" trigger="click">
      <Button className="reaction-btn" title="Left reaction!">
        {selected ? <span>{getReactionByKey(selected)}</span> : <span>🙂</span>}
      </Button>
    </Popover>
  );
};
