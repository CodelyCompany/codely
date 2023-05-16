import React from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Container, Typography } from '@mui/material';
import { GetUsers } from 'ducks/user/operations';
import { getUserByUsername } from 'ducks/user/selectors';
import usePageTitle from 'helpers/usePageTitle';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import SectionWrapper from 'ui/user/SectionWrapper';
import UncheckedExercises from 'ui/user/UncheckedExercises';
import UserExercisesList from 'ui/user/UserExercisesList';
import VersusResults from 'ui/user/VersusResults';
import WrittenReviews from 'ui/user/WrittenReviews';

import Pages from 'consts/pages';

const UserDetails = ({ GetUsers }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { token } = useToken();
  const { color } = useTheme();
  usePageTitle(Pages.USER_PANEL);

  useEffect(() => {
    GetUsers(token);
  }, [token]);

  const foundUser = useSelector(getUserByUsername(user.nickname));

  return (
    <Container id='user-details-container'>
      {foundUser && (
        <Box id='user-details-wrapper'>
          <Box id='registered-since-info' sx={{ borderColor: color }}>
            <Typography variant='h2' sx={{ color }}>
              {foundUser.username}
            </Typography>
            <Typography sx={{ color }} variant='h6'>
              {t('User since:')}{' '}
              {new Date(foundUser.creationDate).toLocaleDateString()}
            </Typography>
          </Box>
          <SectionWrapper
            condition={!_.isEmpty(foundUser.doneExercises)}
            mode='done'
          >
            <UserExercisesList
              exercises={foundUser.doneExercises}
              mode='done'
            />
          </SectionWrapper>
          <SectionWrapper
            condition={
              !_.isEmpty(foundUser.preparedExercises.filter((el) => el.checked))
            }
            mode='prepared'
          >
            <UserExercisesList
              exercises={foundUser.preparedExercises.filter((el) => el.checked)}
              mode='prepared'
            />
          </SectionWrapper>
          <SectionWrapper
            mode='unchecked'
            condition={
              !_.isEmpty(
                foundUser.preparedExercises.filter((el) => !el.checked)
              )
            }
          >
            <UncheckedExercises
              exercises={foundUser.preparedExercises.filter(
                (el) => !el.checked
              )}
            />
          </SectionWrapper>
          <SectionWrapper
            mode='reviews'
            condition={!_.isEmpty(foundUser.writtenReviews)}
          >
            <WrittenReviews reviews={foundUser.writtenReviews} />
          </SectionWrapper>
          <SectionWrapper
            mode='versus'
            condition={foundUser.wonVersus > 0 || foundUser.lostVersus > 0}
          >
            <VersusResults
              won={foundUser.wonVersus}
              lost={foundUser.lostVersus}
            />
          </SectionWrapper>
        </Box>
      )}
    </Container>
  );
};

const mapDispatchToProps = {
  GetUsers,
};

export default connect(null, mapDispatchToProps)(UserDetails);

UserDetails.propTypes = {
  GetUsers: PropTypes.func.isRequired,
};
