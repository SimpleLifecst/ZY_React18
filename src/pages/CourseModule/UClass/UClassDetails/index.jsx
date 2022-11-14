import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UClassDetails = () => {

  const res = useLocation()

  return (
    <div>
      班级详情
    </div>
  );
}

export default UClassDetails;
