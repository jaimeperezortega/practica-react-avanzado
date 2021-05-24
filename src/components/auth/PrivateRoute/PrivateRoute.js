import { Redirect, Route, useLocation } from 'react-router-dom';
//import {connect} from 'react-redux';
//import {getIsLogged} from '../../../store/selectors'
import {useSelector} from 'react-redux';
import { getIsLogged } from '../../../store/selectors';

const PrivateRoute = (props) => {
  const location = useLocation();
  const isLogged = useSelector(getIsLogged);  // --> Es lo mismo que:  const isLogged = useSelector(state => getIsLogged(state));.  Usamos el useSelector que proporciona react redux para obtener el estado isLogged. 
  
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

//const mapStateToProps = state => ({isLogged: getIsLogged(state)}); // recibe como primer parámetro el estado y lo que tiene que devlolverme es un objeto cvon las props que quiero generar a mi componente. Para eliminar toda lógica de mi componente a la hora de obtener el estado, lo llevamos a un selector que me consigue el estado de isLoggted y de esta forma el mapStateToProps no depende de copmo tenga montado mi store estado para conseguir este estado concreto

//export default connect(mapStateToProps)(PrivateRoute); //Para conectar este componente al store de redux utilizamos antes la funcion connect

// Con este connect ya tenemos nuestro componente PrivateRoute conectado a redux leyendo el isLogged y disponiendo del diapatch para despachar las acciones que necesitemos. Como este componente (PrivateRoute) no va a tirar ninguna acción, solo necesita disponer del argumento mapStateToprops para leer el estado de isLogged. Si necesitase también tener acceso al dispàtch para tirar alguna acciómn en función de alguna variable, se le pasa como 2º argumento después de mapStateToprops


export default PrivateRoute;