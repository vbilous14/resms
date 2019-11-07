import React from 'react';

import {
  Box, Button, Text, Anchor,
} from 'grommet';

import { NewWindow } from 'grommet-icons';

import isNull from 'lodash/isNull';
import TestCampaign from '../../../components/TestCampaign';
import useCampaign from '../../../hooks/useCampaign';
import Step from '../../../components/Step';

function CampaignMessageStep() {
  const { campaign, campaignId } = useCampaign();

  if (isNull(campaign)) {
    return <Text>Loading</Text>;
  }

  if (!campaign) {
    return <Text>Campaign not found</Text>;
  }

  return (
    <Step
      backUrlTitle="Edit experience"
      backUrlHref="/campaigns/[id]/customization"
      backUrlAs={`/campaigns/${campaignId}/customization`}
      submitHref="/campaigns/[id]/finish"
      submitAs={`/campaigns/${campaignId}/finish`}
      submitTitle="Publish"
      stepLabel="STEP 4"
      title="Launch campaign"
      description="You're now ready to go live. It is a good idea to send yourself a test message first."
    >
      <Box>
        <Text>Preview campaign in browser</Text>
        <Anchor>
          <Box align="start">
            <Button
              plain
              justify="start"
              color="brand"
              href={`/campaigns/${campaignId}`}
              reverse
              icon={<NewWindow color="brand" size="small" />}
              label={`https://resms.io/${campaignId}`}
              size="xsmall"
              target="_blank"
            />
          </Box>
        </Anchor>
        <Box margin={{ top: 'xlarge' }} align="start">
          <TestCampaign />
        </Box>
      </Box>
    </Step>
  );
}

export default CampaignMessageStep;
