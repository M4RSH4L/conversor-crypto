

const opcionesCriptomoneda=async()=>{
    const url="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=40&tsym=USD";

   const respuesta=await  fetch(url);
   const resultado=await respuesta.json();

   //console.log(resultado);
   let selectCripto=document.querySelector("#criptomoneda");
   let opcionesHTML= `<option value="">- Selecciona -</option>`;

   resultado.Data.map(opcion=>{
        opcionesHTML+=`<option value="${opcion.CoinInfo.Name}">${opcion.CoinInfo.FullName}</option>`;
   });

   selectCripto.innerHTML=opcionesHTML;
  
}

const cotizarMoneda=()=>{
    const moneda=document.querySelector("#moneda").value;
    const cripto=document.querySelector("#criptomoneda").value;

    if(moneda===``|| cripto===``){
      mostrarError("#msj-error","falta seleecionar campos");
      return;

    }
    cotizar(moneda, cripto);

}

const cotizar=async(moneda="USD", cripto="BTC")=>{

    const url= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
    console.log(url);
    const respuesta= await  fetch(url);
    let resultado=await respuesta.json();
    console.log(resultado.DISPLAY[cripto][moneda]);
  resultado=resultado.DISPLAY[cripto][moneda];
    
    let divResultado=document.querySelector("#divResultado");

    divResultado.innerHTML=`<div class="img-load" style="text-align:center">
                            <img src="30.gif" max-width=20px  height=20px>
    </div>`; 

    setTimeout(()=>{
        divResultado.innerHTML=`
        <div class="precio"> El precio es de:<span>${resultado.PRICE}</span></div>
        <div class="precio"> El precio más alto de hoy:<span>${resultado.HIGHDAY}</span></div>
        <div class="precio"> El precio más bajo de hoy:<span>${resultado.LOWDAY}</span></div>
        <div class="precio"> Variaciones en las ultimas 24 hs:<span>${resultado.CHANGEPCT24HOUR}</span></div>
        <div class="precio"> Ultima actualización:<span>${resultado.LASTUPDATE}</span></div>
        `;
    },3000);

   


}

const mostrarError=(elemento, mensaje)=>{
    divError=document.querySelector(elemento);
    divError.innerHTML=`<p class="red darken-4 error">${mensaje}</P>`;
    setTimeout ( ()=>{ divError.innerHTML=``;}, 2000 );
}

 