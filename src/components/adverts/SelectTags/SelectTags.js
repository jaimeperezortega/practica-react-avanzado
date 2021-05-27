import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTags } from '../../../api/adverts';
import { tagsLoadedAction } from '../../../store/actions';
import { getTagsSelector } from '../../../store/selectors';
import { CheckboxGroup } from '../../shared';

function SelectTags(props) {
  //const [tags, setTags] = React.useState([]);
  const tags = useSelector(getTagsSelector);
  const dispatch = useDispatch();


  React.useEffect(() => {
    //getTags().then(setTags);
    // const getTagsFromApi = async function(){
    //   const tags = await getTags();
    //   setTags(tags);
    // }
    // getTagsFromApi();
    dispatch(tagsLoadedAction());

  }, []);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
