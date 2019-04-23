import React from 'react';
import Report from './Report';

import './style.css';

export default ({
  match: {
    params: { timespan },
  },
}) => {
  switch (timespan) {
    case 'overall':
      return <Report subject="OverAll" />;
    case 'today':
      return <Report subject="Today" />;
    case 'last-week':
      return <Report subject="Last Week" />;
    case 'last-month':
      return <Report subject="Last Month" />;
    default:
      return <React.Fragment />;
  }
};
