import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

const UserHeader = ({ fetchUser, userId, user }) => {
  useEffect(() => {
    fetchUser(userId);
  }, [fetchUser, userId]);

  if (!user) {
    return null;
  }

  return(
    <div className="header">
      {user.name}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id === ownProps.userId) };
};

export default connect(mapStateToProps, { fetchUser })(UserHeader);