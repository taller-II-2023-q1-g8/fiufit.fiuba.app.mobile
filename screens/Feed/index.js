import React, { useState, useEffect } from 'react';
import { func, shape } from 'prop-types';

import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';

import Feed from './layout';

export default function FeedScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useStateValue();
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      // Get de training plan completed de tu la gente que seguis.
      // Si dio algun rating muy bueno a algun plan

      setFeed([
        { type: 'training_finished', username: 'pepe', title: 'Plan de la Fiuba', difficulty: 'EASY' },
        { type: 'training_finished', username: 'pepe', title: 'Road To Ingeniero', difficulty: 'MEDIUM' },
        { type: 'training_finished', username: 'pepe', title: 'Duro como final de AM3', difficulty: 'HARD' },
        {
          type: 'training_finished',
          username: 'pepe',
          title: 'Fuerte como el café del comedor',
          difficulty: 'MEDIUM'
        }
      ]);

      setLoading(false);
    }
    fetchData();
  }, []);
  const [refreshingUsers, setRefreshingUsers] = useState(false);
  const onRefreshUsers = React.useCallback(async () => {
    setRefreshingUsers(true);
    // Fetch data
    console.log('abc');
    setRefreshingUsers(false);
  }, []);

  return <Feed loading={loading} feed={feed} refreshing={refreshingUsers} onRefresh={onRefreshUsers} />;
}

FeedScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
