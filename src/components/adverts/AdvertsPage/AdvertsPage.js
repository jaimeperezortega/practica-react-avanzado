import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { getAdverts } from '../../../api/adverts';
import { defaultFilters, filterAdverts } from './filters';
import usePromise from '../../../hooks/usePromise';
import {useDispatch, useSelector} from 'react-redux';
import { getAdvertsSelector, getError, getIsLoading } from '../../../store/selectors';
import {advertsLoadedAction} from '../../../store/actions';


const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {
  //const { isPending: isLoading, error, execute } = usePromise();
  const [filters, setFilters] = React.useState(getFilters);
  //const [isLoading, setIsLoading] = React.useState(false);
  //const [error, setError] = React.useState(null);
  //const [adverts, setAdverts] = React.useState([]);
  
  const dispatch = useDispatch();
  const adverts = useSelector(getAdvertsSelector);
  const error = useSelector(getError);
  const isLoading = useSelector(getIsLoading);


  // const executeApiCall = async function() {
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     const data = await getAdverts();
  //     setError(null);
  //     setIsLoading(true);
  //     //setAdverts(data);
  //     dispatch(advertsLoaded(data));
  //   } catch (error) {
  //     setError(error);
  //     setIsLoading(true);
  //     throw error;
  //   }
  // }

  React.useEffect(() => {

   
    dispatch(advertsLoadedAction());
   
  }, []);

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  const filteredAdverts = filterAdverts(adverts, filters);

  return (
    <Layout>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
