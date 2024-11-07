import React from 'react';
import { Card, Text, Badge, Group } from '@mantine/core';

const Comment = ({ comment, level = 0, parentId }) => {
  return (
    <div style={{ marginLeft: level * 20 }}>
      <Card
        key={`comment-${comment.id}-parent-${parentId}`}
        shadow="sm"
        padding="sm"
        radius="md"
        withBorder
        mt="md"
      >
        <Group position="apart" mb="xs">
          <Text weight={500}>{comment.user?.name || '匿名用户'}</Text>
          <Badge color="green" variant="light">
            {new Date(comment.created_at).toLocaleDateString()}
          </Badge>
        </Group>
        <Text>{comment.content}</Text>
        {/* 递归渲染子回复 */}
        {comment.replies?.map((reply) => (
          <Comment
            key={`reply-${reply.id}-comment-${comment.id}`}
            comment={reply}
            level={level + 1}
            parentId={comment.id}
          />
        ))}
      </Card>
    </div>
  );
};

export default Comment;