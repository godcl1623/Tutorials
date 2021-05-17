import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

const UserHeader = ({ fetchUser, userId }) => {
  useEffect(() => {
    fetchUser(userId);
  }, [fetchUser, userId]);

  return(
    <div>
      UserHeader
    </div>
  );
}

const mapStateToProps = state => {
  return null;
};

export default connect(null, { fetchUser })(UserHeader);