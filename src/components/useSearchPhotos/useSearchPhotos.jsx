import React from 'react';

import PropTypes from 'prop-types';

function useSearchPhotos({ key, query }) {
  return <></>;
}

useSearchPhotos.defaultProps = {
  key: '',
  query: '',
};

useSearchPhotos.propTypes = {
  /** key */
  key: PropTypes.string,
  /** queryObject */
  query: PropTypes.string,
};

export default useSearchPhotos;
