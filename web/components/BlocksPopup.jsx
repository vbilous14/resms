import React from 'react';

import {
  Grid, Box, Heading, Text,
} from 'grommet';
import {
  Chat,
  Image,
  Video,
  Map,
  Calendar,
  Attachment,
  Code,
  Currency,
  Emoji,
  Gallery,
  Link,
  Microphone,
  Youtube,
  Vimeo,
  Instagram,
} from 'grommet-icons';

const blocks = [
  { type: 'text', label: 'Text', icon: Chat },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'video', label: 'Video', icon: Video },
  { type: 'location', label: 'Location', icon: Map },
  { type: 'event', label: 'Event', icon: Calendar },
  { type: 'file', label: 'File', icon: Attachment },
  { type: 'frame', label: 'Frame', icon: Code },
  { type: 'payment', label: 'Payment', icon: Currency },
  { type: 'gif', label: 'GIF', icon: Emoji },
  { type: 'gallery', label: 'Gallery', icon: Gallery },
  { type: 'link', label: 'Link', icon: Link },
  { type: 'recording', label: 'Recording', icon: Microphone },
  { type: 'youtube', label: 'Youtube', icon: Youtube },
  { type: 'vimeo', label: 'Vimeo', icon: Vimeo },
  { type: 'instagram', label: 'Instagram', icon: Instagram },
];

const BlocksPopup = () => (
  <Box
    background="light-2"
    width="100%"
    pad="large"
    overflow="auto"
    fill
  >
    <Heading
      size="small"
      margin={{ top: 'none', bottom: 'medium' }}
    >
      Select block type
    </Heading>
    <Text
      size="xsmall"
      color="dark-4"
    >
      There are many different block types that serve different purpose.
      Feel free to experiment with various blocks to gets best results.
    </Text>
    <Box>
      <Grid
        columns={{
          count: 3,
          size: 'auto',
        }}
        gap="small"
      >
        { blocks.map((block) => {
          const Icon = block.icon;

          return (
            <Box
              key={block.type}
              background="light-1"
              justify="center"
              align="center"
              round="medium"
              pad="medium"
            >
              <Icon size="large" color="brand" />
              <Text color="brand">{block.label}</Text>
            </Box>
          );
        }) }
      </Grid>
    </Box>
  </Box>
);

export default BlocksPopup;
