import React from 'react';
import '../styles/style.css';

function PackageBlock({id, insurer, desc, monthly, index, selectedPack, updatePack}){
    return (
        <div className={`row border border-dark pack ${index=== selectedPack ? ' selectedp':''}`}
        onClick ={ () => updatePack(index)}
        >
        <div className='col-2 col-sm-3 col-lg-2 align-self-start'>{id}</div>
        <div className='col-2 col-sm-3 col-lg-2 align-self-start border-start border-dark fullh'>{insurer}</div>
        <div className='col-6 col-sm-4 col-lg-5 align-self-center border-start border-end border-dark'>{desc}</div>
        <div className='col-2 col-sm-2 col-lg-2 align-self-start fullh'>{monthly}</div>
        </div>
    )

}
export default PackageBlock;