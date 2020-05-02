import React from 'react';
import { useRouter } from 'next/router';
import { Success } from '../../components/Success';

const SuccessPage = () => {
  const router = useRouter();
  const { orderNumber } = router.query;
  return <Success orderNumber={orderNumber} />;
};

export default SuccessPage;
