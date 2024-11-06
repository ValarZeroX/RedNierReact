import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopicsThunk, resetTopics } from '../../store/topicsSlice';
import { fetchCommunityById, resetCurrentCommunity } from '../../store/communityDetailSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Title, Text, Loader, Center, Stack, Card, Badge, Group, Grid, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const CommunityDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { topics, currentPage, totalPages, loading: topicsLoading, error: topicsError } = useSelector((state) => state.topics);
  
  // 从 communityDetailSlice 获取社群详细信息
  const { community, loading: communityLoading, error: communityError } = useSelector((state) => state.communityDetail);

  // 使用 useRef 来跟踪 useEffect 是否已经执行过
  const didMount = useRef(false);

  // 检测屏幕宽度
  const isMobile = useMediaQuery('(max-width: 1200px)');

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
  const LeftContent = () => (
    <>
      {/* 显示社群基本信息 */}
      {communityLoading ? (
        <Center>
          <Loader size="xl" />
        </Center>
      ) : communityError ? (
        <Text color="red">错误: {communityError}</Text>
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
        <Text size="lg" color="dimmed">未找到社群资料</Text>
      )}

      {/* 错误处理 */}
      {topicsError && (
        <Container>
          <Text color="red">错误: {topicsError}</Text>
        </Container>
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
              <Text align="center" mt="md">无需加载更多数据</Text>
            </Center>
          }
        >
          <Stack spacing="md">
            {topics.map((topic) => (
              <Card key={topic.id} shadow="sm" padding="lg" radius="md" withBorder>
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

  // 封装右侧内容组件
  const RightContent = () => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} mb="sm">社群信息</Title>
      <Text><strong>成员数量:</strong> {community?.members_count || 0}</Text>
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
          ? `社群仪表板 - ${community.name}`
          : '社群仪表板'}
      </Title>

      {isMobile ? (
        // 移动端布局：使用 Tabs
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
      ) : (
        // 桌面端布局：使用 Grid
        <Grid>
          {/* 左侧栏位 */}
          <Grid.Col span={8}>
            <LeftContent />
          </Grid.Col>

          {/* 右侧栏位 */}
          <Grid.Col span={4}>
            <RightContent />
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
};

export default CommunityDashboard;
