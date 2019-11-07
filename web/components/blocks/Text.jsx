import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import {
  Grommet,
  Box,
} from 'grommet';
import useCampaign from '../../hooks/useCampaign';

import TextAreaAutoresize from '../TextAreaAutoresize';
import updateCampaign from '../../helpers/firebase/updateCampaign';

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

function Text({
  blockIndex,
  onFocus,
  onBlur,
  isActive,
}) {
  const { campaign, campaignId } = useCampaign();
  const block = campaign ? campaign.content[blockIndex] : null;
  const [value, setValue] = useState('');

  const onChangeHandler = useCallback((event) => setValue(event.target.value), []);
  const onFocusHandler = useCallback(() => onFocus(blockIndex), [campaign]);
  const onBlurHandler = useCallback((event) => {
    campaign.content[blockIndex].value = event.target.value;

    onBlur(blockIndex, event.target.value);

    return updateCampaign(campaignId, { content: campaign.content });
  }, [campaign, blockIndex]);

  useEffect(() => {
    if (block) {
      setValue(block.value);
    }
  }, [block]);

  return (
    <Grommet theme={isActive ? activeInputTheme : inputTheme} fill>
      <Box round="large" fill justify="start">
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
      </Box>
    </Grommet>

  );
}

Text.propTypes = {
  blockIndex: PropTypes.number.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  isActive: PropTypes.bool,
};

Text.defaultProps = {
  onFocus: noop,
  onBlur: noop,
  isActive: false,
};

export default Text;
