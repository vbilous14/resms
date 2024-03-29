import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import isUndefined from 'lodash/isUndefined';

import {
  Box, Text, Button, Image,
} from 'grommet';

import { storage } from '../helpers/firebase';
import useCurrentCampaignAttribute from '../hooks/useCurrentCampaignAttribute';
import TextAreaAutoresize from './TextAreaAutoresize';
import CampaignLink from './CampaignLink';

function BlockOpenGraph({ blockIndex }) {
  const [image, setImage] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'image' : ['content', blockIndex, 'image'],
  );

  const [title, setTitle] = useCurrentCampaignAttribute(
    isUndefined(blockIndex) ? 'title' : ['content', blockIndex, 'title'],
  );

  const onImageChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      const uploadTask = storage
        .ref()
        .child(`images/${file.name}`)
        .put(file);

      uploadTask.on('state_changed', noop, noop, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setImage(url);
        });
      });
    },
    [setImage],
  );

  const onTitleChange = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle],
  );

  const id = isUndefined(blockIndex) ? 'global' : blockIndex;

  return (
    <Box
      round="large"
      overflow="hidden"
      background="white"
      elevation="xsmall"
      width={{ max: '70vw' }}
    >
      <Button>
        <label htmlFor={id}>
          <Box background={image ? 'brand' : 'light-1'} style={{ position: 'relative' }}>
            <input
              onChange={onImageChange}
              id={id}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
            {image ? (
              <>
                <div style={{ paddingTop: '100%' }} />
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
              </>
            ) : (
              <Box width="100%" height="60vw" align="center" justify="center">
                <Text color="dark-4" size="small">
                  Select an image...
                </Text>
              </Box>
            )}
          </Box>
        </label>
      </Button>
      <Box style={{ position: 'relative' }}>
        <TextAreaAutoresize
          size="medium"
          placeholder="Type your call to action here..."
          value={title}
          plain
          resize={false}
          onChange={onTitleChange}
          style={{ paddingBottom: 0 }}
        />
        <Box pad={{ horizontal: 'medium', bottom: 'medium' }}>
          <CampaignLink color="dark-4" size="xsmall" truncate />
        </Box>
      </Box>
    </Box>
  );
}

BlockOpenGraph.propTypes = {
  blockIndex: PropTypes.number,
};

export default BlockOpenGraph;
