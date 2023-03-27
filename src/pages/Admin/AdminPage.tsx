import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminNavigation from './AdminNavigation';
import CreateProductPage from './CreateProductPage';
import CreateSkuPage from './CreateSkuPage';

interface AdminPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const AdminPage: React.FC<AdminPageProps> = (props) => {
  return (
    <div>
      <h1 className="text-center p-10 text-[4rem]">Admin</h1>
      <div className="px-20">
        <Routes>
          <Route path="" element={<AdminNavigation />} />
          <Route path="create-product" element={<CreateProductPage />} />
          <Route path="create-sku" element={<CreateSkuPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
