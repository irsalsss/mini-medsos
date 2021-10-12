import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useParams } from 'react-router';
import { useMainContext } from '../context/MainContext';
import { cloneDeep } from 'lodash';
import AlbumCard from '../components/AlbumCard';

const { Text } = Typography;

const UserDetailPage = () => {
  const { userId } = useParams();
  const { users, albums, onClickCard, _getAlbumsByUserId } = useMainContext();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (users.length && users.length >= userId) {
      let tempUserData = cloneDeep(users[userId - 1]);
  
      tempUserData.street = tempUserData?.address?.street;
      tempUserData.office = tempUserData?.company?.name;
  
      delete tempUserData.address;
      delete tempUserData.company;
      setUserData(tempUserData);
    }
  }, [users])

  useEffect(() => {
    _getAlbumsByUserId(userId);
  }, [])

  return (
    <div className='container-user-page'>
      <div className='box-info'>
        {userData?.id && Object.keys(userData).map((k, idx) => (
          <div key={idx} className='wrapper-user-info'>
            <Text style={{ textTransform: 'capitalize' }} strong>{k}: {" "}</Text>
            <div className='pl-2'>
              <Text>{userData[k]}</Text>
            </div>
          </div>
        ))}
      </div>

      <div className='d-flex justify-center flex-wrap'>
        {albums && albums.map((v) => (
          <div key={v.id} className='px-4 py-2'>
            <AlbumCard 
              albumData={v}
              userData={userData}
              onClickAlbum={() => onClickCard('album', v.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserDetailPage
