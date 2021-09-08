import {useEffect,useState} from 'react';
import { Spinner } from 'react-bootstrap';
import "./Loader.scss";

function Load({ loading }){

    return (
      <>
        <div className="spinner">
            <Spinner
                as="span"
                animation="border"
                size="m"
                role="status"
                aria-hidden="true"
            />
            <span className="loading">Cargando...</span>
        </div> 
      </>
    );

} 
function Loader({loading}) {

    const [load, setLoad] = useState(false);

    useEffect(() => {
        setTimeout(()=>{
            setLoad(true);
        },3000)
    }, [])


    return (
        <div>
            <Load loading={load}/>
        </div>
    )
}

export default Loader;