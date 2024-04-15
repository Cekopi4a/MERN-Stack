const alcohol = 'http://localhost:5050/alcohol';
const  alcoholfree= 'http://localhost:5050/alcfree';
const  dessert= 'http://localhost:5050/dessert';
const  grill= 'http://localhost:5050/grill';
const  hlqb= 'http://localhost:5050/hlqb';
const  hotdishes= 'http://localhost:5050/hotdish';
const  maindishes= 'http://localhost:5050/maindish';
const  salad= 'http://localhost:5050/salad';
const  soup= 'http://localhost:5050/soup';
const  topping= 'http://localhost:5050/topping';

const cartUrl = 'http://localhost:3030/data/cart';

const token = localStorage.getItem('accessToken');

export const getAlc = async () =>{
    const response = await fetch(alcohol);
    const result = await response.json();
    const data = Object.values(result);

    return data;
};

export const getAlcFree = async () =>{
    const response = await fetch(alcoholfree);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};

export const getDess = async () =>{
    const response = await fetch(dessert);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};

export const getGrill = async () =>{
    const response = await fetch(grill);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};

export const getHlqb = async () =>{
    const response = await fetch(hlqb);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};
export const getHot = async () =>{
    const response = await fetch(hotdishes);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};
export const getMain = async () =>{
    const response = await fetch(maindishes);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};
export const getSal = async () =>{
    const response = await fetch(salad);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};
export const getSoup = async () =>{
    const response = await fetch(soup);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};
export const getTop = async () =>{
    const response = await fetch(topping);
    const result = await response.json();
    const data = Object.values(result);
    return data;
};

export const getOne = async (id) =>{
    const response = await fetch(`${baseUrl}/${id}`);
  
    const result = await response.json();

    return result;
};

export const create = async (itemData) =>{
    const response = await fetch(`${baseUrl}`,{
        method: 'POST',
        headers:{
            "content-type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(itemData)
    });

    const result = await response.json();

    return result;
}

export const edit = async (id,itemData) =>{
    const response = await fetch(`${baseUrl}/${id}`,{
        method: 'PUT',
        headers:{
            "content-type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(itemData,id)
    });

    const result = await response.json();

    return result;
}

export const deleteItem = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers:{
        "content-type": "application/json",
        'X-Authorization': token
    },
    body: JSON.stringify(id)
});

   const result = await response.json();

    return result;
}


export const getLatest = async () => {
    const query = new URLSearchParams({
        offset: 0,
        pageSize: 4,
    });

    const response = await fetch(`${hlqb}?${query}`);
  
    const result = await response.json();

    const data = Object.values(result);
 
    return data;
}









//////////////Cart Section/////////////////

export const addCart = async ({id,brand,model,price,imageUrl,addUserId}) =>{
    const response = await fetch(`${cartUrl}`,{
        method: 'POST',
        headers:{
            "content-type": "application/json",
            'X-Authorization': token,
        },
        body: JSON.stringify({id,brand,model,price,imageUrl,addUserId})
    });

    const result = await response.json();

    return result;
    console.log(result);
}

export const getAllCart = async (id) =>{
    const response = await fetch(cartUrl);
  
    const result = await response.json(id);

    const data = Object.values(result);

    return data;
};


export const deleteCartItem = async (id) => {
    const response = await fetch(`${cartUrl}/${id}`, {
      method: "DELETE",
      headers:{
        "content-type": "application/json",
        'X-Authorization': token
    },
    body: JSON.stringify(id)
});

   const result = await response.json();

    return result;
  
}


 
