import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Image, Box, Button, Text,
} from 'grommet';

import noop from 'lodash/noop';
import isUndefined from 'lodash/isUndefined';

import { storage } from '../helpers/firebase';
import useCurrentCampaignAttribute from '../hooks/useCurrentCampaignAttribute';

function BlockImage({ blockIndex }) {
  const [image, setImage] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'image' : ['content', blockIndex, 'value'],
  );

  const onChange = useCallback(
    async (event) => {
      const file = event.target.files[0];

      if (!file) {
        return;
      }

      const uploadTask = storage
        .ref()
        .child(`images/${file.name}`)
        .put(file);

      uploadTask.on('state_changed', noop, noop, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImage(downloadURL);
        });
      });
    },
    [setImage],
  );

  const id = isUndefined(blockIndex) ? 'global' : blockIndex;

  return (
    <Box round="large" overflow="hidden" elevation="xsmall" width={{ max: '70vw' }}>
      <Button>
        <label htmlFor={id}>
          <Box background="light-1" style={{ position: 'relative' }}>
            <input
              id={id}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              {...{ onChange }}
            />
            <div style={{ paddingTop: '100%' }} />
            {image ? (
              <Image
                fit="cover"
                src={image}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <Box
                width="100%"
                height="100%"
                align="center"
                justify="center"
                style={{ position: 'absolute' }}
              >
                <Text color="dark-4" size="small">
                  Select an image...
                </Text>
              </Box>
            )}
          </Box>
        </label>
      </Button>
    </Box>
  );
}

BlockImage.propTypes = {
  blockIndex: PropTypes.number.isRequired,
};

export default BlockImage;
