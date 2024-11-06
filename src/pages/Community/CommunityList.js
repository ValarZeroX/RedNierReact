import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCommunities } from '../../store/communitySlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Title, Card, Text, Group, Badge, Loader, Stack, Center, Tooltip, Flex } from '@mantine/core';

const CommunityList = () => {
  const dispatch = useDispatch();
  const { subCategoryId } = useParams();
  const navigate = useNavigate();
  const { communities, currentPage, totalPages, loading, error } = useSelector((state) => state.community);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (subCategoryId) {
      dispatch(fetchCommunities({ subCategoryId, page: 1 }));
      // setHasMore(true);
    }
  }, [dispatch, subCategoryId]);

  useEffect(() => {
    if (currentPage && totalPages) {
      setHasMore(currentPage < totalPages);
    }
  }, [currentPage, totalPages]);

  const loadMoreCommunities = () => {
    if (currentPage < totalPages) {
      dispatch(fetchCommunities({ subCategoryId, page: currentPage + 1 }));
    } else {
      setHasMore(false);
    }
  };

  if (error) {
    return <Container><Text color="red">Error: {error}</Text></Container>;
  }

  return (
    <Container size="lg">
      <Title order={2} mb="md">社群</Title>
      {loading && communities.length === 0 ? (
        <Center>
            <Loader size="xl" />
        </Center>
      ) : communities.length === 0 ? (
        <Text size="lg" color="dimmed">暫無社群</Text>
      ) : (
        <InfiniteScroll
          dataLength={communities.length}
          next={loadMoreCommunities}
          hasMore={hasMore}
          loader={<Center><Loader size="md" my="md" /></Center>}
          endMessage={<Center><Text ta="center" mt="md">無需加載資料</Text></Center>}
        >
          <Stack spacing="md">
            {communities.map((community) => (
              <Card key={community.id} shadow="sm" padding="lg" radius="md" withBorder onClick={() => navigate(`/community/${community.id}`)}>
                <Group position="apart" mb="xs">
                  <Text weight={500}>{community.name}</Text>
                  <Badge color={community.status === 'open' ? 'green' : 'red'} variant="light">
                    {community.status}
                  </Badge>
                </Group>
                  <Text size="sm" color="dimmed" lineClamp={3}>
                    {community.description}
                  </Text>
                <Flex justify="flex-end" align="center" mt="xs">
                  <Text size="sm" color="dimmed">
                    建立於:
                  </Text>
                  <Text size="sm" color="dimmed">
                    {new Date(community.created_at).toLocaleDateString()}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Stack>
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default CommunityList;
