export const isManagementActive = boolean => {
  return {
    type: 'IS_MANAGEMENT_ACTIVE',
    payload: boolean
  };
};

export const mainCurrentPage = selected => {
  return {
    type: 'CURRENT_PAGE_MAIN',
    payload: selected
  };
};

export const manaCurrentPage = selected => {
  return {
    type: 'CURRENT_PAGE_MANA',
    payload: selected
  };
};

export const memberlist = array => {
  return {
    type: 'MEMBER_LIST',
    payload: [...array]
  };
};

export const newslist = array => {
  return {
    type: 'NEWS_LIST',
    payload: [...array]
  };
};

export const selectedNews = (id, title, contents) => {
  return {
    type: 'SELECTED_NEWS',
    payload: {
      id,
      title,
      contents
    }
  };
};

export const memberInfo = obj => {
  return {
    type: 'MEMBER_INFO',
    payload: { ...obj }
  };
};

export const isStateChanged = boolean => {
  return {
    type: 'IS_STATE_CHANGED',
    payload: !boolean
  };
};
