import React from 'react';
import OverAll from './OverAll';
import Today from './OverAll';
import LastWeek from './OverAll';
import LastMonth from './OverAll';

import './style.css';

function Reports({ page, subject }) {
  switch (page) {
    case 'overall':
      return <OverAll subject={subject} />;
    case 'today':
      return <Today subject={subject} />;
    case 'last-week':
      return <LastWeek subject={subject} />;
    case 'last-month':
      return <LastMonth subject={subject} />;
  }
}
export default Reports;
