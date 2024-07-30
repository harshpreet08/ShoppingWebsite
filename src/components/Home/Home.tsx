import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from 'components/Loader';
import { GithubStarButton } from 'components/Github';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';

import { useProducts } from 'contexts/products-context';

import * as S from './style';

function Home() {
  const { isFetching, products, fetchProducts } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSignOut = () => {
    sessionStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <S.Container>
      {isFetching && <Loader />}
      <S.TwoColumnGrid>
        <S.Side>
          <Filter />
          <GithubStarButton />
        </S.Side>
        <S.Main>
          <S.MainHeader>
            <p>{products?.length} Product(s) found</p>
            <S.SignOutButton onClick={handleSignOut}>Sign Out</S.SignOutButton>
          </S.MainHeader>
          <Products products={products} />
        </S.Main>
      </S.TwoColumnGrid>
      <Cart />
    </S.Container>
  );
}

export default Home;
