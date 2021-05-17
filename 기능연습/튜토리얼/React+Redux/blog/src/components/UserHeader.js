import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

const UserHeader = ({ fetchUser, userId, users }) => {
  useEffect(() => {
    fetchUser(userId);
  }, [fetchUser, userId]);

  const user = users.find(user => user.id === userId);

  if (!user) {
    return null;
  }

  return(
    <div className="header">
      {user.name}
    </div>
  );
}

const mapStateToProps = state => {
  return { users: state.users };
};

export default connect(mapStateToProps, { fetchUser })(UserHeader);