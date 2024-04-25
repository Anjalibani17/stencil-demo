import { Component,Prop,h } from "@stencil/core";

//class name same as componnet name but without dash and first ch is capital
//class decorator - stencil transform class into web component during build process 
//decorator contain object
@Component({
    //tag name contain unique name + -(dash )
    tag:'side-drawer',
    styleUrl:'./side-drawer.css',
shadow:true
   // scoped:true
   
})
//class class SideDrawer extends HTMLElement
//or
 export class SideDrawer {
@Prop({reflect:true}) title:string;
@Prop({reflect:true,mutable:true}) open:boolean;
onCloseDrawer()
{
    console.log("close");
    console.log(this.open)
    this.open=false;
    // it shows warning that props is by default immutable within component but u can change it from outside
    //bcz stencil has unidirectional data flow so we can resolve it by giving mutable true in props
    
}

render(){

    // let content=null;
    // if(this.open)
    //     { //just pass open as props in this component
    //         content=(<aside>
    //         <header> <h1>{this.title}</h1></header>
           
    //         {/* . It acts as a placeholder inside your component's template where you can insert content from the outside. */}
    //         <slot/>
    //         </aside>)
    //     }
    return(
        <aside>
      
            <header> 
                <h1>{this.title}</h1> 
             <button onClick={this.onCloseDrawer.bind(this)}>X</button>
             </header>
             <section id="tabs">
                <button class="active">Navigation</button>
                <button>contact</button>

             </section>
          
           
            {/* . It acts as a placeholder inside your component's template where you can insert content from the outside. */}
            <slot/>
            </aside>
    )
}
}