import React, { useEffect } from 'react';
import { Empty, Typography } from 'antd';
import AlbumCard from '../components/AlbumCard'
import { useMainContext } from '../context/MainContext';
import { FILTER_OPTIONS } from '../constant/main'; 
import InputSelect from '../components/InputSelect';
import RadioGroup from '../components/RadioGroup';
import PostCard from '../components/PostCard';

const { Text } = Typography;

const MainPage = () => {
  const {
    users, albums, posts,
    onClickCard,
    filterOption, onChangeFilterOption, onFilterByName
  } = useMainContext();

  useEffect(() => {

  }, [])
  
  return (
    <div className='container-main-page'>
      <div className='container-filter pt-2 px-3'>
        {filterOption === 'user' && users && (
          <InputSelect defaultValue={1} unique='id' options={users} onChange={onFilterByName} />
        )}

        <div className='wrapper-filter'>
          <Text className='pr-3'>Filter by: </Text>
          <RadioGroup options={FILTER_OPTIONS} onChange={onChangeFilterOption} value={filterOption} />
        </div>
      </div>

      <Text className='pl-3 pb-3'>List of albums</Text>
      <div className='d-flex justify-center flex-wrap py-2'>
        {users && albums && albums.map((v) => (
          <div key={v.id} className='px-4 py-2'>
            <AlbumCard 
              albumData={v}
              userData={users?.[v.userId - 1]}
              onClickAlbum={() => onClickCard('album', v.id)} 
              onClickUser={() => onClickCard('user', v.userId)} 
            />
          </div>
        ))}
      </div>

      {albums.length === 0 && (
        <Empty className='pt-6' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      <Text className='py-3 pl-3'>List of posts</Text>
      <div className='d-flex justify-center flex-wrap py-2'>
        {users && posts && posts.map((v) => (
          <div key={v.id} className='px-4 py-2'>
            <PostCard postData={v} />
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <Empty className='pt-6' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  )
}

export default MainPage
