export const saveaccessToken = (data) => (dispatch) => {
    try{
        dispatch(
            {
                type: "SET_ACCESS_TOKEN",
                payload: data
                
            }
        )
    }catch(err){
        console.log("redux: ",err);
    }
  };