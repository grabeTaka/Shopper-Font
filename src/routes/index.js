import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../views/Home';
import PurchaseRequest from '../views/PurchaseRequest';
import Stock from '../views/Stock';

export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} ></Route>
        <Route path="/purchase" exact  element={<PurchaseRequest />}></Route>
        <Route path="/purchase/:id" exact element={<PurchaseRequest />}></Route>
        <Route path="/stock" exact element={<Stock />}></Route>
      </Routes>
    </BrowserRouter>
  )
}