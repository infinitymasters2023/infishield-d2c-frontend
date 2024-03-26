import Layout from '@/components/layouts/Layout';
import React from 'react';
import error from "../assets/img/under-construction-4011849_640.png"
export default function NotFound() {
  return (
<Layout>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img 
    style={{ width: '500px' }}
    src={error ? error.src : ''}
  />



  
</div>
</Layout>
  );
}

