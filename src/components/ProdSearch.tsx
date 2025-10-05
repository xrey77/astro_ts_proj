import React, { useState } from 'react'
import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:7292",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

const toDecimal = (number: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, // Ensures at least two decimal places
    maximumFractionDigits: 2, // Limits to two decimal places
  });
  // Format the number
  return formatter.format(number);
};

interface Products {
  id: number,
  descriptions: string,
  qty: number,
  unit: string,
  sellPrice: number,
  productPicture: string
}

interface Productdata {
  products: Products[]
}

const ProdSearch = () => {
    const [prodsearch, setProdsearch] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const [searchkey, setSearchkey] = useState('');

     function getProdsearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("please wait...");
        const formData = JSON.stringify({ search: searchkey});
        api.post<Productdata>("/api/searchproducts", formData)
        .then((res) => {
          const jdata: Productdata = res.data;
            setProdsearch(jdata.products);
        }, (error) => {
            setMessage(error.response.data.message);
            setTimeout(() => {
              setProdsearch([]);
              setMessage('');
            }, 3000);
            return;
        });  
        setMessage('');
    }
     
  return (
    <div className="container mb-9">
        <h2 className='text-dark'>Products Search</h2>
        <div className='text-danger'>{message}</div>
        <form onSubmit={getProdsearch} autoComplete='off'>
            <div className="col-auto">
              <input type="text" required value={searchkey} onChange={e => setSearchkey(e.target.value)} className="form-control-sm" placeholder="enter Product keyword"/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mt-2 btn-sm mb-3">search</button>
            </div>
        </form>
        <div className="container mb-9">
          <div className="card-group">
        {prodsearch.map((item) => {
                return (
                <div key={item['id']}  className='col-md-4'>
                <div className="card mx-3 mt-3 card-box">
                    <img src={item['productPicture']} className="card-img-top product-size" alt={""}/>
                    <div className="card-body">
                      <h5 className="card-title">Descriptions</h5>
                      <p className="card-text desc-h">{item['descriptions']}</p>
                    </div>
                    <div className="card-footer">
                      <p className="card-text text-danger"><span className="text-dark">PRICE :</span>&nbsp;<strong>&#8369;{toDecimal(item['sellPrice'])}</strong></p>
                    </div>  
                </div>
                
                </div>
          );    
        })}
          </div>          
          <br/><br/><br/>
        </div>
    </div>
  )
}

export default ProdSearch;