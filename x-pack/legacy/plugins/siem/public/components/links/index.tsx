/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiLink } from '@elastic/eui';
import React from 'react';

import { encodeIpv6 } from '../../lib/helpers';
import {
  getCaseDetailsUrl,
  getHostDetailsUrl,
  getIPDetailsUrl,
  getCreateCaseUrl,
} from '../link_to';
import { FlowTarget, FlowTargetSourceDest } from '../../graphql/types';

// Internal Links
const HostDetailsLinkComponent: React.FC<{ children?: React.ReactNode; hostName: string }> = ({
  children,
  hostName,
}) => (
  <EuiLink href={getHostDetailsUrl(encodeURIComponent(hostName))}>
    {children ? children : hostName}
  </EuiLink>
);

export const HostDetailsLink = React.memo(HostDetailsLinkComponent);

const IPDetailsLinkComponent: React.FC<{
  children?: React.ReactNode;
  ip: string;
  flowTarget?: FlowTarget | FlowTargetSourceDest;
}> = ({ children, ip, flowTarget = FlowTarget.source }) => (
  <EuiLink href={`${getIPDetailsUrl(encodeURIComponent(encodeIpv6(ip)), flowTarget)}`}>
    {children ? children : ip}
  </EuiLink>
);

export const IPDetailsLink = React.memo(IPDetailsLinkComponent);

const CaseDetailsLinkComponent: React.FC<{ children?: React.ReactNode; detailName: string }> = ({
  children,
  detailName,
}) => (
  <EuiLink
    href={getCaseDetailsUrl(encodeURIComponent(detailName))}
    data-test-subj="case-details-link"
  >
    {children ? children : detailName}
  </EuiLink>
);
export const CaseDetailsLink = React.memo(CaseDetailsLinkComponent);
CaseDetailsLink.displayName = 'CaseDetailsLink';

export const CreateCaseLink = React.memo<{ children: React.ReactNode }>(({ children }) => (
  <EuiLink href={getCreateCaseUrl()}>{children}</EuiLink>
));

CreateCaseLink.displayName = 'CreateCaseLink';

// External Links
export const GoogleLink = React.memo<{ children?: React.ReactNode; link: string }>(
  ({ children, link }) => (
    <EuiLink href={`https://www.google.com/search?q=${encodeURIComponent(link)}`} target="_blank">
      {children ? children : link}
    </EuiLink>
  )
);

GoogleLink.displayName = 'GoogleLink';

export const PortOrServiceNameLink = React.memo<{
  children?: React.ReactNode;
  portOrServiceName: number | string;
}>(({ children, portOrServiceName }) => (
  <EuiLink
    data-test-subj="port-or-service-name-link"
    href={`https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=${encodeURIComponent(
      String(portOrServiceName)
    )}`}
    target="_blank"
  >
    {children ? children : portOrServiceName}
  </EuiLink>
));

PortOrServiceNameLink.displayName = 'PortOrServiceNameLink';

export const Ja3FingerprintLink = React.memo<{
  children?: React.ReactNode;
  ja3Fingerprint: string;
}>(({ children, ja3Fingerprint }) => (
  <EuiLink
    data-test-subj="ja3-fingerprint-link"
    href={`https://sslbl.abuse.ch/ja3-fingerprints/${encodeURIComponent(ja3Fingerprint)}`}
    target="_blank"
  >
    {children ? children : ja3Fingerprint}
  </EuiLink>
));

Ja3FingerprintLink.displayName = 'Ja3FingerprintLink';

export const CertificateFingerprintLink = React.memo<{
  children?: React.ReactNode;
  certificateFingerprint: string;
}>(({ children, certificateFingerprint }) => (
  <EuiLink
    data-test-subj="certificate-fingerprint-link"
    href={`https://sslbl.abuse.ch/ssl-certificates/sha1/${encodeURIComponent(
      certificateFingerprint
    )}`}
    target="_blank"
  >
    {children ? children : certificateFingerprint}
  </EuiLink>
));

CertificateFingerprintLink.displayName = 'CertificateFingerprintLink';

export const ReputationLink = React.memo<{ children?: React.ReactNode; domain: string }>(
  ({ children, domain }) => (
    <EuiLink
      href={`https://www.talosintelligence.com/reputation_center/lookup?search=${encodeURIComponent(
        domain
      )}`}
      target="_blank"
    >
      {children ? children : domain}
    </EuiLink>
  )
);

ReputationLink.displayName = 'ReputationLink';

export const VirusTotalLink = React.memo<{ children?: React.ReactNode; link: string }>(
  ({ children, link }) => (
    <EuiLink
      href={`https://www.virustotal.com/#/search/${encodeURIComponent(link)}`}
      target="_blank"
    >
      {children ? children : link}
    </EuiLink>
  )
);

VirusTotalLink.displayName = 'VirusTotalLink';

export const WhoIsLink = React.memo<{ children?: React.ReactNode; domain: string }>(
  ({ children, domain }) => (
    <EuiLink href={`https://www.iana.org/whois?q=${encodeURIComponent(domain)}`} target="_blank">
      {children ? children : domain}
    </EuiLink>
  )
);

WhoIsLink.displayName = 'WhoIsLink';
