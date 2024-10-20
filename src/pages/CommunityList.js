import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCommunities } from '../store/communitySlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const CommunityList = () => {
  const dispatch = useDispatch();
  const { subCategoryId } = useParams();
  const communityState = useSelector((state) => state.community);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (subCategoryId) {
      dispatch(fetchCommunities({ subCategoryId, page: 1 }));
    }
  }, [dispatch, subCategoryId]);

  if (!communityState) {
    return <div>Loading...</div>;
  }

  const { communities, currentPage, totalPages, loading, error } = communityState;

  const loadMoreCommunities = () => {
    if (currentPage < totalPages) {
      dispatch(fetchCommunities({ subCategoryId, page: currentPage + 1 }));
    } else {
      setHasMore(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Communities</h1>
      {loading && communities.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <InfiniteScroll
          dataLength={communities.length}
          next={loadMoreCommunities}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more communities to load.</p>}
        >
          {communities.map((community) => (
            <div key={community.id}>
              <h2>{community.name}</h2>
              <p>Status: {community.status}</p>
              <p>Created at: {new Date(community.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CommunityList;
