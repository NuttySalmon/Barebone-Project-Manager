import React, {useState} from 'react';

const SearchBar = () => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  const [ keyword, setKeyword ] = useState('')
  const [ results, setResults] = useState([])
  const onChangeHandle = (e) =>{
    setKeyword(e.target.value)
    //axio send post request to /api/search
    //get result from call and call setResults
  }
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"search country"}
     onChange={onChangeHandle}
    />
    // search result box here
  );
}

export default SearchBar