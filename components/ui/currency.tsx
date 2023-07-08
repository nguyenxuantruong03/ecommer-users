"use client"

import { useEffect, useState } from "react";

// Giống với libs trong utils admin có thể xem trong đó
export const formatter = new Intl.NumberFormat("de-DE",{
    style: 'currency',
    currency: 'VND'
  })

  interface CurrencyProps{
    value?: string | number;
  }

const Currency:React.FC<CurrencyProps> = ({value}) => {
    const[isMounted,setIsMounted] =useState(false)

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null
    }

    return ( 
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
     );
}
 
export default Currency;