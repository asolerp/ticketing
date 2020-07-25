import buildClient from '../api/build-client';
import React from 'react'

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <React.Fragment>
      <Parent />
      <h1>You are NOT signed in</h1>
    </React.Fragment>
  );
};

LandingPage.getInitialProps = async context => {
  console.log('LANDING PAGE!');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};


export default LandingPage;
