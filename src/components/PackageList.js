import React, {useState} from "react";
import db from "../data/db.json";
import PackageBlock from "./PackageBlock";
import ContactForm from "./ContactForm";

function PackageList(){
  const [selectedPack, setSelectedPack] = useState(-1);
  const updateSelectedPack = (num) =>{
    setSelectedPack(num);
  //  console.log("selectedData 1 : ", db.packages[selectedPack]);
  }
  
    return (
        <div className="container">
            <h1 className="center">Insurance Package List</h1>
            <p>Click on a package to select it and then submit the form information.</p>
            <div className='row border border-dark'>
            <div className='col-2 col-sm-3 col-lg-2 align-self-start'></div>
            <div className='col-2 col-sm-3 col-lg-2 align-self-start border-start border-end border-dark fw-bold'>Insurer Name</div>
            <div className='col-6 col-sm-4 col-lg-5 align-self-start border-dark fw-bold'>Description</div>
            <div className='col-2 col-sm-2 col-lg-2 align-self-start border-start border-dark fw-bold'>Price/ Month</div>
            </div>
          {db.packages.map((pack, index) => (
            <PackageBlock
              key={pack.id}
              id={pack.id}
              insurer={pack.insurer}
              desc={pack.desc}
              monthly={pack.monthly}
              index={index}
              selectedPack={selectedPack}
              updatePack={updateSelectedPack}
              
            />
          ))}
          <ContactForm setSelectedPack={setSelectedPack} selectedData={db.packages[selectedPack]} />
        </div>
      );
}
export default PackageList;
