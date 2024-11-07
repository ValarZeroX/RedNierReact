import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopicsThunk, resetTopics } from '../../store/topicsSlice';
import { fetchCommunityById, resetCurrentCommunity } from '../../store/communityDetailSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Title, Text, Loader, Center, Stack, Card, Badge, Group, Grid, Tabs } from '@mantine/core';

import NotFoundTitle from '../errors/NotFoundTitle';
import ErrorPage from '../errors/ErrorPage';

const CommunityDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { topics, currentPage, totalPages, loading: topicsLoading, error: topicsError } = useSelector((state) => state.topics);

  // 从 communityDetailSlice 获取社群详细信息
  const { community, loading: communityLoading, error: communityError } = useSelector((state) => state.communityDetail);

  // 使用 useRef 来跟踪 useEffect 是否已经执行过
  const didMount = useRef(false);

  useEffect(() => {
    if (communityError && communityError.status === 404) {
      navigate('/not-found', { replace: true });
    }
    // 处理其他错误类型（如 500）
    if (communityError && communityError.status !== 404) {
      navigate('/error', { replace: true, state: { status: communityError.status, message: communityError.message } });
    }
  }, [communityError, navigate]);

  useEffect(() => {
    if (topicsError && topicsError.status === 404) {
      navigate('/not-found', { replace: true });
    }
    // 处理其他错误类型（如 500）
    if (topicsError && topicsError.status !== 404) {
      navigate('/error', { replace: true, state: { status: topicsError.status, message: topicsError.message } });
    }
  }, [topicsError, navigate]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      dispatch(resetTopics());
      dispatch(resetCurrentCommunity());
      dispatch(fetchCommunityById(id));
      dispatch(fetchTopicsThunk({ communityId: id, page: 1 }));
    }

    return () => {
      dispatch(resetTopics());
      dispatch(resetCurrentCommunity());
    };
  }, [dispatch, id]);

  const loadMoreTopics = () => {
    if (currentPage < totalPages && !topicsLoading) {
      dispatch(fetchTopicsThunk({ communityId: id, page: currentPage + 1 }));
    }
  };

  // 封装左侧内容组件
  const LeftContent = () => {
    return (
      <>
        {/* 显示社群基本信息 */}
        {communityLoading ? (
          <Center>
            <Loader size="xl" />
          </Center>
        ) : community ? (
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Group position="apart" mb="xs">
              <Text weight={500}>{community.name}</Text>
              <Badge color={community.status === 'open' ? 'green' : 'red'} variant="light">
                {community.status}
              </Badge>
            </Group>
            <Text size="sm" color="dimmed">
              {community.description}
            </Text>
          </Card>
        ) : (
          <Text size="lg" color="dimmed">未找到社群</Text>
        )}

        {/* 主题列表 */}
        {topicsLoading && topics.length === 0 ? (
          <Center>
            <Loader size="xl" />
          </Center>
        ) : topics.length === 0 ? (
          <Text size="lg" color="dimmed">暫無主题</Text>
        ) : (
          <InfiniteScroll
            dataLength={topics.length}
            next={loadMoreTopics}
            hasMore={currentPage < totalPages}
            loader={
              <Center>
                <Loader size="md" my="md" />
              </Center>
            }
            endMessage={
              <Center>
                <Text align="center" mt="md"></Text>
              </Center>
            }
          >
            <Stack spacing="md">
              {topics.map((topic) => (
                <Card
                  key={topic.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  onClick={() => navigate(`/topic/${topic.id}`)}
                >
                  <Group position="apart" mb="xs">
                    <Text weight={500}>{topic.title}</Text>
                    <Badge color="blue" variant="light">
                      {new Date(topic.created_at).toLocaleDateString()}
                    </Badge>
                  </Group>
                  <Text size="sm" color="dimmed">
                    {topic.content}
                  </Text>
                </Card>
              ))}
            </Stack>
          </InfiniteScroll>
        )}
      </>
    );
  };


  const RightContent = () => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} mb="sm">社群信息</Title>
      <Text><strong>訂閱数量:</strong> {community?.members_count || 0}</Text>
      <Text><strong>创建日期:</strong> {community ? new Date(community.created_at).toLocaleDateString() : 'N/A'}</Text>
      <Text><strong>管理员:</strong> {community?.admin_name || '無'}</Text>
      {/* 添加更多您需要显示的信息 */}
    </Card>
  );

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {communityLoading
          ? '加载中...'
          : community
            ? `${community.name}`
            : '未找到社群'}
      </Title>

        <Tabs defaultValue="main">
          <Tabs.List>
            <Tabs.Tab value="main">Main</Tabs.Tab>
            <Tabs.Tab value="about">About</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="main" pt="md">
            <LeftContent />
          </Tabs.Panel>

          <Tabs.Panel value="about" pt="md">
            <RightContent />
          </Tabs.Panel>
        </Tabs>

    </Container>
  );
};

export default CommunityDashboard;
