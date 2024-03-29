import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Box, Grommet } from 'grommet';

import useCurrentCampaign from '../hooks/useCurrentCampaign';
import TextAreaAutoresize from './TextAreaAutoresize';
import updateCampaign from '../helpers/firebase/updateCampaign';

const inputStyles = {
  transition: 'background-color 150ms',
  borderRadius: '24px',
};
const activeInputTheme = {
  textArea: {
    extend: () => ({
      ...inputStyles,
      backgroundColor: '#7d4cdb',
    }),
  },
};
const inputTheme = {
  textArea: {
    extend: () => ({
      ...inputStyles,
      backgroundColor: '#fff',
    }),
  },
};

function CampaignMessage({ isActive, onFocus, onBlur }) {
  const [campaign] = useCurrentCampaign();
  const [value, setValue] = useState('');

  const onFocusHandler = useCallback(() => onFocus('message'), [campaign]);
  const onChangeHandler = useCallback(
    (event) => {
      if ((event.target.value && !campaign.message) || (!event.target.value && campaign.message)) {
        updateCampaign(campaign.id, { message: event.target.value });
      }
      setValue(event.target.value);
    },
    [campaign],
  );
  const onBlurHandler = useCallback(
    (event) => {
      updateCampaign(campaign.id, { message: event.target.value });

      onBlur('message', event.target.value);
    },
    [campaign],
  );

  useEffect(() => {
    if (campaign) {
      setValue(campaign.message || '');
    }
  }, [campaign]);

  return (
    <Box round="large">
      <Grommet theme={isActive ? activeInputTheme : inputTheme}>
        <TextAreaAutoresize
          size="small"
          plain
          resize={false}
          placeholder="Type your message here..."
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          value={value}
        />
      </Grommet>
    </Box>
  );
}

CampaignMessage.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

CampaignMessage.defaultProps = {
  onFocus: noop,
  onBlur: noop,
};

export default CampaignMessage;
