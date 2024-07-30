import styled from 'styled-components/macro';

export const Container = styled.div``;

export const SignOutButton = styled.button`
  padding: 5px 10px;
  background-color: #5a6268;  // A professional dark gray
  color: white;
  font-size: 0.875rem;  // 14px
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4e555b;  // Slightly lighter gray on hover
  }
`;

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;  // Ensure padding on both sides
  & > p {
    margin: 0;  // Remove any default margin from paragraph
  }
`;

export const TwoColumnGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 50px auto auto;
  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    grid-template-columns: 1fr 4fr;
    margin-top: 80px;
  }
`;

export const Side = styled.div`
  display: grid;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    align-content: baseline;
  }
`;

export const Main = styled.main``;
