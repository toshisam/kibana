import { INSTRUCTION_VARIANT } from '../../../common/tutorials/instruction_variant';
import {
  DOWNLOAD_SERVER,
  WINDOWS_SERVER_INSTRUCTIONS,
  UNIX_FAMILY_SERVER_INSTRUCTIONS
} from './apm_server_instructions';
import {
  NODE_CLIENT_INSTRUCTIONS,
  DJANGO_CLIENT_INSTRUCTIONS,
} from './apm_client_instructions';

export const ON_PREM_INSTRUCTIONS = {
  instructionSets: [
    {
      title: 'APM Server',
      instructionVariants: [
        {
          id: INSTRUCTION_VARIANT.OSX,
          instructions: [
            {
              ...DOWNLOAD_SERVER,
              commands: [
                'TODO'
              ]
            },
            ...UNIX_FAMILY_SERVER_INSTRUCTIONS
          ]
        },
        {
          id: INSTRUCTION_VARIANT.DEB,
          instructions: [
            {
              ...DOWNLOAD_SERVER,
              commands: [
                'TODO'
              ]
            },
            ...UNIX_FAMILY_SERVER_INSTRUCTIONS
          ]
        },
        {
          id: INSTRUCTION_VARIANT.RPM,
          instructions: [
            {
              ...DOWNLOAD_SERVER,
              commands: [
                'TODO'
              ]
            },
            ...UNIX_FAMILY_SERVER_INSTRUCTIONS
          ]
        },
        {
          id: INSTRUCTION_VARIANT.WINDOWS,
          instructions: WINDOWS_SERVER_INSTRUCTIONS
        }
      ]
    },
    {
      title: 'APM Client',
      instructionVariants: [
        {
          id: INSTRUCTION_VARIANT.NODE,
          instructions: NODE_CLIENT_INSTRUCTIONS
        },
        {
          id: INSTRUCTION_VARIANT.DJANGO,
          instructions: DJANGO_CLIENT_INSTRUCTIONS
        }
      ]
    }
  ]
};
