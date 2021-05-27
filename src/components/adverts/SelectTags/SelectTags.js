import React from 'react';

import { getTags } from '../../../api/adverts';
import { CheckboxGroup } from '../../shared';

function SelectTags(props) {
  const [tags, setTags] = React.useState([]);



  React.useEffect(() => {
    //getTags().then(setTags);
    const getTagsFromApi = async function(){
      const tags = await getTags();
      setTags(tags);
    }
    getTagsFromApi();

  }, []);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
