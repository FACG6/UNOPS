import React from 'react';
import HomeAll from './tickets-home-all';
import HomeTrash from './tickets-home-trash';
import HomeDraft from './tickets-home-draft';
import HomeMy from './tickets-home-my';

export default ({
  match: {
    params: { cat, status },
  },
}) => {
  switch (cat) {
    case 'all':
      return <HomeAll status={status} />;
    case 'my':
      return <HomeMy status={status} />;
    case 'draft':
      return <HomeDraft />;
    case 'trash':
      return <HomeTrash />;
    default:
      return <React.Fragment />;
  }
};
