import React, { useEffect, useRef } from 'react';
import { Container, Title, Text, Loader, Center, Stack, Card, Badge, Group } from '@mantine/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopicDetailsThunk, resetTopicDetail } from '../../store/topicsDetailSlice';
import { useParams, useNavigate  } from 'react-router-dom';
import Comment from '../../components/common/Comment';
import NotFoundTitle from '../errors/NotFoundTitle';
import ErrorPage from '../errors/ErrorPage';

const TopicDetail = () => {
  const { id: topicId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasFetchedData = useRef(false);

  const {
    topic,
    posts,
    loading,
    error,
    currentPage,
    perPage,
    hasMore,
  } = useSelector((state) => state.topicDetail);

  useEffect(() => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      dispatch(fetchTopicDetailsThunk({ topicId, page: 1, perPage }));
    }

    return () => {
      dispatch(resetTopicDetail());
      hasFetchedData.current = false;
    };
  }, [dispatch, topicId, perPage]);

    // useEffect(() => {
    //     if (error) {
    //     if (error.status === 404) {
    //         navigate('/not-found', { replace: true });
    //     } else {
    //         navigate('/error', { replace: true, state: { status: error.status, message: error.message } });
    //     }
    //     }
    // }, [error, navigate]);

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      dispatch(fetchTopicDetailsThunk({ topicId, page: currentPage, perPage }));
    }
  };

  if (loading && currentPage === 1) {
    return (
      <Center>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error && error.status === 404) {
    return (
        <NotFoundTitle />
      );
  }

  if (error && error.status !== 404) {
    return (
        <ErrorPage status={error.status}/>
      );
  }

  if (!topic) {
    return null;
  }

  return (
    <Container size="lg">
      <Title order={2} mb="md">{topic.title}</Title>
      <Text size="sm" color="dimmed" mb="md">
        由 {topic.user?.name || '匿名用户'} 发布于 {new Date(topic.created_at).toLocaleDateString()}
      </Text>
      <Text mb="md">{topic.content}</Text>

      <Title order={4} mb="md">帖子</Title>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Center>
            <Loader size="md" my="md" />
          </Center>
        }
        endMessage={
          <Center>
            <Text align="center" mt="md">已經置底</Text>
          </Center>
        }
      >
        <Stack spacing="md">
          {posts.map((post) => (
            <Card key={`post-${post.id}`} shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mb="xs">
                <Text weight={500}>{post.user?.name || '匿名用户'}</Text>
                <Badge color="blue" variant="light">
                  {new Date(post.created_at).toLocaleDateString()}
                </Badge>
              </Group>
              <Text>{post.content}</Text>
              {/* 渲染 Comments 和 Replies */}
              {post.comments?.map((comment) => (
                <Comment key={`comment-${comment.id}-post-${post.id}`} comment={comment} parentId={post.id} />
              ))}
            </Card>
          ))}
        </Stack>
      </InfiniteScroll>
    </Container>
  );
};

export default TopicDetail;
