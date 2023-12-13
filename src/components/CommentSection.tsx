import { Divider, Space, Flex, Collapse, Typography, Empty } from 'antd';
import { Comment } from '../interfaces';

interface CommentSectionProps {
  comments: Comment[];
}

export const CommentSection = ({ comments }: CommentSectionProps) => {
  return (
    <Collapse
      items={[
        {
          key: '1',
          label: 'Comments',
          children: (
            <Flex vertical>
              {comments.length ? (
                comments.map((comment, index) => (
                  <Space key={comment.id} direction="vertical">
                    <Typography.Title level={3}>{comment.author}</Typography.Title>
                    <Typography.Text>{comment.content}</Typography.Text>
                    {index !== comments.length - 1 && <Divider />}
                  </Space>
                ))
              ) : (
                <Empty />
              )}
            </Flex>
          ),
        },
      ]}
    />
  );
};
