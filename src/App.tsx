import { useState } from 'react';

import './App.css';
import { Card, Space, Flex, message } from 'antd';
import { Comment } from './interfaces';
import { reactions } from './constants';
import { NewComment } from './components/NewComment';
import { Reactor } from './components/Reactor';
import { CommentSection } from './components/CommentSection';

// TODO: add multiple reactions
// TODO: store comments in local storage or in a database

function App() {
  const [postReaction, setPostReaction] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const getReactionByKey = (key: string) => {
    return reactions.find((reaction) => reaction.key === key);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const saveComment = () => {
    setComments([
      ...comments,
      {
        id: Math.random().toString(),
        content: newComment,
        author: 'John Doe', // TODO: take from auth
      },
    ]);
    setNewComment('');
    messageApi.open({
      type: 'success',
      content: 'Comment saved!',
    });
  };

  return (
    <div className="wrapper">
      {contextHolder}
      <Space direction="vertical" size={16}>
        <Card title="Post" bordered>
          <div className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at lacus nec erat semper molestie. Praesent
            ac fermentum neque. Ut mollis sed dui eu ornare. Integer iaculis erat at metus facilisis sagittis. Morbi
            rutrum justo lacus, id tempus orci lobortis ut. Duis dictum felis velit, ut volutpat est accumsan vitae.
            Phasellus ut dolor tristique risus luctus commodo eget gravida lorem. Fusce vitae venenatis sem, eget
            eleifend est. Donec vulputate diam eget vehicula cursus. Ut tempus molestie urna non sodales. Integer
            commodo sapien nisl. Ut vel quam rutrum lacus aliquet luctus. Curabitur venenatis non quam vitae pharetra.
            Integer egestas sollicitudin eleifend. Vivamus sed maximus velit. Aliquam dapibus tempor nisi nec malesuada.
          </div>

          <Flex gap={8} justify={postReaction ? 'space-between' : 'end'} align="center">
            {postReaction && <div className="post-reaction">{getReactionByKey(postReaction)?.node}</div>}

            <Flex gap={8}>
              <NewComment value={newComment} onChange={onChange} saveComment={saveComment} />
              <Reactor onSelect={(key) => setPostReaction(key)} removeReaction={() => setPostReaction('')} />
            </Flex>
          </Flex>

        </Card>
        <CommentSection comments={comments} />
      </Space>
    </div>
  );
}

export default App;
