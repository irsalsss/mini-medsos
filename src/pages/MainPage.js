import React, { useEffect, lazy } from 'react';
import { Button, Empty, Typography } from 'antd';

import AlbumCard from '../components/AlbumCard'
import { useMainContext } from '../context/MainContext';
import { FILTER_OPTIONS } from '../constant/main'; 
import InputSelect from '../components/InputSelect';
import RadioGroup from '../components/RadioGroup';
import PostCard from '../components/PostCard';
import CenterTitle from '../components/CenterTitle';
import ModalInputPost from '../components/ModalInputPost';

const { Text } = Typography;

const MainPage = () => {
  const {
    users, albums, posts,
    activeUser, onChangeActiveUser,
    onClickCard, onRedirect,
    filterOption, onChangeFilterOption,
    _getAlbumsByUserId, _getPostsByUserId,
    currentModalOpen, setCurrentModalOpen,
    onSubmitPost, onDeletePost
  } = useMainContext();

  const userData = users?.[activeUser - 1]

  useEffect(() => {
    _getAlbumsByUserId();

    if (!posts[activeUser]) {
      _getPostsByUserId();
    }
  }, [activeUser])
  
  return (
    <div className='container-main-page'>
      <div className='container-filter pt-2 px-3'>
        {filterOption === 'user' && users && (
          <InputSelect 
            defaultValue={activeUser}
            unique='id'
            options={users}
            onChange={onChangeActiveUser}
          />
        )}

        <div className='wrapper-filter'>
          <Text className='pr-3'>Filter by: </Text>
          <RadioGroup options={FILTER_OPTIONS} onChange={onChangeFilterOption} value={filterOption} />
        </div>
      </div>
      
      <CenterTitle title={`List of albums ${userData?.name || ''}`} />

      <div className='d-flex justify-center flex-wrap py-2'>
        {users && albums && albums.map((v) => (
          <div key={v.id} className='px-4 py-2'>
            <AlbumCard 
              albumData={v}
              userData={userData}
              onClickAlbum={() => onClickCard('album', v.id)} 
              onClickUser={() => onClickCard('user', v.userId)} 
            />
          </div>
        ))}
      </div>

      {albums.length === 0 && (
        <Empty className='pt-6' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      <CenterTitle title={`List of posts ${userData?.name || ''}`} />
      <div className='mt-2 d-flex justify-center'>
        <Button 
          onClick={() => setCurrentModalOpen({ userData, type: 'modalPost', action: 'create' })} 
          type="primary"
        >
          Create post
        </Button>
      </div>

      <div className='d-flex justify-center flex-wrap py-2'>
        {users && posts[activeUser] && posts[activeUser].map((v) => (
          <div key={v.id} className='px-4 py-2'>
            <PostCard 
              postData={v}
              onClickDelete={() => onDeletePost(v)} 
              onClickEdit={() => setCurrentModalOpen({ data: v, userData, type: 'modalPost', action: 'edit' })}
              onClick={() => onRedirect(`/posts?userId=${v.userId}&postId=${v.id}`)}
            />
          </div>
        ))}
      </div>

      {!posts[activeUser] && (
        <Empty className='pt-6' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      <ModalInputPost
        key='modalPost'
        isOpen={currentModalOpen?.type === 'modalPost'}
        onClose={() => setCurrentModalOpen({})}
        data={currentModalOpen?.data}
        userData={userData}
        onSubmit={(body) => onSubmitPost(body, userData, currentModalOpen?.action)}
      />
    </div>
  )
}

export default MainPage
