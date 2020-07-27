/**
 *
 * PrivacyPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { PublicLayout } from 'app/components/PublicLayout';
import { Container, Typography, Grid, Divider } from '@material-ui/core';

interface Props {}

export function PrivacyPage(props: Props) {
  return (
    <>
      <Helmet>
        <title>PrivacyPage</title>
        <meta name="description" content="Description of PrivacyPage" />
      </Helmet>
      <PublicLayout>
        <Div>
          <Container>
            <Typography component="h2" variant="h4">
              PRIVACY POLICY
            </Typography>
            <Divider />
            <div className="privacy-body">
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography component="h4" variant="h6">
                    SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    When you signup to our application, as part of the user
                    details, we collect the basic personal information you give
                    us such as your name and email address.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    When you browse our application, we also automatically
                    receive your computer’s internet protocol (IP) address in
                    order to provide us with information that helps us learn
                    about your browser and operating system.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    With your permission, we may send you emails about our
                    application, new products and other updates.
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography component="h4" variant="h6">
                    SECTION 2 - CONSENT
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    How do you get my consent?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    When you provide us with personal information to complete a
                    signup, subscription, verify your credit card, place an
                    order, we imply that you consent to our collecting it and
                    using it for that specific reason only.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    If we ask for your personal information for a secondary
                    reason, like marketing, we will either ask you directly for
                    your expressed consent, or provide you with an opportunity
                    to say no.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    How do I withdraw my consent?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    If after you opt-in, you change your mind, you may withdraw
                    your consent for us to contact you, for the continued
                    collection, use or disclosure of your information, at
                    anytime, by contacting us at{' '}
                    <a href="mailto:contact@doo.today">contact@doo.today</a>
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography component="h4" variant="h6">
                    SECTION 3 - DISCLOSURE
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    We may disclose your personal information if we are required
                    by law to do so or if you violate our Terms of Service.
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography component="h4" variant="h6">
                    SECTION 4 - PAYMENT
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    We use Razorpay for processing payments. We/Razorpay do not
                    store your card data on their servers. The data is encrypted
                    through the Payment Card Industry Data Security Standard
                    (PCI-DSS) when processing payment. Your purchase transaction
                    data is only used as long as is necessary to complete your
                    purchase transaction. After that is complete, your purchase
                    transaction information is not saved.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    Our payment gateway adheres to the standards set by PCI-DSS
                    as managed by the PCI Security Standards Council, which is a
                    joint effort of brands like Visa, MasterCard, American
                    Express and Discover.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    PCI-DSS requirements help ensure the secure handling of
                    credit card information by our store and its service
                    providers.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    For more insight, you may also want to read terms and
                    conditions of razorpay on{' '}
                    <a href="https://razorpay.com">https://razorpay.com</a>
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography component="h4" variant="h6">
                    SECTION 5 - THIRD-PARTY SERVICES
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    In general, the third-party providers used by us will only
                    collect, use and disclose your information to the extent
                    necessary to allow them to perform the services they provide
                    to us.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    However, certain third-party service providers, such as
                    payment gateways and other payment transaction processors,
                    have their own privacy policies in respect to the
                    information we are required to provide to them for your
                    purchase-related transactions.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    For these providers, we recommend that you read their
                    privacy policies so you can understand the manner in which
                    your personal information will be handled by these
                    providers.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    In particular, remember that certain providers may be
                    located in or have facilities that are located a different
                    jurisdiction than either you or us. So if you elect to
                    proceed with a transaction that involves the services of a
                    third-party service provider, then your information may
                    become subject to the laws of the jurisdiction(s) in which
                    that service provider or its facilities are located.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    Once you leave our store’s website or are redirected to a
                    third-party website or application, you are no longer
                    governed by this Privacy Policy or our website’s Terms of
                    Service.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    Links
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    When you click on links on our store, they may direct you
                    away from our site. We are not responsible for the privacy
                    practices of other sites and encourage you to read their
                    privacy statements.
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography component="h4" variant="h6">
                    SECTION 6 - SECURITY
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    To protect your personal information, we take reasonable
                    precautions and follow industry best practices to make sure
                    it is not inappropriately lost, misused, accessed,
                    disclosed, altered or destroyed.
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography component="h4" variant="h6">
                    SECTION 7 - COOKIES
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    We use cookies to maintain session of your user. It is not
                    used to personally identify you on other websites.
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography component="h4" variant="h6">
                    SECTION 8 - AGE OF CONSENT
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    By using this site, you represent that you are at least the
                    age of majority in your state or province of residence, or
                    that you are the age of majority in your state or province
                    of residence and you have given us your consent to allow any
                    of your minor dependents to use this site.
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography component="h4" variant="h6">
                    SECTION 9 - CHANGES TO THIS PRIVACY POLICY
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    We reserve the right to modify this privacy policy at any
                    time, so please review it frequently. Changes and
                    clarifications will take effect immediately upon their
                    posting on the website. If we make material changes to this
                    policy, we will notify you here that it has been updated, so
                    that you are aware of what information we collect, how we
                    use it, and under what circumstances, if any, we use and/or
                    disclose it.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    If our store is acquired or merged with another company,
                    your information may be transferred to the new owners so
                    that we may continue to sell products to you.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="h4" variant="h6">
                    QUESTIONS AND CONTACT INFORMATION
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    If you would like to: access, correct, amend or delete any
                    personal information we have about you, register a
                    complaint, or simply want more information contact our
                    Privacy Compliance Officer at{' '}
                    <a href="mailto:contact@doo.today">contact@doo.today</a>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    [Re: Privacy Compliance Officer]
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    [G-301, Alpine Eco Apartments, Mahadevpura, Bangalore,
                    Karnataka - 560037]
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Container>
        </Div>
      </PublicLayout>
    </>
  );
}

const Div = styled.div`
  .privacy-body {
    margin-top: 30px;
  }
`;
