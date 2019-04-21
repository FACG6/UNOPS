import React from 'react';
import HomeAll from './tickets-home-all';
import HomeTrash from './tickets-home-trash';
import HomeDraft from './tickets-home-draft';
import HomeMy from './tickets-home-my';

function Home({ page, pendingClass, closedClass }) {
  switch (page) {
    case 'HomeAll':
      return <HomeAll pendingClass={pendingClass} closedClass={closedClass} />;
    case 'HomeMy':
      return <HomeMy pendingClass={pendingClass} closedClass={closedClass} />;
    case 'HomeDraft':
      return <HomeDraft />;
    case 'HomeTrash':
      return <HomeTrash />;
  }
}
export default Home;
