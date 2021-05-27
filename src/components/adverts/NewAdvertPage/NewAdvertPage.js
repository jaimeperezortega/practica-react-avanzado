import React from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';

//import { createAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { useDispatch, useSelector } from 'react-redux';
import { advertCreatedAction } from '../../../store/actions';
import { getError, getIsLoading, getUi } from '../../../store/selectors';

function NewAdvertPage({ history }) {
  //const { isPending: isLoading, execute } = usePromise(null);
  const dispatch = useDispatch();
  // const error = useSelector(getError);
  // const isLoading = useSelector(getIsLoading);

  const {isLoading, error} = useSelector(getUi);

  const handleSubmit = newAdvert => {
     dispatch(advertCreatedAction(newAdvert))
     .then(advertCreated => {
       const {id} = advertCreated
       history.push(`/adverts/${id}`)
      }) }
      
      // Metemos aquí un async await porque un truco the thunk es recoger la promesa que nos está retornando este middleware para poder tener acceso en este caso al ID del advert recien creado

      
      //history.push(`/adverts/${id}`)
  

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <NewAdvertForm onSubmit={handleSubmit} />
    </Layout>
  );
}

NewAdvertPage.propTypes = {
  history: T.shape({
    push: T.func.isRequired,
  }).isRequired,
};

export default NewAdvertPage;
