import React from 'react';
import T from 'prop-types';

import { useAuthContext } from '../context';
import usePromise from '../../../hooks/usePromise';
import { login } from '../../../api/auth';
import LoginForm from './LoginForm';
import {useDispatch} from 'react-redux';
import {authLoginSuccess, authLoginRequest, authLoginFailure} from '../../../store/actions'

function LoginPage({ location, history }) {
  //const { handleLogin } = useAuthContext();
  const {execute, isPending: isLoading, error, resetError } = usePromise();
  
  //Usamos useDispatch para obtener el dispatch que activa la accion de handleLogin

  const dispatch = useDispatch();
  //const handleLogin = () => dispatch(authLoginSuccess());

  // const handleSubmit = credentials => {
  //   execute(login(credentials))
  //     .then(handleLogin)
  //     .then(() => {
  //       const { from } = location.state || { from: { pathname: '/' } };
  //       history.replace(from);
  //     });
  // };

  const handleSubmit = async  credentials =>{
    const { from } = location.state || { from: { pathname: '/' } };
    dispatch(authLoginRequest());

    try {
      await execute(login(credentials));
      dispatch(authLoginSuccess());
      history.replace(from);
      
    } catch (error) {
      dispatch(authLoginFailure(error))
    }
    

  }

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
    .isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
//   handleLogin: () => dispatch(authLogin())
// });

// export default connect(null,mapDispatchToProps)(LoginPage);

export default LoginPage;