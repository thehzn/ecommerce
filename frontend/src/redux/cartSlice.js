import { createSlice } from "@reduxjs/toolkit";


const loadCart = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice=createSlice({
    name:'cart',
    initialState:{items:loadCart()},
    reducers:{
        // addtocart:(state,action)=>{
        //     state.items.push({...action.payload,qty:1});
        // },
        addtocart:(state,action)=>{
            const item=state.items.find(i=>i._id==action.payload._id)
            if (item) {item.qty+=1;}
            else{
                 state.items.push({...action.payload,qty:1});
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        // decrement:(state,action)=>{
        //    const item=state.items.find(i=>i.id==action.payload.id)
        //     if (item) item.qty-=1; 
        // },
        removefromcart:(state,action)=>{
            state.items=state.items.filter(item=>item._id!==action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        updateqty:(state,action)=>{
            const item=state.items.find(i=>i._id==action.payload.id)
            if(item){
                item.qty = action.payload.qty;
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        }
    }
})
export const { addtocart,updateqty,removefromcart } = cartSlice.actions;
export default cartSlice.reducer;